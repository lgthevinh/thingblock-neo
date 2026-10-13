import * as Blockly from 'blockly';

const COLOUR = 183;

export const arduino = {
    arduino_when_start: {
        init(this: Blockly.Block) {
            this.appendDummyInput().appendField('when arduino start');
            this.setNextStatement(true);
            this.setColour(COLOUR);
            this.setTooltip('Run the blocks below when the board start');
        },
    },
    arduino_serial_begin: {
        init(this: Blockly.Block) {
            this.appendDummyInput()
                .appendField('serial begin at')
                .appendField(new Blockly.FieldDropdown(
                    ['9600', '19200', '38400', '57600', '115200'].map((baud) => [baud, baud]),
                ), 'BAUD')
                .appendField('baud');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(COLOUR);
            this.setTooltip('Open the serial port at the given baud rate');
        },
    },
    arduino_serial_print: {
        init(this: Blockly.Block) {
            this.appendValueInput('TEXT').appendField('serial print');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(COLOUR);
            this.setTooltip('Print a value to the serial port');
        },
    },
};
