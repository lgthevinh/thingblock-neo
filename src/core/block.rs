use crate::core::block_input::BInput;
use crate::core::block_field::BField;
pub struct Block {
    op_code: String,
    
    input: Option<Vec<BInput>>, 
    field: Option<Vec<BField>>,

    prev_bid: Option<String>,
    next_bid: Option<String>
}