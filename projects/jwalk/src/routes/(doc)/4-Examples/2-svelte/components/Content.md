Svelte components below are used for this example.
These are the simplified version to make it easier to consume.

### VPoint.svelte

```svelte
<script>
    export let value;
    export let detail;
</script>

<div>
    <div>Point - {detail?.key}</div>
    <pre>{JSON.stringify(value)}</pre>
</div>
```

### EPoint.svelte

```svelte
<script>
    export let value;
    export let detail;

    let vx = value[0];
    let vy = value[1];
    let mounted = false;

    const notify = (path, value) => {
        mounted && detail.notify(path, value);
    };

    $: notify("/0", vx);
    $: notify("/1", vy);
    onMount(() => (mounted = true));
</script>

<div>
    <div>Point - {detail.key}</div>
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
    export let detail;

    const adapter = (key: string) => {
        return (target, value) => {
            const [k, t] = key.split(":");
            return refs[t](
                {
                    target,
                    detail: {
                        notify: (path, value) => detail.notify(`/${key}${path}`, value),
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
        {#if detail.key}
            Group - {detail.key}
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
