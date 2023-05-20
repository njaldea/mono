<script lang="ts">
    export let value: readonly [number, number, number];
    export let context;

    let vx = value?.[0] ?? 0;
    let vy = value?.[1] ?? 0;
    let vz = value?.[2] ?? 0;

    $: context.notify("/0", vx);
    $: context.notify("/1", vy);
    $: context.notify("/2", vz);
</script>

<div class="wrapper">
    <div class="title">Pose - {context.key}</div>
    <div class="content">
        <span>X</span><input type="number" bind:value={vx} />
    </div>
    <div class="content">
        <span>Y</span><input type="number" bind:value={vy} />
    </div>
    <div class="content">
        <span>H</span><input type="number" bind:value={vz} />
    </div>
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

    input {
        width: 100%;
        box-sizing: border-box;
    }

    .content {
        display: grid;
        grid-template-columns: 20px auto;
        place-items: center;
    }
</style>
