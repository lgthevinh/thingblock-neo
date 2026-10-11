// Mounts an empty Blockly workspace; toolbox and blocks come from @thingblock-neo/core later.
Blockly.inject('blocklyDiv', { toolbox: { kind: 'flyoutToolbox', contents: [{ kind: 'block', type: 'logic_boolean' }] } });
