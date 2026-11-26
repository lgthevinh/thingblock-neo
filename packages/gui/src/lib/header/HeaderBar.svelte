<script lang="ts">
    import Logo from './Logo.svelte';

    let { onsettings }: { onsettings: () => void } = $props();
</script>

<header>
    <Logo />
    <div class="actions">
        <button class="icon" aria-label="Settings" title="Settings" onclick={onsettings}>
            <!-- Lucide "settings" icon -->
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linejoin="round"
            >
                <path
                    d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                />
                <circle cx="12" cy="12" r="3" />
            </svg>
        </button>
    </div>
</header>

<style>
    header {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 3rem;
        padding: 0 12px;
        background: #4c97ff;
        color: #fff;
    }
    .actions {
        display: flex;
        gap: 4px;
        margin-left: auto;
    }
    .icon {
        display: grid;
        place-items: center;
        padding: 6px;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: #fff;
        cursor: pointer;
    }
    .icon:hover {
        background: rgba(255, 255, 255, 0.15);
    }
    .icon svg {
        width: 22px;
        height: 22px;
    }
</style>
