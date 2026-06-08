<script lang="ts">
    import Button from "$lib/block/icons/Button.svelte";
    import Component from "$lib/block/icons/Position.svelte";

    const positions = ["hidden", "bottom", "right"] as const;
    let index = $state(0);
</script>

<div>
    <Button onclick={() => (index = (index + 1) % 3)}>
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
