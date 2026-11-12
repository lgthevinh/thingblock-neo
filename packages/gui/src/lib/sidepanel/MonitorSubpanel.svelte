<script lang="ts">
    import FabMenu from '../components/fab/FabMenu.svelte';
    import FabMenuItem from '../components/fab/FabMenuItem.svelte';
    import DotsIcon from '../components/icons/DotsIcon.svelte';
    import ScrollDownIcon from '../components/icons/ScrollDownIcon.svelte';
    import TrashIcon from '../components/icons/TrashIcon.svelte';

    let autoScroll = $state(true);
</script>

<section>
    <p>No device connected.</p>
    <FabMenu label="Monitor options">
        {#snippet icon()}<DotsIcon />{/snippet}
        <FabMenuItem label="Auto scroll" active={autoScroll} onclick={() => (autoScroll = !autoScroll)}>
            <ScrollDownIcon size={18} />
        </FabMenuItem>
        <FabMenuItem label="Clear"><TrashIcon size={18} /></FabMenuItem>
    </FabMenu>
</section>

<style>
    section {
        position: relative;
        display: grid;
        grid-template-rows: minmax(0, 1fr);
        min-height: 0;
    }
    p {
        margin: 0;
        padding: 8px;
        color: #888;
        font: 13px sans-serif;
    }
</style>
