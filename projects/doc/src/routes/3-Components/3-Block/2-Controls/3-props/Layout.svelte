<script lang="ts" generics="Info, V">
    import Styler from "$lib/block/controls/Styler.svelte";
    import Detail from "./Detail.svelte";

    let {
        component: C,
        info,
        name1,
        name2,
        name3,
        stringify = false
    }: {
        component: any;
        info: (n: string) => Info;
        name1?: V | undefined;
        name2?: V | undefined;
        name3?: V | undefined;
        stringify?: boolean;
    } = $props();
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
        <C info={info("name1")} bind:value={name1} depth={1} disabled={false} visible />
        <C info={info("name2")} bind:value={name2} depth={2} disabled={false} visible />
        <C info={info("name3")} bind:value={name3} depth={3} disabled visible />
    </Styler>
</Detail>

<style>
    tr > td > pre {
        background-color: transparent;
        margin: 0;
        padding: 10px;
    }
</style>
