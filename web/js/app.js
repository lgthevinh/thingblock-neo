// Mounts the Blockly workspace; blocks are already registered by core's bundle.
const { Blockly, toolbox } = ThingBlockCore;

Blockly.inject('blocklyDiv', { toolbox, media: '../node_modules/blockly/media/' });
