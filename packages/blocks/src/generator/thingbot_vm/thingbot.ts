import type * as Blockly from 'blockly';
import { op, value, type ThingbotVmGenerator } from '../thingbot_vm.ts';
import type { OpName } from './opcode.ts';

// Device picked by the ID dropdown: pushes the id, then the input value, then runs the opcode.
function device(name: OpName, input: string, stoppable: boolean) {
    return (block: Blockly.Block, generator: ThingbotVmGenerator) => {
        const id = Number(block.getFieldValue('ID'));
        if (stoppable) generator.stops.add(op('PSH', id) + op('PSH', 0) + op(name));
        return op('PSH', id) + value(block, generator, input) + op(name);
    };
}

export const thingbot = {
    thingbot_motor: device('MOTOR', 'SPEED', true),
    // A servo holding its angle after the program ends is expected, so it has no stop.
    thingbot_servo: device('SERVO', 'ANGLE', false),
    thingbot_spin: device('SPIN', 'SPEED', true),
    thingbot_led: device('LED', 'BRIGHTNESS', true),
    thingbot_buzzer(block: Blockly.Block, generator: ThingbotVmGenerator) {
        generator.stops.add(op('PSH', 0) + op('BUZZ'));
        return value(block, generator, 'DUTY') + op('BUZZ');
    },
    thingbot_wait(block: Blockly.Block, generator: ThingbotVmGenerator) {
        return value(block, generator, 'MS') + op('WAIT');
    },
};
