<script lang="ts">
    import { getClick, getName } from "./misc/utils";
    import type { Unionized, PropType } from "../types";
    export let info: Unionized<PropType<"button">>;

    $: click = getClick(info)();
</script>

<div>
    <button on:click={click}>{getName(info)}</button>
</div>

<style>
    button {
        grid-column: 1 / 4;
        box-sizing: border-box;
        margin: 0.15rem 0.3rem;
    }
</style>
