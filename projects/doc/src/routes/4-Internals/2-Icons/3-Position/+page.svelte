<script lang="ts">
    import Button from "$lib/components/block/icons/Button.svelte";
    import Component from "$lib/components/block/icons/Position.svelte";

    let index = 0;
    const positions = ["hidden", "bottom", "right"] as const;
</script>

<div>
    <Button on:click={() => (index = (index + 1) % 3)}>
        <Component position={positions[index]} />
    </Button>
</div>
<div>
    {positions[index]}
</div>

<style>
    div {
        width: 500px;
        height: 500px;
    }
</style>
