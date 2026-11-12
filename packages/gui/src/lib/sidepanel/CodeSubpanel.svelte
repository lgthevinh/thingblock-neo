<script lang="ts">
    import Fab from '../components/fab/Fab.svelte';
    import CopyIcon from '../components/icons/CopyIcon.svelte';

    let { code }: { code: string } = $props();
</script>

<section>
    <pre>{code}</pre>
    <Fab label="Copy code" onclick={() => navigator.clipboard.writeText(code)}><CopyIcon /></Fab>
</section>

<style>
    section {
        position: relative;
        display: grid;
        grid-template-rows: minmax(0, 1fr);
        min-height: 0;
    }
    /* Bottom padding lets the last lines scroll clear of the FAB. */
    pre {
        margin: 0;
        padding: 8px 8px 64px;
        overflow: auto;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        font: 13px monospace;
    }
</style>
