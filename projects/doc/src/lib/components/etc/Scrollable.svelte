<div>
    <slot/>
</div>

<style>
    /* scrollable */
    div {
        width: 100%;
        height: 100%;
        overflow: scroll;
        /* Firefox */
        scrollbar-width: none;
        /* IE and Edge */
        -ms-overflow-style: none;
    }

    div::-webkit-scrollbar {
        display: none;
    }
</style>