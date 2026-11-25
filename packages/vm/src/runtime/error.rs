use std::fmt;

use super::IoError;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum RuntimeError {
    Io(IoError),
}

impl From<IoError> for RuntimeError {
    fn from(err: IoError) -> Self {
        Self::Io(err)
    }
}

impl fmt::Display for RuntimeError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Self::Io(err) => write!(f, "{err}"),
        }
    }
}
