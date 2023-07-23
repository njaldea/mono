<script lang="ts">
    import { slide } from "svelte/transition";
    import type { Context, Action, Node } from "../2-actions/types";

    type T = $$Generic<Record<string, any>>;

    export let value: T;
    export let keys: readonly string[];
    export let refs: Readonly<Record<string, Action<Node, any>>>;
    export let context: Context;

    const adapter = <Value>(key: string): Action<HTMLDivElement, Record<string, Value>> => {
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

<div class="wrapper">
    <div class="title" on:click={() => (visible = !visible)} on:keypress={null} role="none">
        {#if context.key}
            Group - {context.key}
        {:else}
            Group
        {/if}
    </div>
    {#if visible}
        <div transition:slide class="content">
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
    }

    .content {
        padding-left: 10px;
        padding-right: 3px;
        padding-block: 3px;
    }
</style>
