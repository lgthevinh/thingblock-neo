import type * as Blockly from 'blockly';
import { Order, type ArduinoGenerator } from '../arduino.ts';

const COMPARISONS: Record<string, string> = {
    EQ: '==',
    NEQ: '!=',
    LT: '<',
    LTE: '<=',
    GT: '>',
    GTE: '>=',
};

export const logic = {
    // Walks the IFn/DOn inputs added by the else-if mutator, then the optional ELSE.
    controls_if(block: Blockly.Block, generator: ArduinoGenerator) {
        let code = '';
        for (let n = 0; block.getInput(`IF${n}`); n++) {
            const condition = generator.valueToCode(block, `IF${n}`, Order.NONE) || 'false';
            const branch = generator.statementToCode(block, `DO${n}`);
            code += `${n > 0 ? ' else ' : ''}if (${condition}) {\n${branch}}`;
        }
        if (block.getInput('ELSE')) {
            code += ` else {\n${generator.statementToCode(block, 'ELSE')}}`;
        }
        return code + '\n';
    },
    logic_compare(block: Blockly.Block, generator: ArduinoGenerator): [string, number] {
        const op = block.getFieldValue('OP');
        const order = op === 'EQ' || op === 'NEQ' ? Order.EQUALITY : Order.RELATIONAL;
        const a = generator.valueToCode(block, 'A', order) || '0';
        const b = generator.valueToCode(block, 'B', order) || '0';
        return [`${a} ${COMPARISONS[op]} ${b}`, order];
    },
    logic_operation(block: Blockly.Block, generator: ArduinoGenerator): [string, number] {
        const isAnd = block.getFieldValue('OP') === 'AND';
        const order = isAnd ? Order.LOGICAL_AND : Order.LOGICAL_OR;
        const a = generator.valueToCode(block, 'A', order) || 'false';
        const b = generator.valueToCode(block, 'B', order) || 'false';
        return [`${a} ${isAnd ? '&&' : '||'} ${b}`, order];
    },
    logic_negate(block: Blockly.Block, generator: ArduinoGenerator): [string, number] {
        const value = generator.valueToCode(block, 'BOOL', Order.UNARY) || 'true';
        return [`!${value}`, Order.UNARY];
    },
    logic_boolean(block: Blockly.Block): [string, number] {
        return [block.getFieldValue('BOOL') === 'TRUE' ? 'true' : 'false', Order.ATOMIC];
    },
};
