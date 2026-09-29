/// One slot in a block definition's message: a field (inline value) or an input (socket).
#[derive(Debug, PartialEq)]
pub enum Arg {
    FieldDropdown { name: String, options: Vec<(String, String)> },
    FieldText { name: String, default: String },
    FieldNumber { name: String, default: f64 },
    FieldCheckbox { name: String, default: bool },
    FieldVariable { name: String },
    InputValue { name: String },
    InputStatement { name: String },
    InputDummy,
}
