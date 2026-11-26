use std::rc::Rc;
use std::sync::Arc;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::mpsc::{self, Receiver, RecvTimeoutError, Sender};
use std::thread;
use std::time::Duration;

use crate::{Engine, EngineError, EngineStatus, Hid, Io, NativeFn, Runtime, Stdio};

/// What the VM reports to the host, in the order it happens.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Event {
    Running,
    Print(String),
    Error(EngineError),
    Idle,
}

enum Command {
    Run(Vec<i32>),
    Stop,
}

/// Runs Thingcode programs on its own thread.
pub struct Vm {
    commands: Sender<Command>,
    stop: Arc<AtomicBool>,
    hid: Arc<Hid>,
    stdin: Sender<String>,
}

impl Vm {
    /// Starts the VM's thread; `on_event` is called from it.
    pub fn new(natives: &'static [NativeFn], on_event: impl Fn(Event) + Send + 'static) -> Self {
        let (commands, received) = mpsc::channel();
        let (stdin, input) = mpsc::channel();
        let stop = Arc::new(AtomicBool::new(false));
        let hid = Arc::new(Hid::default());
        let (thread_stop, thread_hid) = (stop.clone(), hid.clone());
        // Io holds connections that are not Send, so the runtime is built on the thread it runs on
        thread::spawn(move || {
            let on_event: Rc<dyn Fn(Event)> = Rc::new(on_event);
            let print = on_event.clone();
            let runtime = Runtime {
                io: Io::default(),
                hid: thread_hid,
                stdio: Stdio::new(move |line| print(Event::Print(line)), input),
            };
            serve(natives, runtime, received, &thread_stop, &*on_event);
        });
        Self {
            commands,
            stop,
            hid,
            stdin,
        }
    }

    /// Stops the running program, if any, and runs `code`.
    pub fn run(&self, code: Vec<i32>) {
        self.stop.store(true, Ordering::Relaxed);
        let _ = self.commands.send(Command::Run(code));
    }

    pub fn stop(&self) {
        // The flag ends a busy run, the command ends a WAIT
        self.stop.store(true, Ordering::Relaxed);
        let _ = self.commands.send(Command::Stop);
    }

    /// Input devices the host feeds events into.
    pub fn hid(&self) -> &Hid {
        &self.hid
    }

    /// Sends a line to the program's input, for `READ_STR`.
    pub fn write_stdin(&self, line: String) {
        let _ = self.stdin.send(line);
    }
}

impl Drop for Vm {
    // Ends a busy run; dropping the command sender then ends the thread
    fn drop(&mut self) {
        self.stop.store(true, Ordering::Relaxed);
    }
}

/// Runs each program it is sent until it halts, fails or is stopped.
fn serve(
    natives: &'static [NativeFn],
    mut runtime: Runtime,
    commands: Receiver<Command>,
    stop: &AtomicBool,
    on_event: &dyn Fn(Event),
) {
    let mut engine = Engine::default();
    let mut next = None;
    loop {
        let code = match next.take() {
            Some(code) => code,
            None => match commands.recv() {
                Ok(Command::Run(code)) => code,
                Ok(Command::Stop) => continue,
                Err(_) => return,
            },
        };
        engine.reset_state();
        stop.store(false, Ordering::Relaxed);
        on_event(Event::Running);
        loop {
            match exec(&mut engine, &code, natives, &mut runtime, stop) {
                // Waits on the commands rather than sleeping, so Stop or a new Run cuts the WAIT short
                Ok(EngineStatus::Waiting(ms)) => {
                    match commands.recv_timeout(Duration::from_millis(ms.into())) {
                        Ok(Command::Run(code)) => {
                            next = Some(code);
                            break;
                        }
                        Ok(Command::Stop) => break,
                        Err(RecvTimeoutError::Timeout) => {}
                        Err(RecvTimeoutError::Disconnected) => return,
                    }
                }
                Ok(EngineStatus::Halted | EngineStatus::Stopped) => break,
                Err(err) => {
                    on_event(Event::Error(err));
                    break;
                }
            }
        }
        if next.is_none() {
            on_event(Event::Idle);
        }
    }
}

/// Runs until the program halts, waits or `stop` is set.
fn exec(
    engine: &mut Engine,
    code: &[i32],
    natives: &[NativeFn],
    runtime: &mut Runtime,
    stop: &AtomicBool,
) -> Result<EngineStatus, EngineError> {
    while !stop.load(Ordering::Relaxed) {
        if let Some(status) = engine.exec_instruction(code, natives, runtime)? {
            return Ok(status);
        }
    }
    Ok(EngineStatus::Stopped)
}
