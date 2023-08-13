<script lang="ts">
    import { onMount } from "svelte";
    import Component from "./Component.svelte";
    onMount(() => (mounted = true));
    let mounted = false;
</script>

{#if mounted}
    {#if window.self !== window.top}
        <Component></Component>
    {:else}
        Page is only available in an iframe.
    {/if}
{/if}
