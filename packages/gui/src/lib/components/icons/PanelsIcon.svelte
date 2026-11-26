<script lang="ts">
    import outline from '../../../assets/icons/panels_outline.svg?raw';
    import Icon from './Icon.svelte';

    const variants = { outline };

    let { variant = 'outline', size }: { variant?: keyof typeof variants; size?: number } =
        $props();
</script>

<Icon svg={variants[variant]} {size} />
