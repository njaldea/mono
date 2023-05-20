<script lang="ts">
    export let value: readonly [number, number, number];
    export let context: { key: number | string };
</script>

<div class="wrapper">
    <div class="title">Pose = {context?.key}</div>
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
