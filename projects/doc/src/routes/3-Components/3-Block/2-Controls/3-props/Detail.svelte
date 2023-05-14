<div class="center">
    <div>
        <slot />
    </div>
</div>

<style>
    .center {
        font-family: "Fira Code";
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .center > div {
        display: grid;
        place-items: center;
        grid-auto-flow: column;
    }
</style>
