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
        justify-items: center;
        align-items: center;
        grid-auto-flow: column;
        min-width: 500px;
        max-width: 650px;
    }
</style>
