<script lang="ts">
    import Styler from "./Styler.svelte";
    import Props from "./props/Props.svelte";
    import Events from "./events/Events.svelte";
    import { getControlInfo, getControlValue } from "../context";
    import Button from "../icons/Button.svelte";
    import ControlView from "../icons/ControlView.svelte";
    import Position from "../icons/Position.svelte";

    const controls = getControlInfo();
    const values = getControlValue();

    $: cc = $controls;
    $: vv = $values;

    export let mode: "props" | "events" = "props";
    export let position: "bottom" | "right" = "bottom";

    const cyclePosition = () => {
        switch (position) {
            case "bottom":
                position = "right";
                break;
            case "right":
                position = "bottom";
                break;
        }
    };

    const cycleMode = () => {
        switch (mode) {
            case "events":
                mode = "props";
                break;
            case "props":
                mode = "events";
                break;
        }
    };
</script>

<Styler type={mode}>
    <div class="header">
        <div class="buttons">
            <Button scale on:click={cyclePosition} title={position}>
                <Position {position} />
            </Button>
            <Button scale on:click={cycleMode} title={mode}>
                <ControlView {mode} />
            </Button>
        </div>
        {#if mode === "props"}
            <div>Name</div>
            <div>Value</div>
            <div>Use</div>
        {:else if mode === "events"}
            <div>Events</div>
            <div>Detail</div>
        {/if}
    </div>
    {#key $values && $controls}
        {#if cc != null && $cc != null && vv != null && $vv != null}
            <Props infos={$cc.props} visible={mode === "props"} bind:values={$vv.props} />
            <Events events={$vv.events} visible={mode === "events"} />
        {/if}
    {/key}
</Styler>

<style>
    .header {
        position: relative;
    }

    .buttons {
        position: absolute;
        width: 3.5rem;
        height: 1.75rem;
        left: 0.3rem;
        top: 0.15rem;
        display: flex;
        cursor: pointer;
    }
</style>
