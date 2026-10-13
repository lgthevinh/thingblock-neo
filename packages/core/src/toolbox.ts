import type { utils } from 'blockly';

export const toolbox: utils.toolbox.ToolboxInfo = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Events',
      colour: '60',
      contents: [
        { kind: 'block', type: 'event_when_run' },
        { kind: 'block', type: 'event_when_key_pressed' },
      ],
    },
    {
      kind: 'category',
      name: 'IO',
      colour: '160',
      contents: [
        { kind: 'block', type: 'print' },
        { kind: 'block', type: 'text' },
      ],
    },
    {
      kind: 'category',
      name: 'Arduino',
      colour: '182',
      contents: [
        { kind: 'block', type: 'arduino_when_start' },
        { kind: 'block', type: 'arduino_serial_begin' },
        { kind: 'block', type: 'arduino_serial_print' }
      ],
    },
  ],
};
