<script lang="ts">
    import Name from "./Name.svelte";

    import Toggle from "./Toggle.svelte";

    export let name: string;
    export let depth: number;
    export let checked: boolean;
    export let disabled = false;
    export let expand: boolean | undefined = undefined;
    export let visible = false;

    const flip = () => {
        if (!disabled && checked) {
            if (expand !== undefined) {
                expand = !expand;
            }
        }
    };
</script>

{#if visible}
    <div on:click={flip} on:keypress={null}>
        <Name
            expand={expand === undefined ? undefined : expand && checked && !disabled}
            {name}
            {depth}
        />
        <div class:disabled={!checked}>-</div>
        <div><Toggle bind:toggled={checked} {disabled} /></div>
    </div>
{/if}

<style>
    .disabled {
        color: hsl(0, 0%, 50%);
    }
</style>
