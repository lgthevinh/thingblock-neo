import type * as Blockly from 'blockly';

const STYLE = 'event_blocks';

export const events = {
    event_when_run: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'when run',
                nextStatement: null,
                style: STYLE,
                tooltip: 'Run the blocks below when the program starts',
            });
        },
    },

    event_when_key_pressed: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'when %1 key pressed',
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'KEY',
                        options: [
                            'space',
                            'up arrow',
                            'down arrow',
                            'right arrow',
                            'left arrow',
                            'any',
                            ...'abcdefghijklmnopqrstuvwxyz0123456789',
                        ].map((key) => [key, key]),
                    },
                ],
                nextStatement: null,
                style: STYLE,
                tooltip: 'Run the blocks below when the key is pressed',
            });
        },
    },
};
