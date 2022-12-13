<div>
    <slot />
</div>

<style>
    div {
        width: 100%;
        min-width: 500px;
        overflow: hidden;
        display: grid;
        grid-auto-rows: 30px;
        box-sizing: border-box;
    }

    div :global(*) {
        box-sizing: inherit;
    }

    div > :global(div) {
        width: 100%;
        display: grid;
        padding: 2px 0px;
        grid-template-columns: minmax(250px, 1fr) 200px 40px;
        background-color: hsl(205, 50%, 5%);
    }

    div > :global(div:nth-child(even)) {
        background-color: hsl(205, 15%, 15%);
    }

    div > :global(div:hover .tooltip),
    div > :global(div:nth-child(n + 2):hover) {
        background-color: hsl(203, 100%, 15%);
    }

    div > :global(div > div) {
        display: grid;
        align-items: center;
    }

    div > :global(div > div > *) {
        width: 100%;
        height: 100%;
    }
</style>
