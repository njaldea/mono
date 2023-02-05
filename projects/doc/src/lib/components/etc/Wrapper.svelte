<script lang="ts">
    export let dark: boolean;
</script>

<div class="wrapper scrollable" class:dark>
    <div class="content">
        <slot />
    </div>
</div>

<style>
    div {
        box-sizing: border-box;
    }

    .content {
        display: inline-block;
        margin: 0.5rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        min-width: calc(100% - 1rem);
        min-height: calc(100% - 1rem);
    }

    /* scrollable */
    .scrollable {
        width: 100%;
        height: 100%;
        overflow: scroll;
        /* Firefox */
        scrollbar-width: none;
        /* IE and Edge */
        -ms-overflow-style: none;
    }

    .scrollable::-webkit-scrollbar {
        display: none;
    }

    /* color */
    .wrapper {
        --color-content: hsl(0, 0%, 100%);
        --color-shadow: hsla(0, 0%, 0%, 0.15);
    }

    .wrapper.dark {
        --color-content: hsl(0, 0%, 6%);
        --color-shadow: hsla(0, 0%, 100%, 0.15);
    }

    .content {
        transition: color 350ms, background-color 350ms;
        background-color: var(--color-content);
        box-shadow: 0px 0px 10px 0px var(--color-shadow);
    }
</style>
