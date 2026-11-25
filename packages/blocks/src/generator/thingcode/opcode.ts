// Mirrors OpCode in packages/vm/src/engine/opcode.rs; an opcode's value is its index here.
export const OPCODES = [
    'HLT',
    'PSH',
    'ADD',
    'SUB',
    'MUL',
    'DIV',
    'MOD',
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
    'INVOKE_STATIC',
    'INVOKE_NATIVE',
] as const;

export type OpName = (typeof OPCODES)[number];
