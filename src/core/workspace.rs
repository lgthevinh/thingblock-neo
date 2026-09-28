use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use crate::core::block::Block;
use crate::core::variable::Var;

#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub struct Workspace {
    pub blocks: Vec<Block>,
    pub vars: HashMap<String, Var>,
}
