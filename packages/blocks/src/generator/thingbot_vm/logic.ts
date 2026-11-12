import type * as Blockly from 'blockly';
import { Order, op, value, type ThingbotVmGenerator } from '../thingbot_vm.ts';
import type { OpName } from './opcode.ts';

// Any non-zero value is true; NEQ 0 turns it into exactly 1 so AND/OR can use MUL/ADD.
function bool(block: Blockly.Block, generator: ThingbotVmGenerator, input: string): string {
    return value(block, generator, input) + op('PSH', 0) + op('NEQ');
}

export const logic = {
    // There is no jump-if-zero, so each condition is inverted with EQ 0 before JNZ skips its branch.
    controls_if(block: Blockly.Block, generator: ThingbotVmGenerator) {
        const end = generator.label();
        let code = '';
        for (let n = 0; block.getInput(`IF${n}`); n++) {
            const next = generator.label();
            code += value(block, generator, `IF${n}`) + op('PSH', 0) + op('EQ') + op('JNZ', next);
            code += generator.statementToCode(block, `DO${n}`) + op('JMP', end) + `${next}:\n`;
        }
        if (block.getInput('ELSE')) code += generator.statementToCode(block, 'ELSE');
        return code + `${end}:\n`;
    },
    control_while(block: Blockly.Block, generator: ThingbotVmGenerator) {
        const start = generator.label();
        const end = generator.label();
        const code = `${start}:\n` + value(block, generator, 'CONDITION') + op('PSH', 0) + op('EQ') + op('JNZ', end);
        return code + generator.statementToCode(block, 'SUBSTACK') + op('JMP', start) + `${end}:\n`;
    },
    // Blockly's OP values (EQ, NEQ, LT, LTE, GT, GTE) are the VM's opcode names.
    logic_compare(block: Blockly.Block, generator: ThingbotVmGenerator): [string, number] {
        const code = value(block, generator, 'A') + value(block, generator, 'B');
        return [code + op(block.getFieldValue('OP') as OpName), Order.ATOMIC];
    },
    logic_operation(block: Blockly.Block, generator: ThingbotVmGenerator): [string, number] {
        const code = bool(block, generator, 'A') + bool(block, generator, 'B');
        if (block.getFieldValue('OP') === 'AND') return [code + op('MUL'), Order.ATOMIC];
        return [code + op('ADD') + op('PSH', 0) + op('NEQ'), Order.ATOMIC];
    },
    logic_negate(block: Blockly.Block, generator: ThingbotVmGenerator): [string, number] {
        return [value(block, generator, 'BOOL') + op('PSH', 0) + op('EQ'), Order.ATOMIC];
    },
    logic_boolean(block: Blockly.Block): [string, number] {
        return [op('PSH', block.getFieldValue('BOOL') === 'TRUE' ? 1 : 0), Order.ATOMIC];
    },
};
