.PHONY: core app run clean

all: core run

core:
	npm run build -w @thingblock-neo/core

app:
	cmake -S app -B build
	cmake --build build

run: app
	./build/thingblock_neo

clean:
	rm -rf build
