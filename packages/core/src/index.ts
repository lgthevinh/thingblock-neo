// Main 'blockly' entry (core + stock blocks + English locale): the only one whose named exports work in both Node and the bundle.
import * as Blockly from 'blockly';
import { io } from './blocks/io.ts';

Blockly.common.defineBlocks({ ...io });

// Re-exported so the page uses the same Blockly instance the blocks were registered on.
export { Blockly };
export { toolbox } from './toolbox.ts';
