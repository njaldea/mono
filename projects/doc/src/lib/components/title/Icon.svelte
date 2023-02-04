<script lang="ts">
    export let title: undefined | string = undefined;
</script>

<div class="icon" on:click on:keypress {title}>
    <slot />
</div>

<style>
    div {
        width: 2.5rem;
        height: 2.5rem;
        cursor: pointer;
        transition: transform 350ms;
    }

    div:hover {
        transform: scale(1.5);
    }
</style>
