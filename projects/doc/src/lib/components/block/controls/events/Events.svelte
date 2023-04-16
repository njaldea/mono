<script lang="ts">
    export let visible: boolean;
    export let events: { name: string; detail: string; count: number }[] = [];
</script>

{#if visible}
    {#each events as { count, detail, name }, i (i)}
        <div>
            <div class="name">
                <div>{name}</div>
                {#if count > 1}
                    <div class="count">
                        [{count.toString().padStart(2, "0")}]
                    </div>
                {/if}
            </div>
            <div>{detail}</div>
        </div>
    {/each}
{/if}

<style>
    .name {
        padding: 0rem 0.5rem;
        display: grid;
        place-content: center;
        grid-auto-flow: column;
        grid-auto-columns: 1.875rem;
        grid-template-columns: 1fr;
    }

    .count {
        display: grid;
        place-items: center;
        text-align: center;
        font-size: 0.8rem;
    }
</style>
