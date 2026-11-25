<script lang="ts">
    import { thingcodeGenerator, type Blockly } from '@thingblock-neo/blocks';
    import Workspace from './lib/workspace/Workspace.svelte';
    import CodeSubpanel from './lib/sidepanel/CodeSubpanel.svelte';
    import MonitorSubpanel from './lib/sidepanel/MonitorSubpanel.svelte';
    import HeaderBar from './lib/header/HeaderBar.svelte';
    import SidePanel from './lib/sidepanel/SidePanel.svelte';
    import BlocklyDialogs from './lib/workspace/BlocklyDialogs.svelte';
    import SettingsDialog from './lib/settings/SettingsDialog.svelte';

    const PANELS_KEY = 'thingblock.panels';

    let code = $state('');
    let panels = $state(loadPanels());
    let settingsOpen = $state(false);
    let panelWidth = $state(400);

    // The code panel is for debugging the generator, so it starts hidden. Storage can be missing or throw
    // (private windows), so fall back to the defaults.
    function loadPanels() {
        const shown = { code: false, monitor: true };
        try {
            return { ...shown, ...JSON.parse(localStorage.getItem(PANELS_KEY) ?? '{}') };
        } catch {
            return shown;
        }
    }

    $effect(() => {
        try {
            localStorage.setItem(PANELS_KEY, JSON.stringify(panels));
        } catch {
            // Not remembered across reloads, which is harmless.
        }
    });

    // Regenerates the code; blocks the VM can't run throw, so show the reason instead.
    function generate(ws: Blockly.WorkspaceSvg) {
        try {
            code = thingcodeGenerator.workspaceToCode(ws);
        } catch (e) {
            code = `// Cannot generate code: ${e instanceof Error ? e.message : e}`;
        }
    }
</script>

<div class="app">
    <HeaderBar bind:panels onsettings={() => (settingsOpen = true)} />
    <main>
        <div><Workspace onchange={generate} /></div>
        {#if panels.code || panels.monitor}
            <SidePanel bind:width={panelWidth}>
                {#if panels.code}<CodeSubpanel {code} />{/if}
                {#if panels.monitor}<MonitorSubpanel />{/if}
            </SidePanel>
        {/if}
    </main>
    <BlocklyDialogs />
    {#if settingsOpen}<SettingsDialog onclose={() => (settingsOpen = false)} />{/if}
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
