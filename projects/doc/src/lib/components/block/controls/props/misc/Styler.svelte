<!--
    <div> this component
        <div> Header
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div> Controls
            <div></div>
            <div></div>
            <div></div>
        </div>
        ...
    </div>
-->
<div>
    <slot />
</div>

<style>
    div {
        display: grid;
        min-width: 31.25rem;
        grid-auto-rows: 2rem;
        box-sizing: border-box;
    }

    div :global(*),
    div :global(*::before),
    div :global(*::after) {
        box-sizing: inherit;
        font-family: inherit;
    }

    div > :global(div) {
        display: grid;
        grid-template-columns: minmax(15rem, 1fr) 12.5rem 2.5rem;
    }

    div > :global(div:first-child) {
        font-weight: bold;
        place-items: center;
    }

    div > :global(div > div:not(:first-child)) {
        display: grid;
        place-items: center;
    }

    div > :global(div > div:not(:first-child) > *) {
        width: 100%;
        height: 80%;
        font-size: 1rem;
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
