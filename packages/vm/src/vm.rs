use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;

use crate::{Engine, EngineError, EngineStatus, NativeFn};

pub struct Vm {
    code: Vec<i32>,
    natives: &'static [NativeFn],
    engine: Engine,
    stop: Arc<AtomicBool>,
}

impl Vm {
    pub fn new(natives: &'static [NativeFn]) -> Self {
        Self {
            code: Vec::new(),
            natives,
            engine: Engine::default(),
            stop: Arc::new(AtomicBool::new(false)),
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

    /// Runs until the program halts, waits or is stopped.
    pub fn run(&mut self) -> Result<EngineStatus, EngineError> {
        while !self.stop.load(Ordering::Relaxed) {
            if let Some(status) = self.engine.exec_instruction(&self.code, self.natives)? {
                return Ok(status);
            }
        }
        Ok(EngineStatus::Stopped)
    }
}
