import type * as Blockly from 'blockly';

const STYLE = 'thingbot_blocks';

// Dropdown of 1-based device ids, labelled `${prefix}${id}`.
function ids(count: number, prefix = '') {
    return {
        type: 'field_dropdown',
        name: 'ID',
        options: Array.from({ length: count }, (_, i) => [`${prefix}${i + 1}`, `${i + 1}`]),
    };
}

// Statement block: `message` with the device dropdown as %1 and a number input as %2.
function device(message: string, id: object | null, input: string, tooltip: string) {
    const args = [...(id ? [id] : []), { type: 'input_value', name: input, check: 'Number' }];
    return {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: message,
                args0: args,
                inputsInline: true,
                previousStatement: null,
                nextStatement: null,
                style: STYLE,
                tooltip,
            });
        },
    };
}

export const thingbot = {
    thingbot_motor: device('set motor %1 speed %2', ids(4, 'M'), 'SPEED', 'Set a motor speed, -100 to 100'),
    thingbot_servo: device('set servo %1 angle %2', ids(5), 'ANGLE', 'Turn a servo to an angle, 0 to 180'),
    thingbot_spin: device(
        'set 360° servo %1 speed %2',
        ids(5),
        'SPEED',
        'Set a 360° servo speed, -100 to 100',
    ),
    thingbot_led: device('set LED %1 brightness %2', ids(2), 'BRIGHTNESS', 'Set an LED brightness, 0 to 100'),
    thingbot_buzzer: device('set buzzer %1', null, 'DUTY', 'Set the buzzer volume, 0 to 100'),
    thingbot_wait: device('wait %1 ms', null, 'MS', 'Pause for a number of milliseconds'),
};
