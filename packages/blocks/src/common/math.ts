import type * as Blockly from 'blockly';

const STYLE = 'math_blocks';

/** Reporter that takes two numbers on either side of a fixed operator symbol. */
function arithmetic(symbol: string, tooltip: string) {
    return {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: `%1 ${symbol} %2`,
                args0: [
                    { type: 'input_value', name: 'A', check: 'Number' },
                    { type: 'input_value', name: 'B', check: 'Number' },
                ],
                inputsInline: true,
                output: 'Number',
                style: STYLE,
                tooltip,
            });
        },
    };
}

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
    math_add: arithmetic('+', 'Add two whole numbers'),
    math_subtract: arithmetic('−', 'Subtract the second number from the first'),
    math_multiply: arithmetic('×', 'Multiply two whole numbers'),
    math_divide: arithmetic('÷', 'Divide the first number by the second'),
};
