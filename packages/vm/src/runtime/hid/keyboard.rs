use std::sync::atomic::{AtomicU64, Ordering};

use crate::{Engine, EngineError, Runtime};

/// Keys held down, one bit per HID usage ID.
#[derive(Default)]
pub struct Keyboard {
    keys: [AtomicU64; 4],
}

impl Keyboard {
    pub fn press(&self, code: u8) {
        self.word(code).fetch_or(Self::bit(code), Ordering::Relaxed);
    }

    pub fn release(&self, code: u8) {
        self.word(code)
            .fetch_and(!Self::bit(code), Ordering::Relaxed);
    }

    pub fn release_all(&self) {
        for word in &self.keys {
            word.store(0, Ordering::Relaxed);
        }
    }

    /// Whether the key is held; code 0 asks whether any key is.
    pub fn is_pressed(&self, code: u8) -> bool {
        if code == 0 {
            return self.keys.iter().any(|w| w.load(Ordering::Relaxed) != 0);
        }
        self.word(code).load(Ordering::Relaxed) & Self::bit(code) != 0
    }

    fn word(&self, code: u8) -> &AtomicU64 {
        &self.keys[code as usize / 64]
    }

    fn bit(code: u8) -> u64 {
        1 << (code % 64)
    }
}

/// Pops a HID usage ID and pushes 1 if that key is held, else 0.
pub fn key_pressed(engine: &mut Engine, runtime: &mut Runtime) -> Result<(), EngineError> {
    let code = engine.pop_stack()?;
    // A code outside u8 names no key, so it reads as not held
    let held = u8::try_from(code).is_ok_and(|c| runtime.hid.keyboard.is_pressed(c));
    engine.push_stack(held as i32)
}
