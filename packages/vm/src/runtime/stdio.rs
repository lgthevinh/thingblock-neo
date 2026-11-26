use std::sync::mpsc::{self, Receiver, Sender};

use crate::{Engine, EngineError, Runtime};

const ERR_AGAIN: i32 = -2;

/// Lines of text between the program and the host.
pub struct Stdio {
    out: Sender<String>,
    input: Receiver<String>,
}

impl Stdio {
    /// A `Stdio`, with the host's ends: a sender for input and a receiver for output.
    pub fn new() -> (Self, Sender<String>, Receiver<String>) {
        let (out, stdout) = mpsc::channel();
        let (stdin, input) = mpsc::channel();
        (Self { out, input }, stdin, stdout)
    }

    fn print(&self, line: String) {
        // With no host listening the line has nowhere to go, so it is dropped
        let _ = self.out.send(line);
    }
}

/// `( n -- )`: prints `n` as a line.
pub fn print_int(engine: &mut Engine, runtime: &mut Runtime) -> Result<(), EngineError> {
    let n = engine.pop_stack()?;
    runtime.stdio.print(n.to_string());
    Ok(())
}

/// `( ptr len -- )`: prints the bytes at `ptr` as a line.
pub fn print_str(engine: &mut Engine, runtime: &mut Runtime) -> Result<(), EngineError> {
    let len = engine.pop_stack()?;
    let ptr = engine.pop_stack()?;
    let line = String::from_utf8_lossy(engine.mem(ptr, len)?).into_owned();
    runtime.stdio.print(line);
    Ok(())
}

/// `( ptr len -- r )`: writes the next input line at `ptr`, cut to `len` bytes, and pushes its
/// length, or `ERR_AGAIN` when no line is waiting.
pub fn read_line(engine: &mut Engine, runtime: &mut Runtime) -> Result<(), EngineError> {
    let len = engine.pop_stack()?;
    let ptr = engine.pop_stack()?;
    let buf = engine.mem(ptr, len)?;
    let r = match runtime.stdio.input.try_recv() {
        Ok(line) => {
            let n = line.len().min(buf.len());
            buf[..n].copy_from_slice(&line.as_bytes()[..n]);
            n as i32
        }
        Err(_) => ERR_AGAIN,
    };
    engine.push_stack(r)
}
