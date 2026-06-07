<script lang="ts">
    type Props = {
        visible: boolean;
        events?: { name: string; detail: string; count: number }[];
    };
    let { visible, events = [] }: Props = $props();
</script>

{#if visible}
    {#each events?.map((e) => {
        return { ...e };
    }) as event, i (i)}
        <div>
            <div class="name">
                <div>{event.name}</div>
                <div class="count">
                    [{event.count.toString().padStart(2, "0")}]
                </div>
            </div>
            <div>{event.detail}</div>
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
