import * as Blockly from 'blockly';
import type { utils } from 'blockly';
import { MAX_VARIABLES } from './generator/thingcode.ts';

// Number shadow for a block input, so it shows an editable default.
function number(value: number) {
    return { shadow: { type: 'math_number', fields: { NUM: value } } };
}

/** Scratch-style Variables flyout: the create button, a reporter per variable, then set and change. */
function variablesCategory(workspace: Blockly.WorkspaceSvg): utils.toolbox.FlyoutItemInfoArray {
    const variables = workspace
        .getVariableMap()
        .getVariablesOfType('')
        .sort(Blockly.Variables.compareByName);
    const button: utils.toolbox.ButtonInfo = {
        kind: 'button',
        text: Blockly.Msg.NEW_VARIABLE,
        callbackkey: 'CREATE_VARIABLE',
    };
    if (!variables.length) return [button];

    const field = (variable: Blockly.IVariableModel<Blockly.IVariableState>) => ({
        VARIABLE: { id: variable.getId() },
    });
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
        {
            kind: 'block',
            type: 'data_setvariableto',
            gap: 8,
            fields: field(first),
            inputs: { VALUE: number(0) },
        },
        {
            kind: 'block',
            type: 'data_changevariableby',
            gap: 8,
            fields: field(first),
            inputs: { VALUE: number(1) },
        },
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
                { kind: 'block', type: 'control_repeat', inputs: { TIMES: number(10) } },
                { kind: 'block', type: 'control_forever' },
                { kind: 'block', type: 'control_while' },
                { kind: 'block', type: 'control_wait', inputs: { MS: number(1000) } },
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
                {
                    kind: 'block',
                    type: 'math_modulo',
                    inputs: { DIVIDEND: number(10), DIVISOR: number(3) },
                },
            ],
        },
        {
            kind: 'category',
            name: 'Variables',
            categorystyle: 'variable_category',
            custom: 'VARIABLE',
        },
        {
            kind: 'category',
            name: 'ThingBot Telemetrix',
            categorystyle: 'thingbot_telemetrix_category',
            contents: [
                {
                    kind: 'block',
                    type: 'thingbot_telemetrix_set_pin_mode',
                    inputs: { PIN: number(13) },
                },
                {
                    kind: 'block',
                    type: 'thingbot_telemetrix_digital_write',
                    inputs: { PIN: number(13) },
                },
                {
                    kind: 'block',
                    type: 'thingbot_telemetrix_digital_read',
                    inputs: { PIN: number(2) },
                },
                {
                    kind: 'block',
                    type: 'thingbot_telemetrix_analog_read',
                    inputs: { PIN: number(0) },
                },
                {
                    kind: 'block',
                    type: 'thingbot_telemetrix_pwm_write',
                    inputs: { PIN: number(9), VALUE: number(128) },
                },
                {
                    kind: 'block',
                    type: 'thingbot_telemetrix_servo_write',
                    inputs: { ANGLE: number(90) },
                },
                {
                    kind: 'block',
                    type: 'thingbot_telemetrix_control_dc',
                    inputs: { SPEED: number(50) },
                },
                {
                    kind: 'block',
                    type: 'thingbot_telemetrix_control_buzzer',
                    inputs: { FREQ: number(50) },
                },
                { kind: 'block', type: 'thingbot_telemetrix_control_led' },
                // IO7 is the PS2 DATA line and IO8 the PCA9685's SDA, so default clear of both.
                {
                    kind: 'block',
                    type: 'thingbot_telemetrix_setup_ultrasonic',
                    inputs: { TRIG: number(0), ECHO: number(4) },
                },
                { kind: 'block', type: 'thingbot_telemetrix_read_distance' },
                {
                    kind: 'block',
                    type: 'thingbot_telemetrix_setup_dht',
                    inputs: { PIN: number(4) },
                },
                {
                    kind: 'block',
                    type: 'thingbot_telemetrix_read_temperature',
                    inputs: { PIN: number(4) },
                },
                {
                    kind: 'block',
                    type: 'thingbot_telemetrix_read_humidity',
                    inputs: { PIN: number(4) },
                },
            ],
        },
    ],
};
