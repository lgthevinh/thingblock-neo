<script lang="ts">
    import { hidUsage, thingcodeGenerator, type Blockly } from '@thingblock-neo/blocks';
    import Workspace from './lib/workspace/Workspace.svelte';
    import CodeSubpanel from './lib/sidepanel/CodeSubpanel.svelte';
    import MonitorSubpanel, { type MonitorLine } from './lib/sidepanel/MonitorSubpanel.svelte';
    import RunButton from './lib/sidepanel/RunButton.svelte';
    import HeaderBar from './lib/header/HeaderBar.svelte';
    import SidePanel from './lib/sidepanel/SidePanel.svelte';
    import PanelMenu from './lib/sidepanel/PanelMenu.svelte';
    import PanelsIcon from './lib/components/icons/PanelsIcon.svelte';
    import BlocklyDialogs from './lib/workspace/BlocklyDialogs.svelte';
    import SettingsDialog from './lib/settings/SettingsDialog.svelte';
    import * as vm from './lib/vm.ts';

    const PANELS_KEY = 'thingblock.panels';
    // A chatty program would otherwise slow the editor down.
    const MAX_LINES = 500;

    let code = $state('');
    let panels = $state(loadPanels());
    let settingsOpen = $state(false);
    let panelWidth = $state(400);
    let workspace: Blockly.WorkspaceSvg | undefined;
    let running = $state(false);
    let lines = $state<MonitorLine[]>([]);

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

    $effect(() => {
        if (!vm.hasVm) return;
        return vm.listenVm({
            onprint: (text) => addLine({ text, kind: 'print' }),
            onerror: (text) => addLine({ text, kind: 'error' }),
            onrunning: (value) => (running = value),
        });
    });

    function addLine(line: MonitorLine) {
        lines.push(line);
        if (lines.length > MAX_LINES) lines.splice(0, lines.length - MAX_LINES);
    }

    function run() {
        if (!workspace) return;
        lines = [];
        try {
            vm.run(thingcodeGenerator.compile(workspace).slots);
        } catch (e) {
            addLine({ text: `Cannot run: ${e instanceof Error ? e.message : e}`, kind: 'error' });
        }
    }

    function send(text: string) {
        addLine({ text, kind: 'input' });
        if (vm.hasVm) vm.sendLine(text);
    }

    // Typing into a text field, such as the monitor input or a block's field editor, is not a key press.
    function isTextField(target: EventTarget | null) {
        return (
            target instanceof HTMLElement &&
            (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
        );
    }

    // Key presses reach the program only while it runs; releases always do, so no key stays held.
    function onkey(e: KeyboardEvent) {
        const usage = hidUsage(e.code);
        if (!vm.hasVm || usage === undefined) return;
        const down = e.type === 'keydown';
        if (down && (!running || e.repeat || isTextField(e.target))) return;
        // Stops a focused button reacting to space, and arrows from scrolling the page.
        if (running && !isTextField(e.target)) e.preventDefault();
        vm.key(usage, down);
    }

    // Regenerates the code; blocks the VM can't run throw, so show the reason instead.
    function generate(ws: Blockly.WorkspaceSvg) {
        workspace = ws;
        try {
            code = thingcodeGenerator.workspaceToCode(ws);
        } catch (e) {
            code = `// Cannot generate code: ${e instanceof Error ? e.message : e}`;
        }
    }
</script>

<svelte:window
    onkeydowncapture={onkey}
    onkeyupcapture={onkey}
    onblur={() => vm.hasVm && vm.releaseKeys()}
/>

<div class="app">
    <HeaderBar onsettings={() => (settingsOpen = true)} />
    <main>
        <div><Workspace onchange={generate} /></div>
        <SidePanel bind:width={panelWidth}>
            {#snippet header()}
                <RunButton {running} disabled={!vm.hasVm} onrun={run} onstop={vm.stop} />
                <PanelMenu bind:panels />
            {/snippet}
            {#if panels.code}<CodeSubpanel {code} />{/if}
            {#if panels.monitor}
                <MonitorSubpanel {lines} onsend={send} onclear={() => (lines = [])} />
            {/if}
            <!-- Holds the header at the top when every panel is hidden. -->
            {#if !panels.code && !panels.monitor}
                <div class="placeholder">
                    <PanelsIcon size={48} />
                    No panel shown. Use the panels button above to show one.
                </div>
            {/if}
        </SidePanel>
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
        /* Without a bounded row the side panel grows with its content instead of scrolling. */
        grid-template-rows: minmax(0, 1fr);
    }
    /* Same as thingblock-editor's empty side panel. */
    .placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem;
        color: rgba(87, 94, 117, 0.75);
        font:
            0.875rem 'Helvetica Neue',
            Helvetica,
            Arial,
            sans-serif;
        text-align: center;
    }
</style>
