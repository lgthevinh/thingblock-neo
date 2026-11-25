use crate::{Engine, NativeFn, Status, VmError};

pub struct Vm {
    code: Vec<i32>,
    natives: &'static [NativeFn],
    engine: Engine,
}

impl Vm {
    pub fn new(natives: &'static [NativeFn]) -> Self {
        Self {
            code: Vec::new(),
            natives,
            engine: Engine::default(),
        }
    }

    pub fn load(&mut self, code: Vec<i32>) {
        self.code = code;
        self.engine.reset_state();
    }

    pub fn run(&mut self) -> Result<Status, VmError> {
        loop {
            if let Some(status) = self.engine.exec_instruction(&self.code, self.natives)? {
                return Ok(status);
            }
        }
    }
}
