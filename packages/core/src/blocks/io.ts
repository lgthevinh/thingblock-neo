import type * as Blockly from 'blockly';

const COLOUR = 160;

export const io = {
  print: {
    init(this: Blockly.Block) {
      this.appendValueInput('TEXT').appendField('print');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(COLOUR);
      this.setTooltip('Print a value');
    },
  },
};
