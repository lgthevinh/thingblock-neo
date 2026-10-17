import type * as Blockly from 'blockly';

const STYLE = 'arduino_blocks';

export const arduino = {
    arduino_when_start: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'when arduino start',
                nextStatement: null,
                style: STYLE,
                tooltip: 'Run the blocks below when the board start',
            });
        },
    },
    arduino_when_loop: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'when arduino loop',
                nextStatement: null,
                style: STYLE,
                tooltip: 'Run the blocks below repeatedly while the board is on',
            });
        },
    },
    arduino_serial_begin: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'serial begin at %1 baud',
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'BAUD',
                        options: ['9600', '19200', '38400', '57600', '115200'].map((baud) => [
                            baud,
                            baud,
                        ]),
                    },
                ],
                previousStatement: null,
                nextStatement: null,
                style: STYLE,
                tooltip: 'Open the serial port at the given baud rate',
            });
        },
    },
    arduino_serial_print: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'serial print %1',
                args0: [{ type: 'input_value', name: 'TEXT' }],
                previousStatement: null,
                nextStatement: null,
                style: STYLE,
                tooltip: 'Print a value to the serial port',
            });
        },
    },
};
