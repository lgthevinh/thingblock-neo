# ThingBlock Neo

## Overview

ThingBlock Neo is a block-based programming editor built on [Blockly](https://developers.google.com/blockly). The editor is a web page, and a Tauri desktop app hosts it in the system webview, so the same editor runs in a browser and as a native application.

## Components

- **`packages/blocks`** (`@thingblock-neo/blocks`): TypeScript module that defines the blocks and the toolbox, and bundles Blockly. The app imports it directly as TypeScript; `make build-package` also bundles it standalone into `packages/blocks/dist/blocks.js`. Code generation, compiling and device flashing will live here.
- **`packages/gui`** (`@thingblock-neo/gui`): the editor frontend in Svelte 5 + Vite. It imports `blocks` and mounts the Blockly workspace.
- **`app/src-tauri`**: Rust / Tauri 2 desktop shell. It serves the built frontend (`packages/gui/dist/`) in the system webview; the Rust service layer lives here too.
- **`Makefile`**: shortcuts for the common commands: `make build-package` (build every package), `make build` (build the Tauri app), `make dev` (launch with live reload), `make clean`.
