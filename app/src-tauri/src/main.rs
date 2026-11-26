// Hides the extra console window on Windows release builds.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{AppHandle, Emitter, Manager, State};
use vm::{Event, Vm};

#[tauri::command]
fn vm_run(vm: State<Vm>, slots: Vec<i32>) {
    vm.run(slots);
}

#[tauri::command]
fn vm_stop(vm: State<Vm>) {
    vm.stop();
}

#[tauri::command]
fn vm_key(vm: State<Vm>, code: u8, down: bool) {
    let keyboard = &vm.hid().keyboard;
    if down {
        keyboard.press(code);
    } else {
        keyboard.release(code);
    }
}

#[tauri::command]
fn vm_release_keys(vm: State<Vm>) {
    vm.hid().keyboard.release_all();
}

#[tauri::command]
fn vm_stdin(vm: State<Vm>, line: String) {
    vm.write_stdin(line);
}

/// Sends a VM event to the webview.
fn emit(app: &AppHandle, event: Event) {
    let _ = match event {
        Event::Running => app.emit("vm-status", "running"),
        Event::Idle => app.emit("vm-status", "idle"),
        Event::Print(line) => app.emit("vm-print", line),
        Event::Error(err) => app.emit("vm-error", err.to_string()),
    };
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle().clone();
            app.manage(Vm::new(&[], move |event| emit(&handle, event)));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            vm_run,
            vm_stop,
            vm_key,
            vm_release_keys,
            vm_stdin
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
