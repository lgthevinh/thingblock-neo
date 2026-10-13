# ThingBlock Neo

## Overview

ThingBlock Neo is a block-based programming editor built on [Blockly](https://developers.google.com/blockly). The editor is a web page, and a Tauri desktop app hosts it in the system webview, so the same editor runs in a browser and as a native application.

## Components

- **`packages/core`** (`@thingblock-neo/core`): TypeScript module that defines the blocks and the toolbox, and bundles Blockly. esbuild compiles it into `app/src/dist/core.js`. Code generation, compiling and device flashing will live here.
- **`app/src`**: the editor frontend in plain HTML, CSS and JavaScript. It loads the `core` bundle and mounts the Blockly workspace.
- **`app/src-tauri`**: Rust / Tauri 2 desktop shell. It serves `app/src/` in the system webview; the Rust service layer lives here too.
- **`Makefile`**: shortcuts for the common commands: `make core` (bundle `core`), `make app` (build the Tauri app), `make run` (build and launch), `make clean`.
