// Block shapes ported from thingblock-editor's scratch3_thingbot_telemetrix extension; they have no generator yet.
import type * as Blockly from 'blockly';

const STYLE = 'thingbot_telemetrix_blocks';

function number(name: string) {
    return { type: 'input_value', name, check: 'Number' };
}

function menu(name: string, options: [string, string][]) {
    return { type: 'field_dropdown', name, options };
}

// Statement block, or a Number reporter when `reporter` is set.
function block(message: string, args: object[], tooltip: string, reporter = false) {
    return {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: message,
                args0: args,
                inputsInline: true,
                ...(reporter
                    ? { output: 'Number' }
                    : { previousStatement: null, nextStatement: null }),
                style: STYLE,
                tooltip,
            });
        },
    };
}

const ids = (count: number, prefix: string) =>
    Array.from({ length: count }, (_, i): [string, string] => [`${prefix}${i + 1}`, `${i + 1}`]);

export const thingbotTelemetrix = {
    thingbot_telemetrix_set_pin_mode: block(
        'set pin %1 mode %2',
        [
            number('PIN'),
            menu('MODE', [
                ['OUTPUT', 'OUTPUT'],
                ['INPUT', 'INPUT'],
                ['INPUT_PULLUP', 'INPUT_PULLUP'],
            ]),
        ],
        'Set the mode of a digital pin',
    ),
    thingbot_telemetrix_digital_write: block(
        'digital write pin %1 %2',
        [
            number('PIN'),
            menu('LEVEL', [
                ['HIGH', 'HIGH'],
                ['LOW', 'LOW'],
            ]),
        ],
        'Write a digital HIGH or LOW value to a pin',
    ),
    thingbot_telemetrix_digital_read: block(
        'digital read pin %1',
        [number('PIN')],
        'Read the digital value (0 or 1) from a pin',
        true,
    ),
    thingbot_telemetrix_analog_read: block(
        'analog read pin %1',
        [number('PIN')],
        'Read the analog value (0–1023) from a pin',
        true,
    ),
    thingbot_telemetrix_pwm_write: block(
        'PWM write pin %1 value %2',
        [number('PIN'), number('VALUE')],
        'Write a PWM value (0–255) to a pin',
    ),
    thingbot_telemetrix_servo_write: block(
        'servo %1 angle %2',
        [menu('SERVO_ID', ids(5, 'S')), number('ANGLE')],
        'Set a servo to an angle (0–180)',
    ),
    thingbot_telemetrix_control_dc: block(
        'motor %1 speed %2',
        [menu('MOTOR_ID', ids(4, 'M')), number('SPEED')],
        'Set a DC motor speed (-100–100, negative runs it backwards)',
    ),
    thingbot_telemetrix_control_buzzer: block(
        'buzzer frequency %1',
        [number('FREQ')],
        'Set buzzer frequency (0 = off, 1–100)',
    ),
    thingbot_telemetrix_control_led: block(
        'LED %1 %2',
        [
            menu('LED_ID', ids(2, 'LED ')),
            menu('LED_STATE', [
                ['on', 'on'],
                ['off', 'off'],
            ]),
        ],
        'Turn a ThingBot LED on or off',
    ),
    thingbot_telemetrix_setup_ultrasonic: block(
        'setup ultrasonic trigger %1 echo %2',
        [number('TRIG'), number('ECHO')],
        'Configure an HC-SR04 ultrasonic sensor',
    ),
    thingbot_telemetrix_read_distance: block(
        'ultrasonic distance (cm)',
        [],
        'Read the latest ultrasonic distance in centimetres',
        true,
    ),
    thingbot_telemetrix_setup_dht: block(
        'setup %1 sensor on pin %2',
        [
            menu('DHT_TYPE', [
                ['DHT11', 'DHT11'],
                ['DHT22', 'DHT22'],
            ]),
            number('PIN'),
        ],
        'Configure a DHT temperature/humidity sensor',
    ),
    thingbot_telemetrix_read_temperature: block(
        'temperature (°C) on pin %1',
        [number('PIN')],
        'Read the latest temperature from a DHT sensor',
        true,
    ),
    thingbot_telemetrix_read_humidity: block(
        'humidity (%%) on pin %1',
        [number('PIN')],
        'Read the latest humidity from a DHT sensor',
        true,
    ),
};
