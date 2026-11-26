<script lang="ts">
    import flagIcon from '../../assets/icons/green_flag.svg';
    import stopIcon from '../../assets/icons/stop_all.svg';

    let {
        running,
        disabled = false,
        onrun,
        onstop,
    }: { running: boolean; disabled?: boolean; onrun: () => void; onstop: () => void } = $props();

    const label = $derived(running ? 'Stop' : 'Run');
</script>

<button
    class:stop={running}
    aria-label={label}
    title={disabled ? 'Running needs the desktop app' : label}
    {disabled}
    onclick={running ? onstop : onrun}
>
    <img alt="" draggable="false" width="20" height="20" src={running ? stopIcon : flagIcon} />
    <span>{label}</span>
</button>

<style>
    /* Same as thingblock-editor's Run / Stop button. */
    button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        min-width: 7rem;
        height: 2.25rem;
        padding: 0 1.25rem;
        border: 1px solid transparent;
        border-radius: 0.5rem;
        background: #0fbd8c;
        color: #fff;
        cursor: pointer;
        font:
            600 0.75rem 'Helvetica Neue',
            Helvetica,
            Arial,
            sans-serif;
        line-height: 1;
    }
    button:hover:not(:disabled) {
        background: #0da57a;
    }
    .stop {
        background: #ff661a;
    }
    .stop:hover:not(:disabled) {
        background: #e64d00;
    }
    button:disabled {
        cursor: default;
        opacity: 0.6;
    }
    /* The flag and stop glyphs render white on the solid background. */
    img {
        flex-shrink: 0;
        filter: brightness(0) invert(1);
    }
</style>
