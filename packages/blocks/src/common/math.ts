import type * as Blockly from 'blockly';

const STYLE = 'math_blocks';

export const math = {
    math_number: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: '%1',
                args0: [{ type: 'field_number', name: 'NUM', value: 0 }],
                output: 'Number',
                style: STYLE,
                tooltip: 'A number',
            });
        },
    },
    math_integer: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: '%1',
                args0: [{ type: 'field_number', name: 'NUM', precision: 1 }],
                output: 'Number',
                style: STYLE,
                tooltip: 'A whole number, positive or negative',
            });
        },
    },
    math_whole_number: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: '%1',
                args0: [{ type: 'field_number', name: 'NUM', min: 0, precision: 1 }],
                output: 'Number',
                style: STYLE,
                tooltip: 'A whole number, zero or above',
            });
        },
    },
    math_positive_number: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: '%1',
                args0: [{ type: 'field_number', name: 'NUM', min: 0 }],
                output: 'Number',
                style: STYLE,
                tooltip: 'A number, zero or above',
            });
        },
    },
};
