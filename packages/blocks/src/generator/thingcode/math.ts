import type * as Blockly from 'blockly';
import { Order, op, value, type ThingcodeGenerator } from '../thingcode.ts';
import type { OpName } from './opcode.ts';

/** Generator for a two-input arithmetic block that ends with the given opcode. */
function arithmetic(name: OpName) {
    return (block: Blockly.Block, generator: ThingcodeGenerator): [string, number] => [
        value(block, generator, 'A') + value(block, generator, 'B') + op(name),
        Order.ATOMIC,
    ];
}

// Shared by every number block variant: they differ only in field constraints.
function number(block: Blockly.Block): [string, number] {
    const num = Number(block.getFieldValue('NUM'));
    // The VM stack holds int32 only; `| 0` changes fractions and out-of-range values.
    if ((num | 0) !== num)
        throw new Error(`ThingBot only supports whole numbers within int32, got ${num}`);
    return [op('PSH', num), Order.ATOMIC];
}

export const math = {
    math_number: number,
    math_integer: number,
    math_whole_number: number,
    math_positive_number: number,
    math_add: arithmetic('ADD'),
    math_subtract: arithmetic('SUB'),
    math_multiply: arithmetic('MUL'),
    math_divide: arithmetic('DIV'),
    math_modulo(block: Blockly.Block, generator: ThingcodeGenerator): [string, number] {
        return [
            value(block, generator, 'DIVIDEND') + value(block, generator, 'DIVISOR') + op('MOD'),
            Order.ATOMIC,
        ];
    },
};
