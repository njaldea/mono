<script lang="ts">
    export let value: readonly [number, number, number];

</script>

<div class="wrapper">
    <div class="title">Pose</div>
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
