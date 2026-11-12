import type * as Blockly from 'blockly';
import { Order, op, value, type ThingbotVmGenerator } from '../thingbot_vm.ts';
import type { OpName } from './opcode.ts';

const OPERATORS: Record<string, OpName> = {
    ADD: 'ADD',
    MINUS: 'SUB',
    MULTIPLY: 'MUL',
};

// Shared by every number block variant: they differ only in field constraints.
function number(block: Blockly.Block): [string, number] {
    const num = Number(block.getFieldValue('NUM'));
    // The VM stack holds int32 only; `| 0` changes fractions and out-of-range values.
    if ((num | 0) !== num) throw new Error(`ThingBot only supports whole numbers within int32, got ${num}`);
    return [op('PSH', num), Order.ATOMIC];
}

export const math = {
    math_number: number,
    math_integer: number,
    math_whole_number: number,
    math_positive_number: number,
    math_arithmetic(block: Blockly.Block, generator: ThingbotVmGenerator): [string, number] {
        const name = OPERATORS[block.getFieldValue('OP')];
        if (!name) throw new Error(`ThingBot does not support ${block.getFieldValue('OP').toLowerCase()} yet`);
        return [value(block, generator, 'A') + value(block, generator, 'B') + op(name), Order.ATOMIC];
    },
};
