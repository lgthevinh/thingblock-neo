<script lang="ts" module>
    /** One monitor line: printed by the program, typed by the user, or an error. */
    export interface MonitorLine {
        text: string;
        kind: 'print' | 'input' | 'error';
    }
</script>

<script lang="ts">
    import { tick } from 'svelte';
    import FabMenu from '../components/fab/FabMenu.svelte';
    import FabMenuItem from '../components/fab/FabMenuItem.svelte';
    import DotsIcon from '../components/icons/DotsIcon.svelte';
    import ScrollDownIcon from '../components/icons/ScrollDownIcon.svelte';
    import TrashIcon from '../components/icons/TrashIcon.svelte';

    let {
        lines,
        onsend,
        onclear,
    }: { lines: MonitorLine[]; onsend: (line: string) => void; onclear: () => void } = $props();

    let autoScroll = $state(true);
    let input = $state('');
    let log: HTMLElement;

    // Follows the newest line once it is rendered.
    $effect(() => {
        if (lines.length && autoScroll) tick().then(() => log.scrollTo({ top: log.scrollHeight }));
    });

    function send(e: SubmitEvent) {
        e.preventDefault();
        onsend(input);
        input = '';
    }
</script>

<section>
    <div class="output">
        <div class="log" bind:this={log}>
            {#each lines as line, i (i)}
                <div class={line.kind}>{line.text}</div>
            {:else}
                <p>Run the program to see what it prints.</p>
            {/each}
        </div>
        <FabMenu label="Monitor options">
            {#snippet icon()}<DotsIcon />{/snippet}
            <FabMenuItem
                label="Auto scroll"
                active={autoScroll}
                onclick={() => (autoScroll = !autoScroll)}
            >
                <ScrollDownIcon size={18} />
            </FabMenuItem>
            <FabMenuItem label="Clear" onclick={onclear}><TrashIcon size={18} /></FabMenuItem>
        </FabMenu>
    </div>
    <form onsubmit={send}>
        <input bind:value={input} placeholder="Send message..." aria-label="Send to the program" />
        <button type="submit">Send</button>
    </form>
</section>

<style>
    section {
        display: grid;
        grid-template-rows: minmax(0, 1fr) auto;
        min-height: 0;
    }
    .output {
        position: relative;
        min-height: 0;
    }
    /* Bottom padding lets the last lines scroll clear of the FAB. */
    .log {
        height: 100%;
        box-sizing: border-box;
        padding: 8px 8px 64px;
        overflow: auto;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        font: 13px monospace;
    }
    .input {
        color: #4c97ff;
    }
    .error {
        color: #e5484d;
    }
    p {
        margin: 0;
        color: #888;
        font: 13px sans-serif;
    }
    /* Same as thingblock-editor's monitor input row. */
    form {
        display: flex;
        gap: 8px;
        padding: 8px;
        border-top: 1px solid #ddd;
    }
    input {
        flex: 1;
        /* Inputs keep an intrinsic width by default; let it give way so Send stays visible. */
        min-width: 0;
        padding: 6px 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        outline: none;
        font: 13px monospace;
    }
    input:focus {
        border-color: #4c97ff;
    }
    button {
        flex-shrink: 0;
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        background: #4c97ff;
        color: #fff;
        font: 600 12px sans-serif;
        cursor: pointer;
    }
    button:hover {
        background: #3373cc;
    }
</style>
