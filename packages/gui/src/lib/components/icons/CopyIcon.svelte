<script lang="ts">
    import filled from '../../../assets/icons/copy_filled.svg?raw';
    import Icon from './Icon.svelte';

    const variants = { filled };

    let { variant = 'filled', size }: { variant?: keyof typeof variants; size?: number } = $props();
</script>

<Icon svg={variants[variant]} {size} />
