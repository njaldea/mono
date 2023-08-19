<script lang="ts" generics="T">
    import { slide } from "svelte/transition";
    import type { Context, Action } from "../actions/types";

    export let value: Record<string, T>;
    export let keys: readonly string[];
    export let refs: Readonly<Record<string, Action<Context, any>>>;
    export let detail: Context["detail"];

    type Adapter = <Value>(key: string) => Action<HTMLDivElement, Record<string, Value>>;
    const adapter: Adapter = (key) => {
        return (target, value) => {
            const [k, t] = key.split(":");
            const { update, destroy } = refs[t](
                {
                    target,
                    detail: {
                        notify: (path, value) => detail.notify(`/${k}${path}`, value),
                        key: k,
                        state: detail.state.children[k]
                    }
                },
                value[k]
            );
            return {
                update: (v) => update(v[k]),
                destroy
            };
        };
    };

    const visible = detail.state.expand;
</script>

<div class="wrapper">
    <div class="title" on:click={() => visible.update((v) => !v)} on:keypress={null} role="none">
        {#if detail.key}
            Group - {detail.key}
        {:else}
            Group
        {/if}
    </div>
    {#if $visible}
        <div in:slide out:slide class="content">
            {#each keys as key (key)}
                {@const raction = adapter(key)}
                <div use:raction={value} />
            {/each}
        </div>
    {/if}
</div>

<style>
    .wrapper {
        width: 100%;
        user-select: none;
        outline: blue solid 1px;
        box-sizing: border-box;
    }

    .title {
        padding-left: 5px;
        cursor: pointer;
    }

    .content {
        margin: 0px;
        padding-left: 10px;
        padding-right: 3px;
        padding-block: 3px;
    }
</style>
