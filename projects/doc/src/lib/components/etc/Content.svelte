<script lang="ts">
    export let flat = false;
</script>

<div class="scrollable">
    {#if flat}
        <slot />
    {:else}
        <div class="wrapper">
            <slot />
        </div>
    {/if}
</div>

<style>
    .wrapper {
        display: inline-block;
        box-sizing: border-box;
        margin: 0.5rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        min-width: calc(100% - 1rem);
        min-height: calc(100% - 1rem);
    }

    /* scrollable */
    .scrollable {
        width: 100%;
        height: 100%;
        overflow: scroll;
        /* Firefox */
        scrollbar-width: none;
        /* IE and Edge */
        -ms-overflow-style: none;
    }

    .scrollable::-webkit-scrollbar {
        display: none;
    }

    /* color */
    .wrapper {
        border: solid 1px var(--i-nil-doc-content-outline-color);
        box-shadow: 0px 0px 5px 0px var(--i-nil-doc-content-outline-color);
    }
</style>
