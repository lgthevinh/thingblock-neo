import type * as Blockly from 'blockly';
import { Order, type ArduinoGenerator } from '../arduino.ts';

export const arduino = {
    arduino_when_start(block: Blockly.Block, generator: ArduinoGenerator) {
        generator.start.push(generator.blockToCode(block.getNextBlock()) as string);
        return '';
    },
    arduino_when_loop(block: Blockly.Block, generator: ArduinoGenerator) {
        generator.loop.push(generator.blockToCode(block.getNextBlock()) as string);
        return '';
    },
    arduino_serial_begin(block: Blockly.Block) {
        return `Serial.begin(${block.getFieldValue('BAUD')});\n`;
    },
    arduino_serial_print(block: Blockly.Block, generator: ArduinoGenerator) {
        const text = generator.valueToCode(block, 'TEXT', Order.NONE) || '""';
        return `Serial.println(${text});\n`;
    },
};
