import type * as Blockly from 'blockly';

// Scratch's control colours, which the logic blocks already use.
const STYLE = 'logic_blocks';

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
};
