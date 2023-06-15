<script lang="ts">
    import Button from "$lib/components/block/icons/Button.svelte";
    import ControlView from "$lib/components/block/icons/ControlView.svelte";

    let index = 0;
    const modes = ["props", "events"] as const;
</script>

<div>
    <Button on:click={() => (index = (index + 1) % 2)}>
        <ControlView mode={modes[index]} />
    </Button>
</div>
<div>
    {modes[index]}
</div>

<style>
    div {
        width: 500px;
        height: 500px;
    }
</style>
