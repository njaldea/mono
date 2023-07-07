<script lang="ts">
    import { adapter } from "../2-actions/adapter";
    import type { Context, AutoAction, Node } from "../2-actions/types";

    type T = $$Generic;

    export let title: string;
    export let value: T;
    export let actions: AutoAction<Node, T>;
    export let context: Context;

    let visible = true;
</script>

<div class="wrapper">
    <div class="title" on:click={() => (visible = !visible)} on:keypress={null} role="none">
        {title}
    </div>
    {#if visible}
        {@const raction = adapter(actions, context)}
        <div class="content" use:raction={value} />
    {/if}
</div>

<style>
    .wrapper {
        width: 100%;
        outline: blue solid 1px;
    }

    .title {
        padding: 0px 5px;
        user-select: none;
    }

    .content {
        padding-left: 15px;
    }
</style>
