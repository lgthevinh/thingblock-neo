import type * as Blockly from 'blockly';
import { Order, type ArduinoGenerator } from '../arduino.ts';

export const text = {
    text(block: Blockly.Block, generator: ArduinoGenerator): [string, number] {
        return [generator.quote_(block.getFieldValue('TEXT')), Order.ATOMIC];
    },
};
