use super::EngineError;

#[repr(i32)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum OpCode {
    Hlt,
    Psh,
    Add,
    Sub,
    Mul,
    Div,
    Mod,
    GLoad,
    GStore,
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
    type Error = EngineError;

    fn try_from(val: i32) -> Result<Self, EngineError> {
        use OpCode::*;
        Ok(match val {
            0 => Hlt,
            1 => Psh,
            2 => Add,
            3 => Sub,
            4 => Mul,
            5 => Div,
            6 => Mod,
            7 => GLoad,
            8 => GStore,
            9 => Jmp,
            10 => Jnz,
            11 => Gt,
            12 => Gte,
            13 => Lt,
            14 => Lte,
            15 => Eq,
            16 => Neq,
            17 => Call,
            18 => Ret,
            19 => Wait,
            20 => InvokeStatic,
            21 => InvokeNative,
            _ => return Err(EngineError::BadOpcode(val)),
        })
    }
}
