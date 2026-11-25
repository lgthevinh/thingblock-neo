use crate::VmError;

#[repr(i32)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum OpCode {
    Hlt,
    Psh,
    Add,
    Sub,
    Mul,
    Load,
    Store,
    Jmp,
    Jnz,
    Gt,
    Gte,
    Lt,
    Lte,
    Eq,
    Neq,
    Call,
    Ret,
    Wait,
    InvokeStatic,
    InvokeNative,
}

impl TryFrom<i32> for OpCode {
    type Error = VmError;

    fn try_from(val: i32) -> Result<Self, VmError> {
        use OpCode::*;
        Ok(match val {
            0 => Hlt,
            1 => Psh,
            2 => Add,
            3 => Sub,
            4 => Mul,
            5 => Load,
            6 => Store,
            7 => Jmp,
            8 => Jnz,
            9 => Gt,
            10 => Gte,
            11 => Lt,
            12 => Lte,
            13 => Eq,
            14 => Neq,
            15 => Call,
            16 => Ret,
            17 => Wait,
            18 => InvokeStatic,
            19 => InvokeNative,
            _ => return Err(VmError::BadOpcode(val)),
        })
    }
}
