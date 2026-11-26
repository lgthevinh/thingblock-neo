# ThingBlock Neo

A block-based programming editor built on Blockly, using Thingcode VM - a stack-based VM.

## Install

### Dependencies

- [Node.js](https://nodejs.org/) 22 or newer
- [Rust](https://rustup.rs/) 1.85 or newer
- The [Tauri 2 system dependencies](https://v2.tauri.app/start/prerequisites/) for your OS

```sh
git clone https://github.com/lgthevinh/thingblock-neo.git
cd thingblock-neo
npm install
```

## Usage

```sh
make dev     # launch the desktop app with live reload
make build   # build the desktop app
```

To run the editor alone in a browser, use `npm run dev -w @thingblock-neo/gui`. Running programs needs the desktop app.

## Contributing

Questions and bug reports go in [GitHub issues](https://github.com/lgthevinh/thingblock-neo/issues). Pull requests are welcome; see [CONTRIBUTING.md](.github/CONTRIBUTING.md) for setup, code style and commit conventions.

## License

[GPL-3.0-only](LICENSE) © lgthevinh
