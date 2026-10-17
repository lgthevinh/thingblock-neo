.PHONY: build-package build dev clean

all: dev

build-package:
	npm run build --workspaces

build:
	npx tauri build --no-bundle

dev:
	npx tauri dev

clean:
	rm -rf app/src-tauri/target packages/gui/dist packages/blocks/dist
