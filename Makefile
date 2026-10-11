.PHONY: app run clean

app:
	cmake -S app -B build
	cmake --build build

run: app
	./build/thingblock_neo

clean:
	rm -rf build
