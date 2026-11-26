<script lang="ts">
    import PanelsIcon from '../components/icons/PanelsIcon.svelte';

    let { panels = $bindable() }: { panels: { code: boolean; monitor: boolean } } = $props();

    let open = $state(false);
    let root: HTMLElement;

    // Capture phase, since Blockly stops some pointer events on the workspace from bubbling.
    function closeOutside(e: PointerEvent) {
        if (open && !root.contains(e.target as Node)) open = false;
    }
</script>

<svelte:window
    onpointerdowncapture={closeOutside}
    onkeydown={(e) => e.key === 'Escape' && (open = false)}
/>

<div class="panels" bind:this={root}>
    <button
        class:open
        aria-label="Show panels"
        title="Show panels"
        aria-haspopup="true"
        aria-expanded={open}
        onclick={() => (open = !open)}
    >
        <PanelsIcon size={18} />
    </button>
    {#if open}
        <div class="menu">
            <label><input type="checkbox" bind:checked={panels.code} /> Code (debug)</label>
            <label><input type="checkbox" bind:checked={panels.monitor} /> Monitor</label>
        </div>
    {/if}
</div>

<style>
    .panels {
        position: relative;
    }
    /* Same as thingblock-editor's side panel button: a square as tall as the Run button. */
    button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 2.25rem;
        height: 2.25rem;
        padding: 0.5rem;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 0.25rem;
        background: #fff;
        color: #575e75;
        cursor: pointer;
    }
    button:active,
    button.open {
        background: rgba(76, 151, 255, 0.35);
    }
    /* Drops below the button, aligned to its right edge. */
    .menu {
        position: absolute;
        top: calc(100% + 0.25rem);
        right: 0;
        z-index: 10;
        display: grid;
        min-width: 140px;
        padding: 4px;
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        font: 14px sans-serif;
        color: #575e75;
    }
    label {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 8px;
        border-radius: 6px;
        cursor: pointer;
    }
    label:hover {
        background: #f0f4ff;
    }
    input {
        margin: 0;
        accent-color: #4c97ff;
    }
</style>
