import type * as Blockly from 'blockly';

const STYLE = 'event_blocks';

type Key = [label: string, code: string, usage: number];

// The keys the blocks name: dropdown label, KeyboardEvent.code, and HID usage ID.
const NAMED: Key[] = [
    ['space', 'Space', 44],
    ['up arrow', 'ArrowUp', 82],
    ['down arrow', 'ArrowDown', 81],
    ['right arrow', 'ArrowRight', 79],
    ['left arrow', 'ArrowLeft', 80],
];
const CHARS: Key[] = [
    ...[...'abcdefghijklmnopqrstuvwxyz'].map((key, i): Key => [
        key,
        `Key${key.toUpperCase()}`,
        4 + i,
    ]),
    // HID orders the digits 1 to 9, then 0.
    ...[...'0123456789'].map((key): Key => [key, `Digit${key}`, key === '0' ? 39 : 29 + +key]),
];

// Dropdown values are HID usage IDs, with 0 for any key.
const KEYS = [...NAMED, ['any', '', 0] as Key, ...CHARS].map(
    ([label, , usage]): [string, string] => [label, `${usage}`],
);

const USAGES = new Map([...NAMED, ...CHARS].map(([, code, usage]) => [code, usage]));

/** The HID usage ID of a `KeyboardEvent.code`, for the keys the blocks name. */
export function hidUsage(code: string): number | undefined {
    return USAGES.get(code);
}

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
