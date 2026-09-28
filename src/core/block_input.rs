pub struct BInput {
    shadow: u8,
    values: Vec<BInputValue>,
}

pub enum BInputValue {
    Int(i32),
    Double(f64),
    String(String),
    Bool(bool),
}
