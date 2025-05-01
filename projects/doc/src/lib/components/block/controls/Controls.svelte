<script lang="ts">
    import Styler from "./Styler.svelte";
    import Props from "./props/Props.svelte";
    import Events from "./events/Events.svelte";
    import { getControlInfo, getControlValue } from "../context";
    import Button from "../icons/Button.svelte";
    import ControlView from "../icons/ControlView.svelte";
    import Position from "../icons/Position.svelte";
    import { onDestroy } from "svelte";

    const controls = getControlInfo();
    const values = getControlValue();

    let cc = $state($controls);
    let vv = $state($values);

    const unsubs: (() => void)[] = [];

    unsubs.push(controls.subscribe(v => cc = v));
    unsubs.push(values.subscribe(v => vv = v));

    let {
        mode = $bindable("props"),
        position = $bindable("bottom")
    }: {
        mode: "props" | "events";
        position: "bottom" | "right";
    } = $props();

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
    
    onDestroy(() => unsubs.forEach(v => v()));
</script>

<Styler type={mode}>
    <div class="header">
        <div class="buttons">
            <Button scale onclick={cyclePosition} title={position}>
                <Position {position} />
            </Button>
            <Button scale onclick={cycleMode} title={mode}>
                <ControlView {mode} />
            </Button>
        </div>
        {#if "props" === mode}
            <div>Name</div>
            <div>Value</div>
            <div>Use</div>
        {:else if "events" === mode}
            <div>Events</div>
            <div>Detail</div>
        {/if}
    </div>
    {#key $values && $controls}
        {#if cc != null && $cc != null && vv != null && $vv != null}
            <Props values={vv} infos={$cc.props} visible={"props" === mode} />
            <Events events={$vv.events} visible={"events" === mode} />
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
