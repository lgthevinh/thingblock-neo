use crate::core::block::Block;
use crate::core::block_field::{BField, BFieldType};
use crate::core::block_input::{BInput, BInputType};
use crate::core::variable::Var;
use std::collections::HashMap;
use crate::core::workspace::Workspace;

pub fn sample_workspace() -> Workspace {
    Workspace {
        blocks: vec![
            Block {
                id: 1,
                op_code: "event_loop".into(),
                is_hat: true,
                input: None,
                field: None,
                prev_bid: None,
                next_bid: Some(2),
            },
            digital_write(2, "HIGH", 1, Some(3)),
            Block {
                id: 3,
                op_code: "control_delay".into(),
                is_hat: false,
                input: Some(vec![BInput {
                    name: "MS".into(),
                    input: BInputType::Double(1000.0),
                }]),
                field: None,
                prev_bid: Some(2),
                next_bid: Some(4),
            },
            digital_write(4, "LOW", 3, Some(5)),
            Block {
                id: 5,
                op_code: "control_delay".into(),
                is_hat: false,
                input: Some(vec![BInput {
                    name: "MS".into(),
                    input: BInputType::Block(6),
                }]),
                field: None,
                prev_bid: Some(4),
                next_bid: None,
            },
            Block {
                id: 6,
                op_code: "data_variable".into(),
                is_hat: false,
                input: None,
                field: Some(vec![BField {
                    name: "VAR".into(),
                    field: BFieldType::Variable("var_delay_ms".into()),
                }]),
                prev_bid: Some(5),
                next_bid: None,
            },
        ],
        vars: HashMap::from([(
            "var_delay_ms".into(),
            Var {
                name: "delay_ms".into(),
                value: BInputType::Double(500.0),
            },
        )]),
    }
}

fn digital_write(id: u32, state: &str, prev: u32, next: Option<u32>) -> Block {
    Block {
        id,
        op_code: "gpio_digital_write".into(),
        is_hat: false,
        input: Some(vec![BInput {
            name: "PIN".into(),
            input: BInputType::Int(13),
        }]),
        field: Some(vec![BField {
            name: "STATE".into(),
            field: BFieldType::Dropdown(state.into()),
        }]),
        prev_bid: Some(prev),
        next_bid: next,
    }
}

#[test]
fn serialize_json() {
    let ws = sample_workspace();
    let json = serde_json::to_string_pretty(&ws).unwrap();
    println!("{json}");

    let back: Workspace = serde_json::from_str(&json).unwrap();
    assert_eq!(back, ws);
}
