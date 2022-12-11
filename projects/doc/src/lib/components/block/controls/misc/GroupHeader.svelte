<script lang="ts">
    export let name: string;
    export let depth: number;
    export let checked: boolean;
    export let disabled = false;
</script>

<div>
    <div style:padding-left={`${depth}px`}>
        {`> ${name}`}
    </div>
    <div class="value">-</div>
    <div><input type="checkbox" bind:checked {disabled} /></div>
</div>

<style>
    .value {
        text-align: center;
    }
</style>
