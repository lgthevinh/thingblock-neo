<script lang="ts">
    import { thingbotVmGenerator, type Blockly } from '@thingblock-neo/blocks';
    import Workspace from './lib/workspace/Workspace.svelte';
    import CodeSubpanel from './lib/sidepanel/CodeSubpanel.svelte';
    import MonitorSubpanel from './lib/sidepanel/MonitorSubpanel.svelte';
    import HeaderBar from './lib/header/HeaderBar.svelte';
    import SidePanel from './lib/sidepanel/SidePanel.svelte';
    import BlocklyDialogs from './lib/workspace/BlocklyDialogs.svelte';

    let code = $state('');
    let panelOpen = $state(true);
    let panelWidth = $state(400);

    // Regenerates the code; blocks the VM can't run throw, so show the reason instead.
    function generate(ws: Blockly.WorkspaceSvg) {
        try {
            code = thingbotVmGenerator.workspaceToCode(ws);
        } catch (e) {
            code = `// Cannot generate code: ${e instanceof Error ? e.message : e}`;
        }
    }
</script>

<div class="app">
    <HeaderBar {panelOpen} ontoggle={() => (panelOpen = !panelOpen)} />
    <main>
        <div><Workspace onchange={generate} /></div>
        {#if panelOpen}
            <SidePanel bind:width={panelWidth}>
                <CodeSubpanel {code} />
                <MonitorSubpanel />
            </SidePanel>
        {/if}
    </main>
    <BlocklyDialogs />
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
