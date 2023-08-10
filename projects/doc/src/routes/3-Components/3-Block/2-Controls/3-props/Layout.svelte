<script lang="ts">
    import Styler from "$lib/components/block/controls/Styler.svelte";

    import Detail from "./Detail.svelte";

    import type { SvelteComponent } from "svelte";

    // eslint-disable-next-line no-undef
    type C = $$Generic<SvelteComponent>;
    export let component: C;

    // eslint-disable-next-line no-undef
    type I = $$Generic;
    export let info: (n: string) => I;

    // eslint-disable-next-line no-undef
    type V = $$Generic;

    // eslint-disable-next-line
    export let name1: V | undefined;
    // eslint-disable-next-line
    export let name2: V | undefined;
    // eslint-disable-next-line
    export let name3: V | undefined;

    export let stringify = false;
</script>

<Detail>
    <table>
        <thead>
            <tr>
                <th>variable</th>
                <th>value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>name1</td>
                <td><pre><code>{stringify ? JSON.stringify(name1) : name1}</code></pre></td>
            </tr>
            <tr>
                <td>name2</td>
                <td><pre><code>{stringify ? JSON.stringify(name2) : name2}</code></pre></td>
            </tr>
            <tr>
                <td>name3</td>
                <td><pre><code>{stringify ? JSON.stringify(name3) : name3}</code></pre></td>
            </tr>
        </tbody>
    </table>
</Detail>

<hr />

<Detail>
    <Styler type={"props"}>
        <div>
            <div>Name</div>
            <div>Value</div>
            <div>Use</div>
        </div>
        <svelte:component
            this={component}
            info={info("name1")}
            bind:value={name1}
            depth={1}
            disabled={false}
            visible
        />
        <svelte:component
            this={component}
            info={info("name2")}
            bind:value={name2}
            depth={2}
            disabled={false}
            visible
        />
        <svelte:component
            this={component}
            info={info("name3")}
            bind:value={name3}
            depth={3}
            disabled
            visible
        />
    </Styler>
</Detail>

<style>
    tr > td > pre {
        background-color: transparent;
        margin: 0;
        padding: 10px;
    }
</style>
