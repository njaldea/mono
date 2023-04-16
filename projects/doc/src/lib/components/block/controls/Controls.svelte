<script lang="ts">
    import Styler from "./Styler.svelte";
    import Props from "./props/Props.svelte";
    import Events from "./events/Events.svelte";
    import { getControlInfo, getControlValue } from "../context";

    const controls = getControlInfo();
    const values = getControlValue();

    $: cc = $controls;
    $: vv = $values;

    let style: "props" | "events" = "props";

    // TODO: improve
    const cycle = () => {
        if (style === "props") {
            style = "events";
        } else {
            style = "props";
        }
    };
</script>

<Styler type={style}>
    {#if style === "props"}
        <div on:dblclick={cycle} on:keypress={null}>
            <div>Name</div>
            <div>Value</div>
            <div>Use</div>
        </div>
    {:else if style === "events"}
        <div on:dblclick={cycle} on:keypress={null}>
            <div>Events</div>
            <div>Detail</div>
        </div>
    {/if}
    {#key $values && $controls}
        {#if cc != null && $cc != null && vv != null && $vv != null}
            <Props infos={$cc.props} visible={style === "props"} bind:values={$vv.props} />
            <Events events={$vv.events} visible={style === "events"} />
        {/if}
    {/key}
</Styler>

<style>
</style>
