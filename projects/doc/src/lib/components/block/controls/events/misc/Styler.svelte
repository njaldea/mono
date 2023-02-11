<!--
    <div> this component
        <div> Header
            <div></div>
            <div></div>
        </div>
        <div> Controls
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
        height: 22rem;
        min-width: 31.25rem;
        grid-auto-rows: 2rem;
    }

    div > :global(div) {
        display: grid;
        grid-template-columns: 2fr 3fr;
        align-items: center;
    }

    div > :global(div:first-child) {
        font-weight: bold;
        justify-items: center;
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
</style>
