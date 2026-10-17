<script lang="ts">
    import { arduinoGenerator, type Blockly } from '@thingblock-neo/blocks';
    import BlocklyWorkspace from './lib/BlocklyWorkspace.svelte';
    import CodePanel from './lib/CodePanel.svelte';
    import HeaderBar from './lib/HeaderBar.svelte';

    let code = $state('');
    let collapsed = $state(false);

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
    <HeaderBar />
    <main>
        <div class="workspace"><BlocklyWorkspace onchange={generate} /></div>
        <CodePanel {code} {collapsed} ontoggle={() => (collapsed = !collapsed)} />
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
        display: flex;
    }
    .workspace {
        flex: 1;
        min-width: 0;
    }
</style>
