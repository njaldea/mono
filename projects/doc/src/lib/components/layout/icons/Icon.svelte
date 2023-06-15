<script lang="ts">
    export let title: undefined | string = undefined;
</script>

<div class="icon" on:click on:keypress {title} role="none">
    <slot />
</div>

<style>
    div {
        width: 2.5rem;
        height: 2.5rem;
        cursor: pointer;
        transition: transform var(--i-nil-doc-transition-time);
    }

    div:hover {
        transform: scale(1.5);
    }
</style>
