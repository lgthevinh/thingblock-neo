import * as Blockly from 'blockly';

const STYLE = 'variable_blocks';

// Scratch wording for the variable button, dropdown entries and dialogs.
Object.assign(Blockly.Msg, {
    NEW_VARIABLE: 'Make a Variable',
    NEW_VARIABLE_TITLE: 'New variable name:',
    RENAME_VARIABLE: 'Rename variable',
    DELETE_VARIABLE: 'Delete the "%1" variable',
    VARIABLE_ALREADY_EXISTS: 'A variable named "%1" already exists.',
});

/** A variable field drawn as plain text on the block, with no dropdown. */
class FieldVariableGetter extends Blockly.FieldVariable {
    override isClickable(): boolean {
        return false;
    }
    override shouldAddBorderRect_(): boolean {
        return false;
    }
    protected override createSVGArrow_(): void {}
    protected override createTextArrow_(): void {}
}

Blockly.fieldRegistry.register('field_variable_getter', FieldVariableGetter);

export const variables = {
    data_variable: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: '%1',
                args0: [{ type: 'field_variable_getter', name: 'VARIABLE', variable: null }],
                output: null,
                style: STYLE,
                tooltip: 'The value of the variable',
            });
        },
        // In the flyout, right-click offers rename and delete like Scratch; the reporter has no dropdown for them.
        customContextMenu(this: Blockly.BlockSvg, options: Blockly.ContextMenuRegistry.LegacyContextMenuOption[]) {
            if (!this.isInFlyout) return;
            const workspace = this.workspace.targetWorkspace ?? this.workspace;
            const variable = workspace.getVariableMap().getVariableById(this.getFieldValue('VARIABLE'));
            if (!variable) return;
            options.length = 0;
            options.push(
                {
                    text: Blockly.Msg.RENAME_VARIABLE,
                    enabled: true,
                    callback: () => Blockly.Variables.renameVariable(workspace, variable),
                },
                {
                    text: Blockly.Msg.DELETE_VARIABLE.replace('%1', variable.getName()),
                    enabled: true,
                    callback: () => Blockly.Variables.deleteVariable(workspace, variable),
                },
            );
        },
    },

    data_setvariableto: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'set %1 to %2',
                args0: [
                    { type: 'field_variable', name: 'VARIABLE', variable: null },
                    { type: 'input_value', name: 'VALUE' },
                ],
                previousStatement: null,
                nextStatement: null,
                style: STYLE,
                tooltip: 'Set the variable to a value',
            });
        },
    },

    data_changevariableby: {
        init(this: Blockly.Block) {
            this.jsonInit({
                message0: 'change %1 by %2',
                args0: [
                    { type: 'field_variable', name: 'VARIABLE', variable: null },
                    { type: 'input_value', name: 'VALUE', check: 'Number' },
                ],
                previousStatement: null,
                nextStatement: null,
                style: STYLE,
                tooltip: 'Add a number to the variable',
            });
        },
    },
};
