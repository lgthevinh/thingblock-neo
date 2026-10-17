// Main 'blockly' entry (core + stock blocks + English locale): the only one whose named exports work in both Node and the bundle.
import * as Blockly from 'blockly';
import { events } from './blocks/events.ts';
import { arduino } from './blocks/arduino.ts';
import { math } from './blocks/math.ts';
import { text } from './blocks/text.ts';
import { arduinoGenerator } from './generator/arduino.ts';
import { arduino as arduinoCode } from './generator/arduino/arduino.ts';
import { math as mathCode } from './generator/arduino/math.ts';
import { text as textCode } from './generator/arduino/text.ts';
import { logic as logicCode } from './generator/arduino/logic.ts';

Blockly.common.defineBlocks({
    ...events,
    ...arduino,
    ...math,
    ...text,
});

Object.assign(arduinoGenerator.forBlock, arduinoCode, mathCode, textCode, logicCode);

// Re-exported so the page uses the same Blockly instance the blocks were registered on.
export { Blockly };
export { toolbox } from './toolbox.ts';
export { theme } from './theme.ts';
export { arduinoGenerator };
