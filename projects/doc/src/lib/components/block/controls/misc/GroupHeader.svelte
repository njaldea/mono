<script lang="ts">
    import Name from "./Name.svelte";
    export let name: string;
    export let depth: number;
    export let checked: boolean;
    export let disabled = false;
    export let expand: boolean | undefined = undefined;

    const flip = () => {
        if (!disabled && checked) {
            if (expand !== undefined) {
                expand = !expand;
            }
        }
    };
</script>

<div on:click={flip} on:keypress={null}>
    <Name
        expand={expand === undefined ? undefined : expand && checked && !disabled}
        {name}
        {depth}
    />
    <div class="value">-</div>
    <div>
        <input type="checkbox" {disabled} bind:checked on:click={(e) => e.stopPropagation()} />
    </div>
</div>

<style>
    .value {
        text-align: center;
    }
</style>
