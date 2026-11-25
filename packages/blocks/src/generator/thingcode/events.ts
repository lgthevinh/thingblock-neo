import type * as Blockly from 'blockly';
import type { ThingcodeGenerator } from '../thingcode.ts';

export const events = {
    event_when_run(block: Blockly.Block, generator: ThingcodeGenerator) {
        generator.start.push(generator.blockToCode(block.getNextBlock()) as string);
        return '';
    },
};
