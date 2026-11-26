mod keyboard;

pub use keyboard::Keyboard;
pub(super) use keyboard::key_pressed;

/// Input devices the host feeds and natives read.
#[derive(Default)]
pub struct Hid {
    pub keyboard: Keyboard,
}
