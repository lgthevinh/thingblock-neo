use std::fmt;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum IoError {
    /// No connection at this index.
    BadConnection(i32),
    Timeout,
    Disconnected,
}

impl fmt::Display for IoError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Self::BadConnection(idx) => write!(f, "no connection at index {idx}"),
            Self::Timeout => write!(f, "connection timed out"),
            Self::Disconnected => write!(f, "connection lost"),
        }
    }
}
