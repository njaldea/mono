<div>
    <slot />
</div>

<style>
    div {
        user-select: none;
    }
    div > :global(.demo > div:nth-child(1)) {
        text-align: center;
    }

    div > :global(.demo) {
        width: 100%;
        display: grid;
        grid-auto-rows: 35px;
    }

    div > :global(.demo) > :global(div) {
        width: 100%;
        display: grid;
        padding: 2px 0px;
        grid-template-columns: 1fr 300px 75px;
        background-color: hsl(205, 50%, 5%);
    }

    div > :global(.demo) > :global(div:nth-child(even)) {
        background-color: hsl(205, 15%, 15%);
    }

    div > :global(.demo) > :global(div > div) {
        display: grid;
        align-items: center;
    }

    div > :global(.demo) > :global(div > div > *) {
        width: 100%;
        height: 100%;
    }
</style>
