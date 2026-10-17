<script lang="ts" module>
    import { registerContinuousToolbox } from '@blockly/continuous-toolbox';

    // Once per page, not per component: replaces the default toolbox/flyout so it stays open.
    registerContinuousToolbox();
</script>

<script lang="ts">
    import { Blockly, toolbox } from '@thingblock-neo/core';

    let { onchange }: { onchange: (ws: Blockly.WorkspaceSvg) => void } = $props();

    // Mounts the Blockly workspace on the element and disposes it when the component is destroyed.
    function workspace(node: HTMLElement) {
        const ws = Blockly.inject(node, {
            toolbox,
            plugins: {
                toolbox: 'ContinuousToolbox',
                flyoutsVerticalToolbox: 'ContinuousFlyout',
                metricsManager: 'ContinuousMetrics',
            },
            media: 'media/',
            grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
            renderer: 'zelos',
            zoom: { startScale: 1.0, controls: true, wheel: true },
        });
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
</style>
