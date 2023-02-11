<div>
    <slot />
</div>

<style>
    div {
        box-sizing: border-box;
        margin: 0.5rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        width: min-content;
        height: min-content;
        min-width: calc(100% - 1rem);
        min-height: calc(100% - 1rem);
    }

    /* color */
    div {
        border: solid 1px var(--i-nil-doc-content-outline-color);
        box-shadow: 0px 0px 5px 0px var(--i-nil-doc-content-outline-color);
    }
</style>
