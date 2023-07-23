<script lang="ts">
    import type { Context } from "../2-actions/types";
    export let value: readonly [number, number];
    export let context: Context;
</script>

<div class="wrapper">
    <div class="title">Point = {context?.key}</div>
    <pre class="content">{JSON.stringify(value, null)}</pre>
</div>

<style>
    .wrapper {
        width: 100%;
        user-select: none;
        outline: blue solid 1px;
        box-sizing: border-box;
    }

    .title {
        padding-left: 5px;
    }

    .content {
        padding-left: 10px;
        margin: 0px;
    }
</style>
