<script lang="ts">
    import type { Context } from "../2-actions/types";
    export let value: readonly [number, number];
    export let context: Context;
</script>

<div class="wrapper">
    <div class="title">Point = {context?.key}</div>
    {JSON.stringify(value, null, 4)}
</div>

<style>
    .wrapper {
        width: 100%;
        outline: blue solid 1px;
    }

    .title {
        padding: 0px 5px;
        user-select: none;
    }
</style>
