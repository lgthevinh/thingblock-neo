<script lang="ts">
    let { svg, size = 20 }: { svg: string; size?: number } = $props();
</script>

<!-- Inlined rather than <img> so the SVG's currentColor follows the surrounding text colour. -->
<span style:width="{size}px" style:height="{size}px">{@html svg}</span>

<style>
    span {
        display: inline-flex;
        flex-shrink: 0;
    }
    span :global(svg) {
        width: 100%;
        height: 100%;
    }
</style>
