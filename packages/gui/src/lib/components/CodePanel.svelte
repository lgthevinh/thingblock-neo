<script lang="ts">
    let { code }: { code: string } = $props();
</script>

<section>
    <header>Arduino code</header>
    <pre>{code}</pre>
</section>

<style>
    section {
        display: grid;
        grid-template-rows: auto minmax(0, 1fr);
        min-height: 0;
    }
    header {
        padding: 6px 8px;
        border-bottom: 1px solid #ddd;
        font: 600 14px sans-serif;
    }
    pre {
        margin: 0;
        padding: 8px;
        overflow: auto;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        font: 13px monospace;
    }
</style>
