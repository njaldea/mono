<script lang="ts">
    import Button from "$lib/components/block/icons/Button.svelte";
    import Position from "$lib/components/block/icons/Position.svelte";

    type Position = "hidden" | "bottom" | "right";
    const positions: Position[] = ["hidden", "bottom", "right"];
    let position: Position = "hidden";
    const cycle = () => {
        positions.push(positions.shift() as Position);
        position = positions[0];
    };
</script>

<div>
    <Button on:click={cycle}>
        <Position bind:position />
    </Button>
</div>

<style>
    div {
        width: 500px;
        height: 500px;
    }
</style>
