import type { utils } from 'blockly';

export const toolbox: utils.toolbox.ToolboxInfo = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'IO',
      colour: '160',
      contents: [
        { kind: 'block', type: 'print' },
        { kind: 'block', type: 'text' },
      ],
    },
  ],
};
