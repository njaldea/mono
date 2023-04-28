<script lang="ts">
    import Button from "$lib/components/block/icons/Button.svelte";
    import ControlView from "$lib/components/block/icons/ControlView.svelte";

    type Mode = "props" | "events";
    const modes: Mode[] = ["props", "events"];
    let mode: Mode = "props";
    const cycle = () => {
        modes.push(modes.shift() as Mode);
        mode = modes[0];
    };
</script>

<div>
    <Button on:click={cycle}>
        <ControlView {mode} />
    </Button>
</div>
<div>
    {mode}
</div>

<style>
    div {
        width: 500px;
        height: 500px;
    }
</style>
