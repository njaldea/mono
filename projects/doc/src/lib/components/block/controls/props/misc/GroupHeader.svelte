<script lang="ts">
    import Name from "./Name.svelte";

    import Toggle from "svelte-toggle";

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
    <div class="root" on:click={flip} on:keypress={null}>
        <Name
            expand={expand === undefined ? undefined : expand && checked && !disabled}
            {name}
            {depth}
        />
        <div class="value">-</div>
        <div><Toggle bind:toggled={checked} {disabled} hideLabel small on:click={e => e.stopPropagation()}/></div>
    </div>
{/if}

<style>
    .value {
        text-align: center;
    }
</style>
