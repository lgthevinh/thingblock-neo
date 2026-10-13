import * as Blockly from 'blockly';

const COLOUR = 183;

export const arduino = {
    event_when_arduino_start: {
        init(this: Blockly.Block) {
            this.appendDummyInput().appendField('when arduino start');
            this.setNextStatement(true);
            this.setColour(COLOUR);
            this.setTooltip('Run the blocks below when the board start');
        },
    },

};
