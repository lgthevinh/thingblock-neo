<script lang="ts">
    import { arduinoGenerator, type Blockly } from '@thingblock-neo/blocks';
    import BlocklyWorkspace from './lib/BlocklyWorkspace.svelte';
    import CodeSubpanel from './lib/components/CodeSubpanel.svelte';
    import MonitorSubpanel from './lib/components/MonitorSubpanel.svelte';
    import HeaderBar from './lib/HeaderBar.svelte';
    import SidePanel from './lib/SidePanel.svelte';

    let code = $state('');
    let panelOpen = $state(true);
    let panelWidth = $state(400);

    // Regenerates the code; blocks without an Arduino generator throw, so show the reason instead.
    function generate(ws: Blockly.WorkspaceSvg) {
        try {
            code = arduinoGenerator.workspaceToCode(ws);
        } catch (e) {
            code = `// Cannot generate code: ${e instanceof Error ? e.message : e}`;
        }
    }
</script>

<div class="app">
    <HeaderBar {panelOpen} ontoggle={() => (panelOpen = !panelOpen)} />
    <main>
        <div><BlocklyWorkspace onchange={generate} /></div>
        {#if panelOpen}
            <SidePanel bind:width={panelWidth}>
                <CodeSubpanel {code} />
                <MonitorSubpanel />
            </SidePanel>
        {/if}
    </main>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    main {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
    }
</style>
