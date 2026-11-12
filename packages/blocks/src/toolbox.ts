import * as Blockly from 'blockly';
import type { utils } from 'blockly';
import { MAX_VARIABLES } from './generator/thingbot_vm.ts';

// Number shadow for a block input, so it shows an editable default.
function number(value: number) {
    return { shadow: { type: 'math_number', fields: { NUM: value } } };
}

/** Scratch-style Variables flyout: the create button, a reporter per variable, then set and change. */
function variablesCategory(workspace: Blockly.WorkspaceSvg): utils.toolbox.FlyoutItemInfoArray {
    const variables = workspace.getVariableMap().getVariablesOfType('').sort(Blockly.Variables.compareByName);
    const button: utils.toolbox.ButtonInfo = {
        kind: 'button',
        text: Blockly.Msg.NEW_VARIABLE,
        callbackkey: 'CREATE_VARIABLE',
    };
    if (!variables.length) return [button];

    const field = (variable: Blockly.IVariableModel<Blockly.IVariableState>) => ({ VARIABLE: { id: variable.getId() } });
    const reporters: utils.toolbox.BlockInfo[] = variables.map((variable) => ({
        kind: 'block',
        type: 'data_variable',
        gap: 8,
        fields: field(variable),
    }));
    // Scratch leaves a wider gap between the reporters and the blocks below.
    reporters[reporters.length - 1].gap = 24;

    const first = variables[0];
    return [
        button,
        ...reporters,
        { kind: 'block', type: 'data_setvariableto', gap: 8, fields: field(first), inputs: { VALUE: number(0) } },
        { kind: 'block', type: 'data_changevariableby', gap: 8, fields: field(first), inputs: { VALUE: number(1) } },
    ];
}

/** Installs the Scratch-style Variables category on a workspace and gives an empty one a starting variable. */
export function setupVariables(workspace: Blockly.WorkspaceSvg) {
    workspace.registerToolboxCategoryCallback('VARIABLE', variablesCategory);
    // The VM only has MAX_VARIABLES slots, so refuse up front rather than failing at code generation.
    workspace.registerButtonCallback('CREATE_VARIABLE', () => {
        if (workspace.getVariableMap().getAllVariables().length >= MAX_VARIABLES) {
            Blockly.dialog.alert(`ThingBot supports at most ${MAX_VARIABLES} variables.`);
        } else {
            Blockly.Variables.createVariableButtonHandler(workspace);
        }
    });
    if (!workspace.getVariableMap().getAllVariables().length) {
        workspace.getVariableMap().createVariable('my variable');
    }
    // The toolbox was built with Blockly's stock callback during inject, so rebuild it with ours.
    workspace.refreshToolboxSelection();
}

export const toolbox: utils.toolbox.ToolboxInfo = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category',
            name: 'Events',
            categorystyle: 'event_category',
            contents: [
                { kind: 'block', type: 'event_when_run' },
                { kind: 'block', type: 'event_when_key_pressed' },
            ],
        },
        {
            kind: 'category',
            name: 'Logic',
            categorystyle: 'logic_category',
            contents: [
                { kind: 'block', type: 'controls_if' },
                { kind: 'block', type: 'control_while' },
                { kind: 'block', type: 'logic_compare' },
                { kind: 'block', type: 'logic_operation' },
                { kind: 'block', type: 'logic_negate' },
                { kind: 'block', type: 'logic_boolean' },
            ],
        },
        {
            kind: 'category',
            name: 'Math',
            categorystyle: 'math_category',
            contents: [
                { kind: 'block', type: 'math_number' },
                {
                    kind: 'block',
                    type: 'math_arithmetic',
                    inputs: {
                        A: { shadow: { type: 'math_number' } },
                        B: { shadow: { type: 'math_number' } },
                    },
                },
            ],
        },
        {
            kind: 'category',
            name: 'Text',
            categorystyle: 'text_category',
            contents: [{ kind: 'block', type: 'text' }],
        },
        {
            kind: 'category',
            name: 'Variables',
            categorystyle: 'variable_category',
            custom: 'VARIABLE',
        },
        {
            kind: 'category',
            name: 'ThingBot',
            categorystyle: 'thingbot_category',
            contents: [
                { kind: 'block', type: 'thingbot_motor', inputs: { SPEED: number(50) } },
                { kind: 'block', type: 'thingbot_servo', inputs: { ANGLE: number(90) } },
                { kind: 'block', type: 'thingbot_spin', inputs: { SPEED: number(50) } },
                { kind: 'block', type: 'thingbot_led', inputs: { BRIGHTNESS: number(100) } },
                { kind: 'block', type: 'thingbot_buzzer', inputs: { DUTY: number(50) } },
                { kind: 'block', type: 'thingbot_wait', inputs: { MS: number(1000) } },
            ],
        },
    ],
};
