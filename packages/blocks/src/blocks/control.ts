import type * as Blockly from 'blockly';

// Scratch's control colours, which the logic blocks already use.
const STYLE = 'logic_blocks';

export const control = {
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
};
