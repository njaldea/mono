<script lang="ts">
    import { getClick, getName } from "./misc/utils";
    import type { Unionized, PropType } from "../types";

    export let info: Unionized<PropType<"button">>;
    export let visible = false;

    $: click = getClick(info)();
</script>

{#if visible}
    <div><button on:click={click}>{getName(info)}</button></div>
{/if}

<style>
    button {
        grid-column: 1 / 4;
        box-sizing: border-box;
        margin: 0.15rem 0.3rem;
    }
</style>
