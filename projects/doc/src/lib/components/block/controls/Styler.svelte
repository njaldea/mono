<script lang="ts">
    export let type: "props" | "events";
</script>

<div class:props={type === "props"} class:events={type === "events"}>
    <slot />
</div>

<style>
    div {
        display: grid;
        min-width: 31.25rem;
        height: 100%;
        grid-auto-rows: 2rem;
        box-sizing: border-box;
        user-select: none;
    }

    div > :global(div) {
        display: grid;
    }

    div.props > :global(div) {
        grid-template-columns: minmax(15rem, 1fr) 12.5rem 2.5rem;
    }

    div.events > :global(div) {
        grid-template-columns: 2fr 3fr;
        align-items: center;
    }

    div > :global(div:first-child) {
        font-weight: bold;
        place-items: center;
    }

    div.props > :global(div > div:nth-child(2)) {
        display: grid;
        place-items: center;
    }

    div.props > :global(div > div:nth-child(3)) {
        margin: auto;
    }

    div > :global(div > div > .control) {
        width: 100%;
        height: 80%;
        box-sizing: border-box;
    }

    div > :global(div > div > .control[disabled]) {
        cursor: not-allowed;
        filter: opacity(0.5);
    }

    /* colors */
    div {
        transition: background-color var(--i-nil-doc-transition-time);
        background-repeat: repeat;
        background-size: 100% 4rem;
        background-image: linear-gradient(
            to bottom,
            var(--i-nil-doc-controls-p) 2rem,
            var(--i-nil-doc-controls-s) 2rem
        );
    }

    div > :global(div:nth-child(n + 2):hover) {
        background-color: var(--i-nil-doc-controls-hover);
    }

    div > :global(div:hover .tooltip) {
        background-color: var(--i-nil-doc-controls-p);
        outline: 1px solid var(--i-nil-doc-block-outline-color);
    }
</style>
