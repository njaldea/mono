<script lang="ts">
    import type { Snippet } from "svelte";

    let { children }: { children?: Snippet } = $props();
</script>

<div class="center">
    <div>
        {@render children?.()}
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
