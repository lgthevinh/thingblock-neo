import * as Blockly from 'blockly';

const COLOUR = 60;

export const events = {
    event_when_run: {
        init(this: Blockly.Block) {
            this.appendDummyInput().appendField('when run');
            this.setNextStatement(true);
            this.setColour(COLOUR);
            this.setTooltip('Run the blocks below when the program starts');
        },
    },

    event_when_key_pressed: {
        init(this: Blockly.Block) {
            this.appendDummyInput()
                .appendField('when')
                .appendField(new Blockly.FieldDropdown(
                    [
                        'space',
                        'up arrow',
                        'down arrow',
                        'right arrow',
                        'left arrow',
                        'any',
                        ...'abcdefghijklmnopqrstuvwxyz0123456789',
                    ].map((key) => [key, key]),
                ), 'KEY')
                .appendField('key pressed');
            this.setNextStatement(true);
            this.setColour(COLOUR);
            this.setTooltip('Run the blocks below when the key is pressed');
        },
    },
};
