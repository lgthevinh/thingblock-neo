// Main 'blockly' entry (core + stock blocks + English locale): the only one whose named exports work in both Node and the bundle.
import * as Blockly from 'blockly';
import { events } from './blocks/events.ts';
import { control } from './blocks/control.ts';
import { math } from './blocks/math.ts';
import { text } from './blocks/text.ts';
import { thingbot } from './blocks/thingbot.ts';
import { variables } from './blocks/variables.ts';
import { thingbotVmGenerator } from './generator/thingbot_vm.ts';
import { events as eventsCode } from './generator/thingbot_vm/events.ts';
import { thingbot as thingbotCode } from './generator/thingbot_vm/thingbot.ts';
import { logic as logicCode } from './generator/thingbot_vm/logic.ts';
import { math as mathCode } from './generator/thingbot_vm/math.ts';
import { variables as variablesCode } from './generator/thingbot_vm/variables.ts';

Blockly.common.defineBlocks({
    ...events,
    ...control,
    ...math,
    ...text,
    ...thingbot,
    ...variables,
});

Object.assign(thingbotVmGenerator.forBlock, eventsCode, thingbotCode, logicCode, mathCode, variablesCode);

// Re-exported so the page uses the same Blockly instance the blocks were registered on.
export { Blockly };
export { toolbox, setupVariables } from './toolbox.ts';
export { theme } from './theme.ts';
export { thingbotVmGenerator };
