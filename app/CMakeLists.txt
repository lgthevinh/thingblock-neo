cmake_minimum_required(VERSION 3.21)
project(thingblock_neo LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_AUTOMOC ON)

find_package(Qt6 REQUIRED COMPONENTS Quick WebEngineQuick)

qt_add_executable(thingblock_neo src/main.cpp)
qt_add_qml_module(thingblock_neo
    URI ThingBlock
    VERSION 1.0
    QML_FILES qml/Main.qml
)
target_compile_definitions(thingblock_neo PRIVATE
    WEB_ROOT="${CMAKE_CURRENT_SOURCE_DIR}/../web")
target_link_libraries(thingblock_neo PRIVATE Qt6::Quick Qt6::WebEngineQuick)
