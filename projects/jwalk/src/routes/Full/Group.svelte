<script lang="ts">
    export let title: string;
    export let value: Record<string, unknown>;
    export let actions: { key: string; type: string; action: any; }[];
    export let adapter;
    export let context;

    let visible = true;
</script>

<div class="wrapper">
    <div class="title" on:click={() => visible = !visible}>{title}</div>
    {#if visible}
        <div class="content">
            {#each actions as { key, type, action } (`${type}-${key}`)}
                {@const raction = adapter(action, context, key)}
                <div use:raction={value?.[key]} />
            {/each}
        </div>
    {/if}
</div>

<style>
    .wrapper {
        width: 100%;
        outline: blue solid 1px;
    }

    .title {
        padding: 0px 5px;
        user-select: none;
    }

    .content {
        padding-left: 15px;
    }
</style>
