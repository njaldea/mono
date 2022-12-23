<script lang="ts">
    import ThemeIcon from "$lib/components/etc/ThemeIcon.svelte";

    let dark = true;
</script>

<div class:dark>
    <ThemeIcon bind:dark/>
</div>

<style>
    div {
        width: 500px;
        height: 500px;
        background-color: white;
        border-radius: 50% 50%;
        display: grid;
    }

    div.dark {
        background-color: black;
    }
</style>