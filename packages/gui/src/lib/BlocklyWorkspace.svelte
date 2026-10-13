<script lang="ts">
    import { Blockly, toolbox } from '@thingblock-neo/core';

    // Mounts the Blockly workspace on the element and disposes it when the component is destroyed.
    function workspace(node: HTMLElement) {
        const ws = Blockly.inject(node, { toolbox, media: 'media/' });
        return { destroy: () => ws.dispose() };
    }
</script>

<div use:workspace></div>

<style>
    div {
        height: 100%;
        width: 100%;
    }
</style>
