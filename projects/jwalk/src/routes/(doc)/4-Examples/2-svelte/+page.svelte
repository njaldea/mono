<script lang="ts">
    import { editor, viewer } from "./actions/action";
    import type { Context, State } from "./actions/types";

    import Actions from "./actions/Content.svelte";
    import Components from "./components/Content.md";
    import Page from "./page/Content.md";

    import jsonpointer from "jsonpointer";

    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    let mounted = false;
    let json: {
        subgroup: { 123: [number, number] };
        point: [number, number];
        point35: [number, number];
    } = {
        subgroup: { 123: [3, 2] },
        point: [1, 2],
        point35: [3, 5]
    };

    let state: State = {
        expand: writable(false),
        children: {
            subgroup: {
                expand: writable(true),
                children: {
                    123: {
                        expand: writable(true),
                        children: {}
                    }
                }
            },
            point: {
                expand: writable(true),
                children: {}
            },
            point35: {
                expand: writable(true),
                children: {}
            }
        }
    };

    const notify: Context["detail"]["notify"] = (path, value) => {
        if (mounted) {
            console.log("change", path, value);
            jsonpointer.set(json, path, value);
            json = json;
        }
    };
    const edetail = { notify, key: "Edit", state };
    const eaction = (target: HTMLDivElement, value: typeof json) => {
        return editor().build({ target, detail: edetail }, value);
    };

    const vdetail = { notify, key: "View", state };
    const vaction = (target: HTMLDivElement, value: typeof json) => {
        return viewer().build({ target, detail: vdetail }, value);
    };

    const mapping = {
        components: Components,
        actions: Actions,
        page: Page
    } as const;
    let selected: keyof typeof mapping = "page";

    onMount(() => (mounted = true));
</script>

<h1>svelte</h1>

<div class="col">
    <div use:vaction={json} />
    <div use:eaction={json} />
</div>
<hr />
<div class="nav">
    {#each Object.keys(mapping) as name}
        <label class:selected={selected === name}>
            <input type="radio" bind:group={selected} name="shown" value={name} />
            {name}
        </label>
    {/each}
</div>

<svelte:component this={mapping[selected]} />

<style>
    .col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5px;
    }

    .nav {
        gap: 2px;
        height: 36px;
        display: grid;
        user-select: none;
        grid-template-columns: 100px 100px 100px;
        margin-bottom: 0.3rem;
    }

    label {
        display: grid;
        place-items: center;
        cursor: pointer;
    }

    hr {
        margin-block: 5px !important;
    }

    .selected {
        outline: 1px solid blue;
    }

    input {
        display: none;
    }
</style>
