import type * as Blockly from 'blockly';
import { Order, op, type ThingcodeGenerator } from '../thingcode.ts';
import { KEY_PRESSED } from './natives.ts';

export const events = {
    event_when_run(block: Blockly.Block, generator: ThingcodeGenerator) {
        generator.start.push(generator.blockToCode(block.getNextBlock()) as string);
        return '';
    },
    event_key_pressed(block: Blockly.Block): [string, number] {
        const code =
            op('PSH', Number(block.getFieldValue('KEY'))) + op('INVOKE_NATIVE', KEY_PRESSED);
        return [code, Order.ATOMIC];
    },
};
