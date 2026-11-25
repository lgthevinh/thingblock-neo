mod error;
mod io;

pub use error::RuntimeError;
pub use io::{Connection, Io, IoError};

/// Host environment that natives act on.
#[derive(Default)]
pub struct Runtime {
    pub io: Io,
}
