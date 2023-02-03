<script lang="ts">
    export let title: undefined | string = undefined;
</script>

<div class="icon" on:click on:keypress {title}>
    <slot />
</div>

<style>
    div {
        width: 40px;
        height: 40px;
        cursor: pointer;
        transition: transform 350ms;
    }

    div:hover {
        transform: scale(1.5);
    }
</style>
