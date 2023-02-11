<script lang="ts">
    import {
        initParams,
        initDefaults,
        initControls,
        initControlsState,
        initOrientation
    } from "./context";

    import Base from "../Base.svelte";
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

<Base dark={$dark}>
    <div class="relative">
        <div class="buttons">
            <Button scale on:click={cycleMode} title={$state.mode}>
                <ControlView mode={$state.mode} />
            </Button>
            <Button scale on:click={cyclePosition} title={$state.position}>
                <Position position={$state.position} />
            </Button>
        </div>
    </div>
    <div class="block" class:columns={$columns} class:dark={$dark}>
        <slot />
    </div>
</Base>

<style>
    .relative {
        z-index: 10;
        position: relative;
    }

    .block {
        display: grid;
        border-radius: 0.5rem;
        grid-auto-rows: 1fr;
        grid-auto-columns: auto;
        grid-auto-flow: row;

        min-width: 10rem;

        padding: 1.75rem 0.2rem 0.5rem 0.2rem;
    }

    .buttons {
        position: absolute;
        width: 3.5rem;
        height: 1.75rem;
        right: 1rem;
        top: 0rem;
        display: flex;
        cursor: pointer;
    }

    .block.columns {
        grid-auto-rows: auto;
        grid-auto-columns: 1fr;
        grid-auto-flow: column;
    }

    .block {
        color: var(--i-nil-doc-color);
        color-scheme: var(--i-nil-doc-color-scheme);
        background-color: var(--i-nil-doc-block-bg-color);
        box-shadow: 0 0 0.5rem 0 var(--i-nil-doc-block-outline-color);
        outline: 1px solid var(--i-nil-doc-block-outline-color);
        transition: color var(--i-nil-doc-transition-time),
            background-color var(--i-nil-doc-transition-time);
    }
</style>
