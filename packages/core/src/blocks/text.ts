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
};
