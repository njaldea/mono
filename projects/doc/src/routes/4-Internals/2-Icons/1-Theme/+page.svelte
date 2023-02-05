<script lang="ts">
    import ThemeIcon from "$lib/components/icons/Theme.svelte";

    let dark = true;
</script>

<div class:dark on:click={() => (dark = !dark)} on:keypress={null}>
    <ThemeIcon theme={dark ? "dark" : "light"} />
</div>

<style>
    div {
        width: 500px;
        height: 500px;
        color: hsl(0, 0%, 0%);
        background-color: hsl(0, 0%, 100%);
        border-radius: 50% 50%;
        display: grid;

        transition: color 350ms, background-color 350ms;
    }

    div.dark {
        color: hsl(0, 0%, 80%);
        background-color: hsl(0, 0%, 6%);
    }
</style>
