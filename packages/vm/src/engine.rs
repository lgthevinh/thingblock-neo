mod error;
mod opcode;

use std::ops::Range;

pub use error::EngineError;
pub use opcode::OpCode;

use crate::Runtime;
use crate::runtime::{NATIVES, NATIVES_BASE};

const STACK_LEN: usize = 256;
const GLOBAL_SLOT: usize = 256;
const CALL_DEPTH: usize = 64;
const MEM_LEN: usize = 4096;

pub type NativeFn = fn(&mut Engine, &mut Runtime) -> Result<(), EngineError>;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum EngineStatus {
    Halted,
    Waiting(u32),
    Stopped,
}

pub struct Engine {
    pc: usize,
    stack: Vec<i32>,
    call_stack: Vec<usize>,
    globals: [i32; GLOBAL_SLOT],
    memory: [u8; MEM_LEN],
}

impl Default for Engine {
    fn default() -> Self {
        Self {
            pc: 0,
            stack: Vec::new(),
            call_stack: Vec::new(),
            globals: [0; GLOBAL_SLOT],
            memory: [0; MEM_LEN],
        }
    }
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

    /// The memory bytes `ptr .. ptr + len`, as a native reads or writes a buffer.
    pub fn mem(&mut self, ptr: i32, len: i32) -> Result<&mut [u8], EngineError> {
        let len = usize::try_from(len).map_err(|_| EngineError::BadAddress(ptr))?;
        Ok(&mut self.memory[Self::mem_range(ptr, len)?])
    }

    pub fn reset_state(&mut self) {
        self.pc = 0;
        self.stack.clear();
        self.call_stack.clear();
        self.globals.fill(0);
        self.memory.fill(0);
    }

    pub fn exec_instruction(
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
            OpCode::GLoad => {
                let idx = self.fetch_global_index(code)?;
                let val = self.globals[idx];
                self.push_stack(val)?;
            }
            OpCode::GStore => {
                let idx = self.fetch_global_index(code)?;
                self.globals[idx] = self.pop_stack()?;
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
                // Ids from NATIVES_BASE up are the runtime's specific natives, below it the host's
                let (table, idx) = if id >= NATIVES_BASE {
                    (NATIVES, id - NATIVES_BASE)
                } else {
                    (natives, id)
                };
                let native = usize::try_from(idx)
                    .ok()
                    .and_then(|i| table.get(i))
                    .ok_or(EngineError::BadNative(id))?;
                native(self, runtime)?;
            }
            OpCode::MLoad8 => {
                let addr = self.pop_stack()?;
                let i = Self::mem_range(addr, 1)?.start;
                self.push_stack(self.memory[i] as i32)?;
            }
            OpCode::MStore8 => {
                let byte = self.pop_stack()?;
                let addr = self.pop_stack()?;
                let i = Self::mem_range(addr, 1)?.start;
                self.memory[i] = byte as u8;
            }
            OpCode::MLoad32 => {
                let addr = self.pop_stack()?;
                let mut bytes = [0; 4];
                bytes.copy_from_slice(&self.memory[Self::mem_range(addr, 4)?]);
                self.push_stack(i32::from_le_bytes(bytes))?;
            }
            OpCode::MStore32 => {
                let word = self.pop_stack()?;
                let addr = self.pop_stack()?;
                self.memory[Self::mem_range(addr, 4)?].copy_from_slice(&word.to_le_bytes());
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

    fn fetch_global_index(&mut self, code: &[i32]) -> Result<usize, EngineError> {
        let idx = self.fetch_slot(code)?;
        usize::try_from(idx)
            .ok()
            .filter(|&i| i < GLOBAL_SLOT)
            .ok_or(EngineError::BadGlobal(idx))
    }

    fn mem_range(addr: i32, len: usize) -> Result<Range<usize>, EngineError> {
        usize::try_from(addr)
            .ok()
            .filter(|&a| a + len <= MEM_LEN)
            .map(|a| a..a + len)
            .ok_or(EngineError::BadAddress(addr))
    }
}
