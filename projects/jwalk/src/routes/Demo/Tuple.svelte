<script>
    export let value;
    export let actions;
</script>

<div>TUPLE</div>
<div class="content">
    {#each actions as { key, type, action } (`${type}-${key}`)}
        <div use:action={value?.[key]} />
    {/each}
</div>

<style>
    .content {
        padding-left: 10px;
    }
</style>
