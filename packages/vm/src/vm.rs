use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::mpsc::{Receiver, Sender};
use std::sync::Arc;

use crate::{Engine, EngineError, EngineStatus, Hid, Io, NativeFn, Runtime, Stdio};

pub struct Vm {
    code: Vec<i32>,
    natives: &'static [NativeFn],
    engine: Engine,
    runtime: Runtime,
    stop: Arc<AtomicBool>,
    stdin: Sender<String>,
    stdout: Option<Receiver<String>>,
}

impl Vm {
    pub fn new(natives: &'static [NativeFn]) -> Self {
        let (stdio, stdin, stdout) = Stdio::new();
        Self {
            code: Vec::new(),
            natives,
            engine: Engine::default(),
            runtime: Runtime {
                io: Io::default(),
                hid: Arc::default(),
                stdio,
            },
            stop: Arc::new(AtomicBool::new(false)),
            stdin,
            stdout: Some(stdout),
        }
    }

    /// Replaces the program and resets execution to its start, clearing any stop request.
    pub fn load(&mut self, code: Vec<i32>) {
        self.code = code;
        self.engine.reset_state();
        self.stop.store(false, Ordering::Relaxed);
    }

    /// Flag that makes `run` return `Stopped` when set to true, from any thread.
    pub fn stop_flag(&self) -> Arc<AtomicBool> {
        self.stop.clone()
    }

    /// Input devices the host feeds events into, from any thread.
    pub fn hid(&self) -> Arc<Hid> {
        self.runtime.hid.clone()
    }

    /// Sender of the input lines the program reads, from any thread.
    pub fn stdin(&self) -> Sender<String> {
        self.stdin.clone()
    }

    /// Receiver of the lines the program prints; only the first call gets it.
    pub fn take_stdout(&mut self) -> Option<Receiver<String>> {
        self.stdout.take()
    }

    /// Runs until the program halts, waits or is stopped.
    pub fn run(&mut self) -> Result<EngineStatus, EngineError> {
        while !self.stop.load(Ordering::Relaxed) {
            if let Some(status) =
                self.engine
                    .exec_instruction(&self.code, self.natives, &mut self.runtime)?
            {
                return Ok(status);
            }
        }
        Ok(EngineStatus::Stopped)
    }
}
