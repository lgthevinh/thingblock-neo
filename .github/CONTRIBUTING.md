# Contributing to ThingBlock Neo

Thanks for helping out. This guide covers how to set up the project, how the code is organised, and what a pull request should look like.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 22 or newer, with npm
- [Rust](https://rustup.rs/) stable, 1.85 or newer (the crates use edition 2024)
- The [Tauri 2 system dependencies](https://v2.tauri.app/start/prerequisites/) for your OS, such as WebKitGTK on Linux

### Setup

```sh
git clone https://github.com/<your-username>/thingblock-neo.git
cd thingblock-neo
npm install
make dev
```

`make dev` launches the desktop app with live reload. To work on the editor alone in a browser, run `npm run dev -w @thingblock-neo/gui`. Running programs needs the desktop app, so the Run button is disabled in the browser.

Other `make` targets:

| Command              | What it does                                  |
| -------------------- | --------------------------------------------- |
| `make build-package` | Builds every package, including `blocks/dist` |
| `make build`         | Builds the desktop app                        |
| `make clean`         | Removes build output                          |

## Project layout

| Path              | What lives there                                                         |
| ----------------- | ------------------------------------------------------------------------ |
| `packages/blocks` | Block definitions, the toolbox, and the Thingcode generator (TypeScript) |
| `packages/vm`     | The stack-based VM that runs Thingcode bytecode (Rust)                   |
| `packages/gui`    | The editor frontend (Svelte 5 + Vite)                                    |
| `app/src-tauri`   | The Tauri 2 desktop shell, which hosts the editor and runs the VM (Rust) |

Some pieces are mirrored across languages and must change together:

- `packages/blocks/src/generator/thingcode/opcode.ts` mirrors `OpCode` in `packages/vm/src/engine/opcode.rs`.
- `packages/blocks/src/generator/thingcode/natives.ts` mirrors `NATIVES` in `packages/vm/src/runtime.rs`.

## Making a change

1. Fork the repository and create a branch from `main`.
2. Make your change, keeping it focused on one thing.
3. Run the checks below.
4. Open a pull request against `main` that describes what changed and why. Include a screenshot for visible UI changes.

### Checks

```sh
npm run format                                 # Prettier for TypeScript and Svelte
npm run typecheck -w @thingblock-neo/blocks    # TypeScript type check
cargo fmt --manifest-path packages/vm/Cargo.toml
cargo fmt --manifest-path app/src-tauri/Cargo.toml
make build-package
```

## Code style

Formatting is handled by Prettier (4-space indent, single quotes, 100-column lines) and `rustfmt`. Beyond formatting:

### Keep it simple

- Write the minimum code that solves the problem. Nothing speculative.
- Don't add features, options or configurability that weren't asked for.
- Don't add abstractions or helper classes for code that is used once.
- If a senior engineer would call it overcomplicated, simplify it.

### Comments

- Doc comments (`///`, `//!`, `/** */`) say what an item is or does, not why.
- Inner comments briefly say what a block does and why it is needed.
- Skip comments that only restate a name, a signature, or what the code already shows.

### Commit messages

Use a `type: summary` subject line in the imperative mood, such as `feat: add div/mod opcodes`. Common types are `feat`, `fix`, `refactor` and `style`.

For a commit with several changes, add a blank line and then a `- ` bullet per change:

```
feat: scratch-style shadow inputs and operator blocks

- drop standalone number, text and boolean blocks from the toolbox
- split arithmetic into separate +, −, ×, ÷ blocks
```

## Reporting bugs

Open an issue and include:

- Your OS, and whether you used the desktop app or the browser
- Steps to reproduce, with what you expected and what happened instead
- A screenshot of the blocks involved
- For a program that runs wrongly, the generated code from the Code panel (turn it on from the panels menu) and any monitor output or errors

## License

ThingBlock Neo is licensed under the [GNU General Public License v3.0](../LICENSE). By contributing, you agree that your contributions are licensed under the same terms.
