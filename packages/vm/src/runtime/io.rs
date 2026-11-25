mod ble;
mod error;
mod tcp;
mod udp;

use std::time::Duration;

pub use error::IoError;

/// Byte connection to a device, whichever transport it runs over.
pub trait Connection {
    fn send(&mut self, data: &[u8]) -> Result<(), IoError>;

    /// Waits up to `timeout` for data, returning the number of bytes read into `buf`.
    fn recv(&mut self, buf: &mut [u8], timeout: Duration) -> Result<usize, IoError>;
}

/// Connections the runtime holds, addressed by index from natives.
#[derive(Default)]
pub struct Io {
    connections: Vec<Box<dyn Connection>>,
}

impl Io {
    /// Adds a connection, returning its index.
    pub fn add(&mut self, conn: Box<dyn Connection>) -> i32 {
        self.connections.push(conn);
        (self.connections.len() - 1) as i32
    }

    /// The connection at `idx`, as a native pops it from the stack.
    pub fn get_connections(&mut self, idx: i32) -> Result<&mut dyn Connection, IoError> {
        usize::try_from(idx)
            .ok()
            .and_then(|i| self.connections.get_mut(i))
            .map(|c| &mut **c as &mut dyn Connection)
            .ok_or(IoError::BadConnection(idx))
    }
}
