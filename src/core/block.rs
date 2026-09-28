use crate::core::block_field::BField;
use crate::core::block_input::BInput;
use serde::{Deserialize, Serialize};
#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub struct Block {
    pub id: u32,
    pub op_code: String,
    pub is_hat: bool,

    pub input: Option<Vec<BInput>>,
    pub field: Option<Vec<BField>>,

    pub prev_bid: Option<u32>,
    pub next_bid: Option<u32>,
}
