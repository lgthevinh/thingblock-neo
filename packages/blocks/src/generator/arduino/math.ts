import type * as Blockly from 'blockly';
import { Order, type ArduinoGenerator } from '../arduino.ts';

const OPERATORS: Record<string, [string, number]> = {
    ADD: [' + ', Order.ADDITIVE],
    MINUS: [' - ', Order.ADDITIVE],
    MULTIPLY: [' * ', Order.MULTIPLICATIVE],
    DIVIDE: [' / ', Order.MULTIPLICATIVE],
};

// Shared by every number block variant: they differ only in field constraints.
function number(block: Blockly.Block): [string, number] {
    const num = Number(block.getFieldValue('NUM'));
    return [String(num), num < 0 ? Order.UNARY : Order.ATOMIC];
}

export const math = {
    math_number: number,
    math_integer: number,
    math_whole_number: number,
    math_positive_number: number,
    math_arithmetic(block: Blockly.Block, generator: ArduinoGenerator): [string, number] {
        const op = block.getFieldValue('OP');
        // C++ has no power operator.
        if (op === 'POWER') {
            const a = generator.valueToCode(block, 'A', Order.NONE) || '0';
            const b = generator.valueToCode(block, 'B', Order.NONE) || '0';
            return [`pow(${a}, ${b})`, Order.FUNCTION_CALL];
        }
        const [operator, order] = OPERATORS[op];
        const a = generator.valueToCode(block, 'A', order) || '0';
        const b = generator.valueToCode(block, 'B', order) || '0';
        return [a + operator + b, order];
    },
};
