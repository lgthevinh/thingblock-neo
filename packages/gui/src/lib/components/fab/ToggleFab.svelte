<script lang="ts">
    import type { Snippet } from 'svelte';
    import Fab from './Fab.svelte';

    let {
        active = $bindable(false),
        icon,
        activeIcon,
        label,
        activeLabel,
        disabled = false,
    }: {
        active?: boolean;
        icon: Snippet;
        activeIcon: Snippet;
        label: string;
        activeLabel: string;
        disabled?: boolean;
    } = $props();
</script>

<Fab label={active ? activeLabel : label} {disabled} onclick={() => (active = !active)}>
    {@render (active ? activeIcon : icon)()}
</Fab>
