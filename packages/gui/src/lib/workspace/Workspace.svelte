<script lang="ts" module>
    import { registerContinuousToolbox } from '@blockly/continuous-toolbox';
    import { Blockly, setupVariables, theme, toolbox } from '@thingblock-neo/blocks';

    registerContinuousToolbox();

    Blockly.Scrollbar.scrollbarThickness = 12;
    // Roomier flyout buttons (e.g. "Make a Variable"), closer to Scratch's.
    Blockly.FlyoutButton.TEXT_MARGIN_X = 16;
    Blockly.FlyoutButton.TEXT_MARGIN_Y = 8;
</script>

<script lang="ts">
    let { onchange }: { onchange: (ws: Blockly.WorkspaceSvg) => void } = $props();

    // Mounts the Blockly workspace on the element and disposes it when the component is destroyed.
    function workspace(node: HTMLElement) {
        const ws = Blockly.inject(node, {
            toolbox,
            theme,
            plugins: {
                toolbox: 'ContinuousToolbox',
                flyoutsVerticalToolbox: 'ContinuousFlyout',
                metricsManager: 'ContinuousMetrics',
            },
            media: 'media/',
            renderer: 'zelos',
            zoom: { startScale: 0.7, controls: false, wheel: false },
            trashcan: false,
            maxBlocks: 100,
        });
        setupVariables(ws);
        ws.addChangeListener((e: Blockly.Events.Abstract) => {
            if (!e.isUiEvent) onchange(ws);
        });
        onchange(ws);

        // Blockly only re-measures on window resize, so follow container size changes (e.g. panel collapse).
        const observer = new ResizeObserver(() => Blockly.svgResize(ws));
        observer.observe(node);

        return {
            destroy: () => {
                observer.disconnect();
                ws.dispose();
            },
        };
    }
</script>

<div use:workspace></div>

<style>
    div {
        height: 100%;
        width: 100%;
    }

    /* Remove OCD padding at top of the toolbox */
    div :global(.blocklyToolbox) {
        padding: 0;
        border-right: 1px solid #ddd;
    }

    /* Same divider as the code panel; content-box keeps the border outside Blockly's measured width */
    div :global(.blocklyFlyout) {
        border-right: 1px solid #ddd;
        box-sizing: content-box;
    }

    div :global(.blocklyToolboxCategory) {
        padding: 4pt 0pt;
    }

    div :global(.blocklyToolboxCategoryLabel) {
        font-size: 10pt;
        font-weight: normal;
        padding-inline: 6pt;
    }
    /* The continuous toolbox plugin sets an inline gray on the selected row, so override it */
    div :global(.blocklyToolboxSelected) {
        background-color: #eee !important;
    }
    /* Flyout buttons: white with a light border like Scratch, instead of Blockly's dark grey */
    div :global(.blocklyFlyoutButtonBackground) {
        fill: #fff;
        stroke: #c6c6c6;
    }
    div :global(.blocklyFlyoutButton:hover .blocklyFlyoutButtonBackground) {
        fill: #e9f1fc;
    }
    div :global(.blocklyFlyoutButton .blocklyText) {
        fill: #575e75;
    }
    div :global(.blocklyFlyoutButtonShadow) {
        display: none;
    }
    /* Blockly turns the selected label white; keep the normal label colour */
    div :global(.blocklyToolboxSelected .blocklyToolboxCategoryLabel) {
        color: inherit;
    }
</style>
