// Main 'blockly' entry (core + stock blocks + English locale): the only one whose named exports work in both Node and the bundle.
import * as Blockly from 'blockly';
import { events } from './common/events.ts';
import { control } from './common/control.ts';
import { math } from './common/math.ts';
import { text } from './common/text.ts';
import { variables } from './common/variables.ts';
import { thingbotVmGenerator } from './generator/thingbot_vm.ts';
import { events as eventsCode } from './generator/thingbot_vm/events.ts';
import { logic as logicCode } from './generator/thingbot_vm/logic.ts';
import { math as mathCode } from './generator/thingbot_vm/math.ts';
import { variables as variablesCode } from './generator/thingbot_vm/variables.ts';
import { thingbot } from './external/thingbot/blocks.ts';
import { thingbot as thingbotCode } from './external/thingbot/generator.ts';
import { thingbotTelemetrix } from './external/thingbot-telemetrix/blocks.ts';

Blockly.common.defineBlocks({
    ...events,
    ...control,
    ...math,
    ...text,
    ...variables,
    ...thingbot,
    ...thingbotTelemetrix,
});

Object.assign(
    thingbotVmGenerator.forBlock,
    eventsCode,
    thingbotCode,
    logicCode,
    mathCode,
    variablesCode,
);

// Re-exported so the page uses the same Blockly instance the blocks were registered on.
export { Blockly };
export { toolbox, setupVariables } from './toolbox.ts';
export { theme } from './theme.ts';
export { thingbotVmGenerator };
