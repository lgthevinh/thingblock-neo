import type * as Blockly from 'blockly';
import { Order, op, value, type ThingcodeGenerator } from '../thingcode.ts';

export const variables = {
    data_variable(block: Blockly.Block, generator: ThingcodeGenerator): [string, number] {
        return [op('LOAD', generator.variable(block.getFieldValue('VARIABLE'))), Order.ATOMIC];
    },
    data_setvariableto(block: Blockly.Block, generator: ThingcodeGenerator) {
        return (
            value(block, generator, 'VALUE') +
            op('STORE', generator.variable(block.getFieldValue('VARIABLE')))
        );
    },
    data_changevariableby(block: Blockly.Block, generator: ThingcodeGenerator) {
        const slot = generator.variable(block.getFieldValue('VARIABLE'));
        return op('LOAD', slot) + value(block, generator, 'VALUE') + op('ADD') + op('STORE', slot);
    },
};
