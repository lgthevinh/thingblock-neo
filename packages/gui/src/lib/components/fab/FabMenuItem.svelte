<script lang="ts">
    import type { Snippet } from 'svelte';

    let {
        label,
        onclick,
        active = false,
        children,
    }: { label: string; onclick?: () => void; active?: boolean; children: Snippet } = $props();
</script>

<button class:active aria-label={label} aria-pressed={active} {onclick}>
    {@render children()}
    <span class="tooltip">{label}</span>
</button>

<style>
    button {
        position: relative;
        width: 32px;
        height: 32px;
        padding: 0;
        display: grid;
        place-items: center;
        border: none;
        border-radius: 50%;
        color: #fff;
        background: transparent;
        cursor: pointer;
        transition: transform 100ms ease-out;
    }
    button:hover,
    button:focus-visible {
        transform: scale(1.15);
        background: rgba(255, 255, 255, 0.2);
    }
    button.active {
        color: #4c97ff;
        background: #fff;
    }
    /* Label shown to the left of the item, like Scratch's sprite menu. */
    .tooltip {
        position: absolute;
        right: calc(100% + 10px);
        padding: 4px 8px;
        border-radius: 4px;
        white-space: nowrap;
        font: 12px sans-serif;
        color: #fff;
        background: #575e75;
        opacity: 0;
        pointer-events: none;
        transition: opacity 100ms;
    }
    button:hover .tooltip,
    button:focus-visible .tooltip {
        opacity: 1;
    }
</style>
