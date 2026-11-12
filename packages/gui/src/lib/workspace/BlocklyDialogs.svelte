<script lang="ts">
    import { Blockly } from '@thingblock-neo/blocks';
    import Modal from '../components/modal/Modal.svelte';

    type Request = {
        message: string;
        value?: string;
        cancelable: boolean;
        done: (ok: boolean, value?: string) => void;
    };

    let request = $state<Request | null>(null);

    // Clears before calling back, since Blockly may open the next dialog from the callback (e.g. duplicate name).
    function close(ok: boolean) {
        const current = request!;
        request = null;
        current.done(ok, current.value);
    }

    // Replaces Blockly's window.alert/confirm/prompt, which look out of place and may not work in the Tauri webview.
    Blockly.dialog.setAlert((message, callback) => {
        request = { message, cancelable: false, done: () => callback?.() };
    });
    Blockly.dialog.setConfirm((message, callback) => {
        request = { message, cancelable: true, done: (ok) => callback(ok) };
    });
    Blockly.dialog.setPrompt((message, value, callback) => {
        request = { message, value, cancelable: true, done: (ok, result) => callback(ok ? (result ?? '') : null) };
    });
</script>

<!-- Keyed so a follow-up dialog mounts fresh and gets focus. -->
{#key request}
    {#if request}
        <Modal message={request.message} bind:value={request.value} cancelable={request.cancelable} onclose={close} />
    {/if}
{/key}
