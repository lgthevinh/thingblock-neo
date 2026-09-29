use crate::blocks::arg::Arg;

/// Schema for a block type: what fields and inputs its instances carry.
#[derive(Debug, PartialEq)]
pub struct BlockDef {
    pub opcode: String,
    pub msg: String,
    pub args: Vec<Arg>,
}
