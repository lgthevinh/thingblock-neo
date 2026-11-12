<script lang="ts">
    let {
        message,
        value = $bindable(),
        cancelable = true,
        onclose,
    }: { message: string; value?: string; cancelable?: boolean; onclose: (ok: boolean) => void } = $props();

    let dialog: HTMLDialogElement;

    // Opens as soon as it mounts, which also focuses the input; the parent unmounts it to close.
    $effect(() => dialog.showModal());
</script>

<dialog
    bind:this={dialog}
    oncancel={(e) => {
        e.preventDefault();
        onclose(false);
    }}
>
    <form
        onsubmit={(e) => {
            e.preventDefault();
            onclose(true);
        }}
    >
        <p>{message}</p>
        {#if value !== undefined}
            <input bind:value />
        {/if}
        <div class="buttons">
            {#if cancelable}
                <button type="button" class="cancel" onclick={() => onclose(false)}>Cancel</button>
            {/if}
            <button type="submit" class="ok">OK</button>
        </div>
    </form>
</dialog>

<style>
    dialog {
        width: 360px;
        padding: 0;
        border: none;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
        font: 14px sans-serif;
        color: #575e75;
    }
    /* Scratch tints the page behind its modals with a translucent blue. */
    dialog::backdrop {
        background: rgba(76, 151, 255, 0.6);
    }
    form {
        display: grid;
        gap: 16px;
        padding: 24px;
    }
    p {
        margin: 0;
        font-weight: bold;
        text-align: center;
    }
    input {
        padding: 10px 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font: inherit;
        color: inherit;
        outline: none;
    }
    input:focus {
        border-color: #4c97ff;
        box-shadow: 0 0 0 4px rgba(76, 151, 255, 0.35);
    }
    .buttons {
        display: flex;
        justify-content: center;
        gap: 8px;
    }
    button {
        min-width: 80px;
        padding: 10px 16px;
        border-radius: 8px;
        font: inherit;
        font-weight: bold;
        cursor: pointer;
    }
    .cancel {
        border: 1px solid #ddd;
        color: inherit;
        background: #fff;
    }
    .ok {
        border: 1px solid #4c97ff;
        color: #fff;
        background: #4c97ff;
    }
    .ok:hover {
        background: #3373cc;
    }
</style>
