use std::fmt;

use super::OpCode;
use crate::RuntimeError;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum EngineError {
    BadOpcode(i32),
    PcOutOfRange(usize),
    BadTarget(i32),
    BadGlobal(i32),
    BadNative(i32),
    BadAddress(i32),
    StackOverflow,
    StackUnderflow,
    CallOverflow,
    CallUnderflow,
    DivByZero,
    NotImplemented(OpCode),
    Runtime(RuntimeError),
}

impl From<RuntimeError> for EngineError {
    fn from(err: RuntimeError) -> Self {
        Self::Runtime(err)
    }
}

impl fmt::Display for EngineError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Self::BadOpcode(op) => write!(f, "bad opcode {op}"),
            Self::PcOutOfRange(pc) => write!(f, "pc {pc} is past the end of the program"),
            Self::BadTarget(target) => write!(f, "jump target {target} is outside the program"),
            Self::BadGlobal(idx) => write!(f, "global index {idx} is out of range"),
            Self::BadNative(id) => write!(f, "no native with id {id}"),
            Self::BadAddress(addr) => write!(f, "memory address {addr} is out of range"),
            Self::StackOverflow => write!(f, "operand stack overflow"),
            Self::StackUnderflow => write!(f, "operand stack underflow"),
            Self::CallOverflow => write!(f, "call stack overflow"),
            Self::CallUnderflow => write!(f, "return with an empty call stack"),
            Self::DivByZero => write!(f, "division by zero"),
            Self::NotImplemented(op) => write!(f, "{op:?} is not implemented"),
            Self::Runtime(err) => write!(f, "{err}"),
        }
    }
}
