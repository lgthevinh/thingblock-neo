// Mirrors the OpCode enum in thingbot-vm main/vm/opcode.h; an opcode's value is its index here.
export const OPCODES = [
    'HLT',
    'PSH',
    'ADD',
    'SUB',
    'MUL',
    'LOAD',
    'STORE',
    'JMP',
    'JNZ',
    'GT',
    'GTE',
    'LT',
    'LTE',
    'EQ',
    'NEQ',
    'CALL',
    'RET',
    'WAIT',
    'MOTOR',
    'SERVO',
    'SPIN',
    'BUZZ',
    'LED',
] as const;

export type OpName = (typeof OPCODES)[number];
