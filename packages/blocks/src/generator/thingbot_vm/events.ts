import type * as Blockly from 'blockly';
import type { ThingbotVmGenerator } from '../thingbot_vm.ts';

export const events = {
    event_when_run(block: Blockly.Block, generator: ThingbotVmGenerator) {
        generator.start.push(generator.blockToCode(block.getNextBlock()) as string);
        return '';
    },
};
