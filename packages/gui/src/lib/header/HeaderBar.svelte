<script lang="ts">
    import Logo from './Logo.svelte';

    let {
        panels = $bindable(),
        onsettings,
    }: { panels: { code: boolean; monitor: boolean }; onsettings: () => void } = $props();

    let menuOpen = $state(false);
    let menuRoot: HTMLElement;

    // Capture phase, since Blockly stops some pointer events on the workspace from bubbling.
    function closeOutside(e: PointerEvent) {
        if (menuOpen && !menuRoot.contains(e.target as Node)) menuOpen = false;
    }
</script>

<svelte:window
    onpointerdowncapture={closeOutside}
    onkeydown={(e) => e.key === 'Escape' && (menuOpen = false)}
/>

<header>
    <Logo />
    <div class="actions">
        <button class="icon" aria-label="Settings" title="Settings" onclick={onsettings}>
            <!-- Lucide "settings" icon -->
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linejoin="round"
            >
                <path
                    d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                />
                <circle cx="12" cy="12" r="3" />
            </svg>
        </button>
        <div class="panels" bind:this={menuRoot}>
            <button
                class="icon"
                class:open={menuOpen}
                aria-label="Show panels"
                title="Show panels"
                aria-haspopup="true"
                aria-expanded={menuOpen}
                onclick={() => (menuOpen = !menuOpen)}
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linejoin="round"
                >
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M15 4v16" />
                </svg>
            </button>
            {#if menuOpen}
                <div class="menu">
                    <label><input type="checkbox" bind:checked={panels.code} /> Code (debug)</label>
                    <label><input type="checkbox" bind:checked={panels.monitor} /> Monitor</label>
                </div>
            {/if}
        </div>
    </div>
</header>

<style>
    header {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 3rem;
        padding: 0 12px;
        background: #4c97ff;
        color: #fff;
    }
    .actions {
        display: flex;
        gap: 4px;
        margin-left: auto;
    }
    .icon {
        display: grid;
        place-items: center;
        padding: 6px;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: #fff;
        cursor: pointer;
    }
    .icon:hover,
    .icon.open {
        background: rgba(255, 255, 255, 0.15);
    }
    .icon svg {
        width: 22px;
        height: 22px;
    }
    .panels {
        position: relative;
    }
    /* Drops below the button, aligned to the header's right edge. */
    .menu {
        position: absolute;
        top: calc(100% + 6px);
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
