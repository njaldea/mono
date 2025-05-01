<script lang="ts">
    import { getClick, getName } from "./misc/utils";
    import type { Unionized, PropType } from "../types";

    let {
        info,
        visible = false
    }: {
        info: Unionized<PropType<"button">>;
        visible?: boolean;
    } = $props();

    let click = $derived(getClick(info)());
</script>

{#if visible}
    <div><button onclick={click}>{getName(info)}</button></div>
{/if}

<style>
    button {
        grid-column: 1 / 4;
        box-sizing: border-box;
        margin: 0.15rem 0.3rem;
    }
</style>
