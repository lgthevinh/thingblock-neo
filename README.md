# ThingBlock Neo

## Overview

ThingBlock Neo is a block-based programming editor built on [Blockly](https://developers.google.com/blockly). The editor is a web page, and a Qt desktop app hosts it in a WebEngine view, so the same editor runs in a browser and as a native application.

## Components

- **`packages/core`** (`@thingblock-neo/core`): TypeScript module that defines the blocks and the toolbox, and bundles Blockly. esbuild compiles it into `web/dist/core.js`. Code generation, compiling and device flashing will live here.
- **`web`**: the editor frontend in plain HTML, CSS and JavaScript. It loads the `core` bundle and mounts the Blockly workspace.
- **`app`**: C++ Qt 6 / QML desktop shell (CMake). It opens `web/index.html` in a `WebEngineView`.
- **`Makefile`**: shortcuts for the common commands: `make core` (bundle `core`), `make app` (build the Qt app), `make run` (build and launch), `make clean`.
