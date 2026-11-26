import type * as Blockly from 'blockly';

const STYLE = 'event_blocks';

// Each key's value is its HID usage ID, with 0 for any key.
const KEYS: [string, string][] = [
    ['space', '44'],
    ['up arrow', '82'],
    ['down arrow', '81'],
    ['right arrow', '79'],
    ['left arrow', '80'],
    ['any', '0'],
    ...[...'abcdefghijklmnopqrstuvwxyz'].map((key, i): [string, string] => [key, `${4 + i}`]),
    // HID orders the digits 1 to 9, then 0.
    ...[...'0123456789'].map((key): [string, string] => [key, `${key === '0' ? 39 : 29 + +key}`]),
];

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
                args0: [{ type: 'field_dropdown', name: 'KEY', options: KEYS }],
                nextStatement: null,
                style: STYLE,
                tooltip: 'Run the blocks below when the key is pressed',
            });
        },
    },

    event_key_pressed: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'key %1 pressed?',
                args0: [{ type: 'field_dropdown', name: 'KEY', options: KEYS }],
                output: 'Boolean',
                style: STYLE,
                tooltip: 'True while the key is held down',
            });
        },
    },
};
