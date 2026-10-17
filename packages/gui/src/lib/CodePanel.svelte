<script lang="ts">
    let {
        code,
        collapsed,
        ontoggle,
    }: { code: string; collapsed: boolean; ontoggle: () => void } = $props();
</script>

<aside class:collapsed>
    <header>
        {#if !collapsed}<span>Arduino code</span>{/if}
        <button onclick={ontoggle} aria-label={collapsed ? 'Show code' : 'Hide code'}>
            {collapsed ? '‹' : '›'}
        </button>
    </header>
    {#if !collapsed}<pre>{code}</pre>{/if}
</aside>

<style>
    aside {
        display: flex;
        flex-direction: column;
        width: 400px;
        min-height: 0;
        overflow: hidden;
        border-left: 1px solid #ddd;
        background: #fafafa;
    }
    aside.collapsed {
        width: 32px;
    }
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 8px;
        border-bottom: 1px solid #ddd;
        font: 600 14px sans-serif;
    }
    .collapsed header {
        justify-content: center;
        padding: 4px 0;
    }
    button {
        border: none;
        background: none;
        font-size: 18px;
        cursor: pointer;
    }
    pre {
        flex: 1;
        min-height: 0;
        margin: 0;
        padding: 8px;
        overflow: auto;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        font: 13px monospace;
    }
</style>
