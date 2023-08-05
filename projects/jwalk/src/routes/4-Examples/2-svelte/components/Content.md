Svelte components below are used for this example.
These are the simplified version to make it easier to consume.

### VPoint.svelte

```svelte
<script>
    export let value;
    export let context;
</script>

<div>
    <div>Point = {context?.key}</div>
    <pre>{JSON.stringify(value)}</pre>
</div>
```

### EPoint.svelte

```svelte
<script>
    export let value;
    export let context;

    let vx = value[0];
    let vy = value[1];
    let mounted = false;

    const notify = (path, value) => {
        mounted && context.notify(path, value);
    };

    $: notify("/0", vx);
    $: notify("/1", vy);
    onMount(() => (mounted = true));
</script>

<div>
    <div>Point - {context.key}</div>
    <div>
        <span>X</span><input type="number" bind:value={vx} />
        <span>Y</span><input type="number" bind:value={vy} />
    </div>
</div>
```

### Object.svelte

```svelte
<script>
    import { slide } from "svelte/transition";

    export let value;
    export let keys;
    export let refs;
    export let context;

    const adapter = (key: string) => {
        return (target, value) => {
            const [k, t] = key.split(":");
            return refs[t](
                {
                    target,
                    context: {
                        notify: (path, value) => context.notify(`/${key}${path}`, value),
                        key: k
                    }
                },
                value[k]
            );
        };
    };

    let visible = true;
</script>

<div>
    <div>
        {#if context.key}
            Group - {context.key}
        {:else}
            Group
        {/if}
    </div>
    <div in:slide out:slide>
        {#each keys as key (key)}
            {@const raction = adapter(key)}
            <div use:raction={value} />
        {/each}
    </div>
</div>
```
