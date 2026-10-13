import type * as Blockly from 'blockly';

const COLOUR = 60;

export const events = {
    event_when_run: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'when run',
                nextStatement: null,
                colour: COLOUR,
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
                colour: COLOUR,
                tooltip: 'Run the blocks below when the key is pressed',
            });
        },
    },
};
