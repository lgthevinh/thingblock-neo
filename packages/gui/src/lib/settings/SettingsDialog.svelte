<script lang="ts">
    import { version } from '../../../package.json';
    import Logo from '../header/Logo.svelte';

    let { onclose }: { onclose: () => void } = $props();

    const sections = [{ id: 'about', label: 'About' }];

    let dialog: HTMLDialogElement;
    let current = $state('about');

    // Opens as soon as it mounts; the parent unmounts it to close.
    $effect(() => dialog.showModal());
</script>

<dialog
    bind:this={dialog}
    oncancel={(e) => {
        e.preventDefault();
        onclose();
    }}
>
    <div class="title">
        <h2>Settings</h2>
        <button class="close" aria-label="Close" onclick={onclose}>
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
            >
                <path d="M6 6l12 12M18 6L6 18" />
            </svg>
        </button>
    </div>
    <div class="body">
        <nav>
            {#each sections as { id, label } (id)}
                <button
                    class:active={current === id}
                    aria-current={current === id}
                    onclick={() => (current = id)}>{label}</button
                >
            {/each}
        </nav>
        {#if current === 'about'}
            <section>
                <Logo />
                <p class="version">Version {version}</p>
                <p>Block-based programming for ThingBot.</p>
                <p>
                    Licensed under
                    <a
                        href="https://www.gnu.org/licenses/gpl-3.0.html"
                        target="_blank"
                        rel="noreferrer">GPL-3.0</a
                    >.
                    <a
                        href="https://github.com/ThingEdu/thingblock-neo"
                        target="_blank"
                        rel="noreferrer">Source code</a
                    >
                </p>
                <p>
                    Based on
                    <a
                        href="https://github.com/ThingEdu/thingblock-editor"
                        target="_blank"
                        rel="noreferrer">ThingBlock Editor</a
                    >, Scratch and Blockly.
                </p>
            </section>
        {/if}
    </div>
</dialog>

<style>
    dialog {
        width: 560px;
        padding: 0;
        border: none;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
        font: 14px sans-serif;
        color: #575e75;
    }
    /* Same tint as Modal, matching Scratch's modals. */
    dialog::backdrop {
        background: rgba(76, 151, 255, 0.6);
    }
    .title {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        background: #4c97ff;
        color: #fff;
    }
    h2 {
        margin: 0;
        font-size: 16px;
    }
    .close {
        display: grid;
        place-items: center;
        margin-left: auto;
        padding: 4px;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: inherit;
        cursor: pointer;
    }
    .close:hover {
        background: rgba(255, 255, 255, 0.15);
    }
    .close svg {
        width: 20px;
        height: 20px;
    }
    .body {
        display: grid;
        grid-template-columns: 140px 1fr;
        min-height: 300px;
    }
    nav {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 8px;
        border-right: 1px solid #ddd;
        background: #fafafa;
    }
    nav button {
        padding: 8px 12px;
        border: none;
        border-radius: 6px;
        background: transparent;
        font: inherit;
        color: inherit;
        text-align: left;
        cursor: pointer;
    }
    nav button:hover {
        background: #f0f4ff;
    }
    nav button.active {
        background: #4c97ff;
        color: #fff;
        font-weight: bold;
    }
    section {
        display: grid;
        align-content: start;
        justify-items: start;
        gap: 8px;
        padding: 24px;
    }
    p {
        margin: 0;
    }
    .version {
        font-weight: bold;
    }
    a {
        color: #4c97ff;
    }
</style>
