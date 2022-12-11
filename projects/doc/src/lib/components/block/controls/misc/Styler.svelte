<div>
    <slot />
</div>

<style>
    div {
        width: 100%;
        display: grid;
        grid-auto-rows: 30px;
    }

    div > :global(div) {
        width: 100%;
        display: grid;
        padding: 2px 0px;
        grid-template-columns: 1fr 200px 75px;
        background-color: hsl(205, 50%, 5%);
    }

    div > :global(div:nth-child(even)) {
        background-color: hsl(205, 15%, 15%);
    }

    div > :global(div:hover) {
        background-color: rgba(2, 156, 253, 0.07);
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
