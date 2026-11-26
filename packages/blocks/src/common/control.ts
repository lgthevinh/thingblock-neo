import type * as Blockly from 'blockly';

// Scratch's control colours, which the logic blocks already use.
const STYLE = 'logic_blocks';

/** Boolean reporter that compares two values with a fixed operator symbol. */
function compare(symbol: string, tooltip: string) {
    return {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: `%1 ${symbol} %2`,
                args0: [
                    { type: 'input_value', name: 'A' },
                    { type: 'input_value', name: 'B' },
                ],
                inputsInline: true,
                output: 'Boolean',
                style: STYLE,
                tooltip,
            });
        },
    };
}

export const control = {
    control_repeat: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'repeat %1 times',
                args0: [{ type: 'input_value', name: 'TIMES', check: 'Number' }],
                message1: '%1',
                args1: [{ type: 'input_statement', name: 'SUBSTACK' }],
                previousStatement: null,
                nextStatement: null,
                style: STYLE,
                tooltip: 'Run the blocks inside a number of times',
            });
        },
    },
    control_forever: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'forever',
                message1: '%1',
                args1: [{ type: 'input_statement', name: 'SUBSTACK' }],
                previousStatement: null,
                style: STYLE,
                tooltip: 'Run the blocks inside over and over',
            });
        },
    },
    control_while: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'while %1',
                args0: [{ type: 'input_value', name: 'CONDITION', check: 'Boolean' }],
                message1: '%1',
                args1: [{ type: 'input_statement', name: 'SUBSTACK' }],
                previousStatement: null,
                nextStatement: null,
                style: STYLE,
                tooltip: 'Repeat the blocks inside while the condition is true',
            });
        },
    },
    control_wait: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'wait %1 ms',
                args0: [{ type: 'input_value', name: 'MS', check: 'Number' }],
                inputsInline: true,
                previousStatement: null,
                nextStatement: null,
                style: STYLE,
                tooltip: 'Pause for a number of milliseconds',
            });
        },
    },
    logic_lt: compare('<', 'True if the first value is less than the second'),
    logic_equals: compare('=', 'True if both values are equal'),
    logic_gt: compare('>', 'True if the first value is greater than the second'),
};
