<script lang="ts">
    import type { Snippet } from 'svelte';

    const MIN_WIDTH = 240;

    let { width = $bindable(400), children }: { width?: number; children: Snippet } = $props();

    // Drags the left edge to resize; pointer capture keeps the drag alive over the Blockly canvas.
    function startResize(e: PointerEvent) {
        e.preventDefault();
        const handle = e.currentTarget as HTMLElement;
        const startX = e.clientX;
        const startWidth = width;
        handle.setPointerCapture(e.pointerId);

        const move = (ev: PointerEvent) => {
            const max = window.innerWidth * 0.4;
            width = Math.min(max, Math.max(MIN_WIDTH, startWidth + startX - ev.clientX));
        };
        const stop = () => {
            handle.removeEventListener('pointermove', move);
            handle.removeEventListener('pointerup', stop);
            handle.removeEventListener('pointercancel', stop);
        };
        handle.addEventListener('pointermove', move);
        handle.addEventListener('pointerup', stop);
        handle.addEventListener('pointercancel', stop);
    }
</script>

<aside style:width="{width}px">
    <div class="handle" role="separator" aria-orientation="vertical" onpointerdown={startResize}></div>
    {@render children()}
</aside>

<style>
    /* Stacks child panels, each getting an equal share of the height. */
    aside {
        position: relative;
        display: grid;
        grid-auto-rows: minmax(0, 1fr);
        gap: 8px;
        padding: 8px;
        box-sizing: border-box;
        border-left: 1px solid #ddd;
        background: #fafafa;
    }
    /* Card look for every child panel. */
    aside > :global(:not(.handle)) {
        border: 1px solid #ddd;
        border-radius: 8px;
        background: #fff;
        overflow: hidden;
    }
    /* Invisible grab strip straddling the left border. */
    .handle {
        position: absolute;
        top: 0;
        bottom: 0;
        left: -4px;
        width: 8px;
        cursor: col-resize;
        touch-action: none;
        z-index: 1;
    }
    .handle:hover,
    .handle:active {
        background: #4c97ff55;
    }
</style>
