import type { utils } from 'blockly';

export const toolbox: utils.toolbox.ToolboxInfo = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category',
            name: 'Events',
            categorystyle: 'event_category',
            contents: [
                { kind: 'block', type: 'event_when_run' },
                { kind: 'block', type: 'event_when_key_pressed' },
            ],
        },
        {
            kind: 'category',
            name: 'Logic',
            categorystyle: 'logic_category',
            contents: [
                { kind: 'block', type: 'controls_if' },
                { kind: 'block', type: 'logic_compare' },
                { kind: 'block', type: 'logic_operation' },
                { kind: 'block', type: 'logic_negate' },
                { kind: 'block', type: 'logic_boolean' },
            ],
        },
        {
            kind: 'category',
            name: 'Math',
            categorystyle: 'math_category',
            contents: [
                { kind: 'block', type: 'math_number' },
                {
                    kind: 'block',
                    type: 'math_arithmetic',
                    inputs: {
                        A: { shadow: { type: 'math_number' } },
                        B: { shadow: { type: 'math_number' } },
                    },
                },
            ],
        },
        {
            kind: 'category',
            name: 'Text',
            categorystyle: 'text_category',
            contents: [{ kind: 'block', type: 'text' }],
        },
        {
            kind: 'category',
            name: 'Arduino',
            categorystyle: 'arduino_category',
            contents: [
                { kind: 'block', type: 'arduino_when_start' },
                { kind: 'block', type: 'arduino_when_loop' },
                { kind: 'block', type: 'arduino_serial_begin' },
                { kind: 'block', type: 'arduino_serial_print' },
            ],
        },
    ],
};
