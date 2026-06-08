<script lang="ts">
    import Button from "$lib/block/icons/Button.svelte";
    import ControlView from "$lib/block/icons/ControlView.svelte";

    let index = $state(0);
    const modes = ["props", "events"] as const;
</script>

<div>
    <Button onclick={() => (index = (index + 1) % 2)}>
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
