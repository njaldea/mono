<script lang="ts">
    import {
        initParams,
        initDefaults,
        initControls,
        initControlsState,
        initOrientation
    } from "./context";

    import { getTheme, initTheme, type Theme } from "../context";
    import Button from "./icons/Button.svelte";
    import Position from "./icons/Position.svelte";
    import ControlView from "./icons/ControlView.svelte";

    initParams();
    initDefaults();
    initControls();

    const state = initControlsState();
    const columns = initOrientation();

    export let theme: Theme = undefined;

    const parentTheme = getTheme();
    const dark = initTheme();
    $: $dark = theme === undefined ? $parentTheme : "dark" === theme;

    const cyclePosition = () => {
        switch ($state.position) {
            case "hidden":
                $state.position = "bottom";
                break;
            case "bottom":
                $state.position = "right";
                break;
            case "right":
                $state.position = "hidden";
                break;
        }
    };

    const cycleMode = () => {
        switch ($state.mode) {
            case "event":
                $state.mode = "prop";
                break;
            case "prop":
                $state.mode = "event";
                break;
        }
    };
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/2-Block) for more details.
-->

<div class="block" class:columns={$columns} class:dark={$dark}>
    <div class="buttons">
        <Button scale on:click={cycleMode} title={$state.mode}>
            <ControlView mode={$state.mode} />
        </Button>
        <Button scale on:click={cyclePosition} title={$state.position}>
            <Position position={$state.position} />
        </Button>
    </div>
    <slot />
</div>

<style>
    @import url("https://fonts.googleapis.com/css?family=Fira%20Code");

    .block {
        display: grid;
        border-radius: 0.3125rem;
        grid-auto-rows: 1fr;
        grid-auto-columns: auto;
        grid-auto-flow: row;

        min-width: 10rem;

        box-sizing: border-box;
        font-family: "Fira Code", "Courier New", Courier, monospace;
        padding: 1.75rem 0.2rem 0.5rem 0.2rem;
        gap: 0.1875rem;
        position: relative;
    }

    .buttons {
        position: absolute;
        width: calc(1.75rem * 2);
        height: 1.75rem;
        right: 1rem;
        top: 0rem;
        display: flex;
        cursor: pointer;
        box-sizing: border-box;
    }

    .block.columns {
        grid-auto-rows: auto;
        grid-auto-columns: 1fr;
        grid-auto-flow: column;
    }

    /* colors */
    .block {
        color-scheme: light;
        color: hsl(0, 0, 0);
        background-color: hsl(0, 0%, 100%);
        box-shadow: 0px 0px 5px 0px hsla(0, 0%, 0%, 0.15);
        outline: 1px solid hsla(0, 0%, 0%, 0.15);
        transition: color 350ms, background-color 350ms;
    }

    .block.dark {
        color-scheme: dark;
        color: hsl(0, 0, 80%);
        background-color: hsl(0, 0%, 6%);
        box-shadow: 0px 0px 5px 0px hsla(0, 0%, 100%, 0.3);
        outline: 1px solid hsla(0, 0%, 100%, 0.3);
    }
</style>
