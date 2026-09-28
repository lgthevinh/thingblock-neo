use serde::{Deserialize, Serialize};

#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub struct BField {
    pub name: String,
    #[serde(flatten)]
    pub field: BFieldType,
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
#[serde(tag = "field_type", content = "value")]
pub enum BFieldType {
    Dropdown(String),
    Text(String),
    Number(f64),
    Checkbox(bool),
    Variable(String),
}
