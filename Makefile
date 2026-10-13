.PHONY: core app run clean

all: run

core:
	npm run build -w @thingblock-neo/core

app:
	npx tauri build --no-bundle

run:
	npx tauri dev

clean:
	rm -rf app/src-tauri/target packages/gui/dist packages/core/dist
