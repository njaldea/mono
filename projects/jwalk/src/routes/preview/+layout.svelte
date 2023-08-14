<script lang="ts">
    import { onMount } from "svelte";
    onMount(() => (mounted = true));
    let mounted = false;
</script>

{#if mounted}
    {#if window.self !== window.top}
        <slot />
    {:else}
        Page is only available in an iframe.
    {/if}
{/if}
