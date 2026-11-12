<script lang="ts">
    import type { Snippet } from 'svelte';

    let {
        label,
        onclick,
        disabled = false,
        children,
    }: { label: string; onclick?: () => void; disabled?: boolean; children: Snippet } = $props();
</script>

<button class="fab" aria-label={label} title={label} {disabled} {onclick}>{@render children()}</button>

<style>
    /* Pinned to the bottom-right of the nearest positioned parent (the subpanel card). */
    button {
        position: absolute;
        right: 12px;
        bottom: 12px;
        width: 40px;
        height: 40px;
        padding: 0;
        display: grid;
        place-items: center;
        border: none;
        border-radius: 50%;
        color: #fff;
        background: #4c97ff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        cursor: pointer;
    }
    button:hover:not(:disabled) {
        background: #3373cc;
    }
    button:disabled {
        background: #ccc;
        box-shadow: none;
        cursor: default;
    }
</style>
