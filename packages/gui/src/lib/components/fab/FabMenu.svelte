<script lang="ts">
    import type { Snippet } from 'svelte';
    import Fab from './Fab.svelte';

    let {
        label,
        onclick,
        icon,
        children,
    }: { label: string; onclick?: () => void; icon: Snippet; children: Snippet } = $props();
</script>

<div class="menu">
    <div class="items">{@render children()}</div>
    <Fab {label} {onclick}>{@render icon()}</Fab>
</div>

<style>
    /* Takes the card's bottom-right corner; the main Fab sits inside it instead of positioning itself. */
    .menu {
        position: absolute;
        right: 12px;
        bottom: 12px;
        width: 40px;
        height: 40px;
    }
    .menu > :global(.fab) {
        position: relative;
        inset: auto;
        z-index: 1;
    }
    /* Pill column that grows upward from behind the main button on hover or keyboard focus. */
    .items {
        position: absolute;
        left: 0;
        bottom: 20px;
        width: 40px;
        box-sizing: border-box;
        padding: 4px 4px 24px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        border-radius: 20px 20px 0 0;
        background: #4c97ff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        transform: scaleY(0);
        transform-origin: bottom;
        opacity: 0;
        pointer-events: none;
        transition:
            transform 150ms ease-out,
            opacity 150ms ease-out;
    }
    .menu:hover .items,
    .menu:focus-within .items {
        transform: scaleY(1);
        opacity: 1;
        pointer-events: auto;
    }
</style>
