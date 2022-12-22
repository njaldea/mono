<script lang="ts">
    import type { Theme } from "$lib/components/context";

    import ThemeIcon from "$lib/components/etc/ThemeIcon.svelte";

    let theme: Theme;
</script>

<div class:dark={theme !== "light"}>
    <ThemeIcon bind:theme/>
</div>

<style>
    div {
        width: 500px;
        height: 500px;
        background-color: white;
        display: grid;
    }

    div.dark {
        background-color: black;
    }
</style>