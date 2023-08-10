<script lang="ts">
    import { initParams, initDefaults, initControls, initOrientation } from "./context";

    import Base from "../Base.svelte";
    import { getTheme } from "../context";

    initParams();
    initDefaults();
    initControls();

    const columns = initOrientation();
    const dark = getTheme();
</script>

<!--
    @component3-Block
    See [documentation](https://mono-doc.vercel.app/3-Components/2-Block) for more details.
-->

<!-- <svelte:body on:click={unfocus}/> -->

<Base dark={$dark}>
    <div class="outer">
        <div class="scrollable block" class:columns={$columns}>
            <slot />
        </div>
    </div>
</Base>

<style>
    .outer {
        position: relative;
        border-radius: 0.5rem;
        padding: 1rem 0.2rem 1rem 0.2rem;
        min-width: 10rem;
        margin: 1px;
        outline: solid 1px white;
    }

    .block {
        width: 100%;
        height: 100%;
        display: grid;
        grid-auto-rows: 1fr;
        grid-auto-columns: auto;
        grid-auto-flow: row;
    }

    .scrollable {
        overflow: scroll;
        /* Firefox */
        scrollbar-width: none;
        /* IE and Edge */
        -ms-overflow-style: none;
    }

    .scrollable::-webkit-scrollbar {
        display: none;
    }

    .block.columns {
        grid-auto-rows: auto;
        grid-auto-columns: 1fr;
        grid-auto-flow: column;
    }

    .outer {
        color: var(--i-nil-doc-color);
        color-scheme: var(--i-nil-doc-color-scheme);
        background-color: var(--i-nil-doc-block-bg-color);
        box-shadow: 0 0 0.5rem 0 var(--i-nil-doc-block-outline-color);
        outline: 1px solid var(--i-nil-doc-block-outline-color);
        transition:
            color var(--i-nil-doc-transition-time),
            background-color var(--i-nil-doc-transition-time);
    }

    .block {
        outline: 1px solid var(--i-nil-doc-block-outline-color);
    }
</style>
