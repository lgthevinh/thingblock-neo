<script lang="ts">
    import { arduinoGenerator, type Blockly } from '@thingblock-neo/blocks';
    import BlocklyWorkspace from './lib/BlocklyWorkspace.svelte';
    import CodePanel from './lib/CodePanel.svelte';

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

<main>
    <div class="workspace"><BlocklyWorkspace onchange={generate} /></div>
    <CodePanel {code} {collapsed} ontoggle={() => (collapsed = !collapsed)} />
</main>

<style>
    main {
        display: flex;
        height: 100%;
    }
    .workspace {
        flex: 1;
        min-width: 0;
    }
</style>
