import type * as Blockly from 'blockly';
import {
    ANSWER_LEN,
    ANSWER_PTR,
    Order,
    loopBack,
    op,
    text as textValue,
    value,
    type ThingcodeGenerator,
} from '../thingcode.ts';
import { PRINT_INT, PRINT_STR, READ_STR } from './natives.ts';

// The answer's length lives in a hidden variable slot; its bytes are at ANSWER_PTR.
const ANSWER = 'text:answer';

export const text = {
    text(block: Blockly.Block, generator: ThingcodeGenerator): [string, number] {
        const [ptr, len] = generator.literal(block.getFieldValue('TEXT'));
        return [op('PSH', ptr) + op('PSH', len), Order.ATOMIC];
    },
    // Variables are untyped ints, so only an input that outputs String prints as text.
    text_print(block: Blockly.Block, generator: ThingcodeGenerator) {
        const isText = block
            .getInputTargetBlock('VALUE')
            ?.outputConnection?.getCheck()
            ?.includes('String');
        if (isText) return textValue(block, generator, 'VALUE') + op('INVOKE_NATIVE', PRINT_STR);
        return value(block, generator, 'VALUE') + op('INVOKE_NATIVE', PRINT_INT);
    },
    // READ_STR returns ERR_AGAIN until a line arrives, so poll it like a loop.
    text_ask(block: Blockly.Block, generator: ThingcodeGenerator) {
        const answer = generator.variable(ANSWER);
        const start = generator.label();
        const end = generator.label();
        return (
            textValue(block, generator, 'QUESTION') +
            op('INVOKE_NATIVE', PRINT_STR) +
            `${start}:\n` +
            op('PSH', ANSWER_PTR) +
            op('PSH', ANSWER_LEN) +
            op('INVOKE_NATIVE', READ_STR) +
            op('GSTORE', answer) +
            op('GLOAD', answer) +
            op('PSH', 0) +
            op('GTE') +
            op('JNZ', end) +
            loopBack(start) +
            `${end}:\n`
        );
    },
    text_answer(_block: Blockly.Block, generator: ThingcodeGenerator): [string, number] {
        return [op('PSH', ANSWER_PTR) + op('GLOAD', generator.variable(ANSWER)), Order.ATOMIC];
    },
};
