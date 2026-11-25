mod error;
mod opcode;

pub use error::EngineError;
pub use opcode::OpCode;

use crate::Runtime;

const STACK_LEN: usize = 256;
const LOCAL_SLOT: usize = 16;
const CALL_DEPTH: usize = 8;

pub type NativeFn = fn(&mut Engine, &mut Runtime) -> Result<(), EngineError>;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum EngineStatus {
    Halted,
    Waiting(u32),
    /// Stopped through `Vm::stop_flag`.
    Stopped,
}

#[derive(Default)]
pub struct Engine {
    pc: usize,
    stack: Vec<i32>,
    call_stack: Vec<usize>,
    locals: [i32; LOCAL_SLOT],
}

impl Engine {
    pub fn push_stack(&mut self, val: i32) -> Result<(), EngineError> {
        if self.stack.len() >= STACK_LEN {
            return Err(EngineError::StackOverflow);
        }
        self.stack.push(val);
        Ok(())
    }

    pub fn pop_stack(&mut self) -> Result<i32, EngineError> {
        self.stack.pop().ok_or(EngineError::StackUnderflow)
    }

    pub(crate) fn reset_state(&mut self) {
        self.pc = 0;
        self.stack.clear();
        self.call_stack.clear();
    }

    pub(crate) fn exec_instruction(
        &mut self,
        code: &[i32],
        natives: &[NativeFn],
        runtime: &mut Runtime,
    ) -> Result<Option<EngineStatus>, EngineError> {
        let op = OpCode::try_from(self.fetch_slot(code)?)?;
        match op {
            OpCode::Hlt => {
                self.pc -= 1;
                return Ok(Some(EngineStatus::Halted));
            }
            OpCode::Psh => {
                let val = self.fetch_slot(code)?;
                self.push_stack(val)?;
            }
            OpCode::Add => self.apply_binary_op(i32::wrapping_add)?,
            OpCode::Sub => self.apply_binary_op(i32::wrapping_sub)?,
            OpCode::Mul => self.apply_binary_op(i32::wrapping_mul)?,
            OpCode::Div => self.apply_division_op(i32::wrapping_div)?,
            OpCode::Mod => self.apply_division_op(i32::wrapping_rem)?,
            OpCode::Load => {
                let idx = self.fetch_local_index(code)?;
                let val = self.locals[idx];
                self.push_stack(val)?;
            }
            OpCode::Store => {
                let idx = self.fetch_local_index(code)?;
                self.locals[idx] = self.pop_stack()?;
            }
            OpCode::Jmp => self.pc = self.fetch_target(code)?,
            OpCode::Jnz => {
                let target = self.fetch_target(code)?;
                if self.pop_stack()? != 0 {
                    self.pc = target;
                }
            }
            OpCode::Gt => self.apply_binary_op(|a, b| (a > b) as i32)?,
            OpCode::Gte => self.apply_binary_op(|a, b| (a >= b) as i32)?,
            OpCode::Lt => self.apply_binary_op(|a, b| (a < b) as i32)?,
            OpCode::Lte => self.apply_binary_op(|a, b| (a <= b) as i32)?,
            OpCode::Eq => self.apply_binary_op(|a, b| (a == b) as i32)?,
            OpCode::Neq => self.apply_binary_op(|a, b| (a != b) as i32)?,
            OpCode::Call => {
                let target = self.fetch_target(code)?;
                if self.call_stack.len() >= CALL_DEPTH {
                    return Err(EngineError::CallOverflow);
                }
                // pc already points past the operand, which is the return address
                self.call_stack.push(self.pc);
                self.pc = target;
            }
            OpCode::Ret => self.pc = self.call_stack.pop().ok_or(EngineError::CallUnderflow)?,
            OpCode::Wait => {
                let ms = self.pop_stack()?;
                return Ok(Some(EngineStatus::Waiting(ms.max(0) as u32)));
            }
            OpCode::InvokeStatic => return Err(EngineError::NotImplemented(op)),
            OpCode::InvokeNative => {
                let id = self.fetch_slot(code)?;
                let native = usize::try_from(id)
                    .ok()
                    .and_then(|i| natives.get(i))
                    .ok_or(EngineError::BadNative(id))?;
                native(self, runtime)?;
            }
        }
        Ok(None)
    }

    fn fetch_slot(&mut self, code: &[i32]) -> Result<i32, EngineError> {
        let val = *code
            .get(self.pc)
            .ok_or(EngineError::PcOutOfRange(self.pc))?;
        self.pc += 1;
        Ok(val)
    }

    fn apply_binary_op(&mut self, f: fn(i32, i32) -> i32) -> Result<(), EngineError> {
        let b = self.pop_stack()?;
        let a = self.pop_stack()?;
        self.push_stack(f(a, b))
    }

    fn apply_division_op(&mut self, f: fn(i32, i32) -> i32) -> Result<(), EngineError> {
        let b = self.pop_stack()?;
        let a = self.pop_stack()?;
        if b == 0 {
            return Err(EngineError::DivByZero);
        }
        // wrapping covers i32::MIN / -1, the one other case that overflows
        self.push_stack(f(a, b))
    }

    fn fetch_target(&mut self, code: &[i32]) -> Result<usize, EngineError> {
        let target = self.fetch_slot(code)?;
        usize::try_from(target)
            .ok()
            .filter(|&t| t < code.len())
            .ok_or(EngineError::BadTarget(target))
    }

    fn fetch_local_index(&mut self, code: &[i32]) -> Result<usize, EngineError> {
        let idx = self.fetch_slot(code)?;
        usize::try_from(idx)
            .ok()
            .filter(|&i| i < LOCAL_SLOT)
            .ok_or(EngineError::BadLocal(idx))
    }
}
