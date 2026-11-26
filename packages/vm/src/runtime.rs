mod error;
mod hid;
mod io;
mod stdio;

use std::sync::Arc;

pub use error::RuntimeError;
pub use hid::{Hid, Keyboard};
pub use io::{Connection, Io, IoError};
pub use stdio::Stdio;

use crate::NativeFn;

/// Id of the first entry in `NATIVES`.
pub const NATIVES_BASE: i32 = 0x8000;

/// Runtime-specific natives, each at id `NATIVES_BASE` plus its index.
pub static NATIVES: &[NativeFn] = &[
    hid::key_pressed,
    stdio::print_int,
    stdio::print_str,
    stdio::read_str,
];

/// Host environment that natives act on.
pub struct Runtime {
    pub io: Io,
    pub hid: Arc<Hid>,
    pub stdio: Stdio,
}
