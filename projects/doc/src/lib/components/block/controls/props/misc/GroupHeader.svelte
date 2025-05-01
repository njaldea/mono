<script lang="ts">
    import Name from "./Name.svelte";
    import Toggle from "./Toggle.svelte";
    
    let {
      name,
      depth,
      checked = $bindable(),
      disabled = false,
      expand = $bindable(false),
      visible = false
    }: {
      name: string;
      depth: number;
      checked?: boolean;
      disabled?: boolean;
      expand?: boolean;
      visible?: boolean;
    } = $props();
    
    const flip = () => {
      if (!disabled && checked) {
          expand = !expand;
      }
    };
</script>

{#if visible}
    <div onclick={flip} onkeypress={null} role="none">
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
    