import type * as Blockly from 'blockly';

const STYLE = 'text_blocks';

export const text = {
    text: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: '\"%1\"',
                args0: [{ type: 'field_input', name: 'TEXT' }],
                output: 'String',
                style: STYLE,
                tooltip: 'A piece of text',
            });
        },
    },

    text_print: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'print %1',
                args0: [{ type: 'input_value', name: 'VALUE' }],
                previousStatement: null,
                nextStatement: null,
                style: STYLE,
                tooltip: 'Show the text or number in the monitor',
            });
        },
    },

    text_ask: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'ask %1 and wait',
                args0: [{ type: 'input_value', name: 'QUESTION', check: 'String' }],
                previousStatement: null,
                nextStatement: null,
                style: STYLE,
                tooltip: 'Show the question in the monitor and wait for an answer',
            });
        },
    },

    text_answer: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'answer',
                output: 'String',
                style: STYLE,
                tooltip: 'The last answer typed in the monitor',
            });
        },
    },
};
