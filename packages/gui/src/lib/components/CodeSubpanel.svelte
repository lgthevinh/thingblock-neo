<script lang="ts">
    let { code }: { code: string } = $props();
</script>

<section>
    <pre>{code}</pre>
</section>

<style>
    section {
        display: grid;
        grid-template-rows: minmax(0, 1fr);
        min-height: 0;
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
