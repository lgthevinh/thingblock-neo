use crate::OpCode;


#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum VmError {
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
