use super::OpCode;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum EngineError {
    BadOpcode(i32),
    PcOutOfRange(usize),
    BadTarget(i32),
    BadLocal(i32),
    BadNative(i32),
    StackOverflow,
    StackUnderflow,
    CallOverflow,
    CallUnderflow,
    NotImplemented(OpCode),
}
