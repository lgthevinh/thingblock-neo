// Main 'blockly' entry (core + stock blocks + English locale): the only one whose named exports work in both Node and the bundle.
import * as Blockly from 'blockly';
import { events } from './blocks/events.ts';
import { arduino } from './blocks/arduino.ts';
import { math } from './blocks/math.ts';
import { text } from './blocks/text.ts';

Blockly.common.defineBlocks({
    ...events,
    ...arduino,
    ...math,
    ...text,
});

// Re-exported so the page uses the same Blockly instance the blocks were registered on.
export { Blockly };
export { toolbox } from './toolbox.ts';
