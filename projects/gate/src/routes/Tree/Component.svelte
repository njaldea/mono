<script lang="ts">
    import { Tree, connect } from "$lib/graph/tree";
    import { onDestroy } from "svelte";

    let key = false;

    const sut = new Tree();
    const defaults = 0;
    type Value = number | null;

    const impl = (tag: string, op: (v1: number, v2: number) => number) => {
        return (v1: Value, v2: Value) => {
            return [op(v1 ?? defaults, v2 ?? defaults)];
        };
    };

    type Impl = (...values: Value[]) => Value[];

    const debounce = (cb: Impl, timeout = 1000) => {
        let rejection: null | ((reasong?: any) => void) = null;
        let identifier: null | ReturnType<typeof setTimeout> = null;

        return async (v: Value) => {
            return new Promise<Value[]>((resolve, reject) => {
                if (identifier && rejection) {
                    clearTimeout(identifier);
                    rejection("debounced");
                }

                rejection = reject;
                identifier = setTimeout(() => {
                    identifier = null;
                    resolve(cb(v));
                }, timeout);
            });
        };
    };

    const delayed = (cb: Impl, timeout = 1000) => {
        return (v: Value) => {
            return new Promise<Value[]>((resolve) => {
                setTimeout(() => resolve(cb(v)), timeout);
            });
        };
    };

    // const input1_00 = sut.createNode(debounce((v) => [v ?? defaults]), { in: 1, out: 1 }); // id 0
    // const input2_01 = sut.createNode(delayed((v) => [v ?? defaults]), { in: 1, out: 1 }); // id 1
    const input1_00 = sut.createNode((v) => [v ?? defaults], { in: 1, out: 1 }); // id 0
    const input2_01 = sut.createNode((v) => [v ?? defaults], { in: 1, out: 1 }); // id 1
    const input3_02 = sut.createNode((v) => [v ?? defaults], { in: 1, out: 1 }); // id 2
    const input4_03 = sut.createNode((v) => [v ?? defaults], { in: 1, out: 1 }); // id 3

    const node1__04 = sut.createNode(
        impl("a", (v1, v2) => v1 + v2),
        { in: 2, out: 1 }
    ); // id 4
    const node2__05 = sut.createNode(
        impl("s", (v1, v2) => v1 - v2),
        { in: 2, out: 1 }
    ); // id 5
    const node3__06 = sut.createNode(
        impl("m", (v1, v2) => v1 * v2),
        { in: 2, out: 1 }
    ); // id 6

    const in1____07 = sut.createEdge(); // id 7
    const in2____08 = sut.createEdge(); // id 8
    const in3____09 = sut.createEdge(); // id 9
    const in4____10 = sut.createEdge(); // id 10

    const edge1__11 = sut.createEdge(); // id 11
    const edge2__12 = sut.createEdge(); // id 12

    const edgeo__13 = sut.createEdge(); // id 13
    const nodeo__14 = sut.createNode((v) => [v ?? defaults], { in: 1, out: 1 }); // 14

    let i11 = 1;
    let i12 = 2;
    let i21 = 3;
    let i22 = 4;

    $: input1_00.input(0, i11);
    $: input2_01.input(0, i12);
    $: input3_02.input(0, i21);
    $: input4_03.input(0, i22);

    const value = nodeo__14.output(0);

    const click = (flag: number) => {
        console.log("click");
        switch (flag) {
            case 0:
                // x = (i11 + i12)
                // y = (i21 * i21)
                // r = y - x
                connect(input1_00, 0, in1____07); //  0 0  7
                connect(input2_01, 0, in2____08); //  1 0  8
                connect(input3_02, 0, in3____09); //  2 0  9
                connect(input4_03, 0, in4____10); //  3 0 10
                connect(in1____07, 0, node1__04); //  7 0  4
                connect(in2____08, 1, node1__04); //  8 1  4
                connect(in3____09, 0, node2__05); //  9 0  5
                connect(in4____10, 1, node2__05); // 10 1  5
                connect(node1__04, 0, edge1__11); //  4 0 11
                connect(node2__05, 0, edge2__12); //  5 0  2
                connect(edge1__11, 0, node3__06); // 11 0  6
                connect(edge2__12, 1, node3__06); // 12 1  6
                connect(node3__06, 0, edgeo__13); //  6 0 13
                connect(edgeo__13, 0, nodeo__14); // 13 0 14
                break;
            case 1:
                // x = (i11 + i12)
                // y = (i21 * i21)
                // r = x - y
                connect(input1_00, 0, in1____07); //  0 0  7
                connect(input2_01, 0, in2____08); //  1 0  8
                connect(input3_02, 0, in3____09); //  2 0  9
                connect(input4_03, 0, in4____10); //  3 0 10
                connect(in1____07, 0, node1__04); //  7 0  4
                connect(in2____08, 1, node1__04); //  8 1  4
                connect(in3____09, 0, node2__05); //  9 0  5
                connect(in4____10, 1, node2__05); // 10 1  5
                connect(node1__04, 0, edge1__11); //  4 0 11
                connect(node2__05, 0, edge2__12); //  5 0 12
                connect(edge1__11, 1, node3__06); // 11 1  6
                connect(edge2__12, 0, node3__06); // 12 0  6
                connect(node3__06, 0, edgeo__13); //  6 0 13
                connect(edgeo__13, 0, nodeo__14); // 13 0 14
                break;
            case 2:
                // x = (i11 + i12)
                // y = (i21 - i22)
                // r = y * x
                connect(input1_00, 0, in1____07); //  0 0  7
                connect(input2_01, 0, in2____08); //  1 0  8
                connect(input3_02, 0, in3____09); //  2 0  9
                connect(input4_03, 0, in4____10); //  3 0 10
                connect(in1____07, 0, node1__04); //  7 0  4
                connect(in2____08, 1, node1__04); //  8 1  4
                connect(in3____09, 0, node3__06); //  9 0  6
                connect(in4____10, 1, node3__06); // 10 1  6
                connect(node1__04, 0, edge1__11); //  4 0 11
                connect(node3__06, 0, edge2__12); //  6 0 12
                connect(edge1__11, 0, node2__05); // 11 0  5
                connect(edge2__12, 1, node2__05); // 12 1  5
                connect(node2__05, 0, edgeo__13); //  5 0 13
                connect(edgeo__13, 0, nodeo__14); // 13 0 14
                break;
            case 3:
                // x = (i11 - i12)
                // y = (i21 * i22)
                // r = y + x
                connect(input1_00, 0, in1____07); //  0 0  7
                connect(input2_01, 0, in2____08); //  1 0  8
                connect(input3_02, 0, in3____09); //  2 0  9
                connect(input4_03, 0, in4____10); //  3 0 10
                connect(in1____07, 0, node3__06); //  7 0  6
                connect(in2____08, 1, node3__06); //  8 1  6
                connect(in3____09, 0, node2__05); //  9 0  5
                connect(in4____10, 1, node2__05); // 10 1  5
                connect(node3__06, 0, edge1__11); //  6 0 11
                connect(node2__05, 0, edge2__12); //  5 0 12
                connect(edge1__11, 0, node1__04); // 11 0 13
                connect(edge2__12, 1, node1__04); // 12 1 13
                connect(node1__04, 0, edgeo__13); //  4 0 13
                connect(edgeo__13, 0, nodeo__14); // 13 0 14
                break;
        }
        return flag;
    };
    const text1 = (n: number, v1: Value, v2: Value, v3: Value, v4: Value, r: Value) => {
        switch (n) {
            case 0:
                return `${n} ~ (${v1} + ${v2}) * (${v3} - ${v4}) = ${r}`;
            case 1:
                return `${n} ~ (${v3} - ${v4}) * (${v1} + ${v2}) = ${r}`;
            case 2:
                return `${n} ~ (${v1} + ${v2}) - (${v3} * ${v4}) = ${r}`;
            case 3:
                return `${n} ~ (${v1} * ${v2}) + (${v3} - ${v4}) = ${r}`;
        }
    };
    const text2 = (n: number, v1: number, v2: number, v3: number, v4: number) => {
        switch (n) {
            case 0:
                return `${n} ~ (${v1 + v2}) * (${v3 - v4}) = ${(v1 + v2) * (v3 - v4)}`;
            case 1:
                return `${n} ~ (${v3 - v4}) * (${v1 + v2}) = ${(v1 + v2) * (v3 - v4)}`;
            case 2:
                return `${n} ~ (${v1 + v2}) - (${v3 * v4}) = ${v1 + v2 - v3 * v4}`;
            case 3:
                return `${n} ~ (${v1 * v2}) + (${v3 - v4}) = ${v1 * v2 + (v3 - v4)}`;
        }
    };

    const o = (...arg: unknown[]) => {
        return sut.debug();
    };

    let interval = setInterval(() => (key = !key));

    $: mapping = o(key, i11, i12, i21, i22);

    const indices = 4;
    export let skip = 0;
    export let initial: number;
    let index = click(initial);

    onDestroy(() => {
        sut.dispose();
        clearInterval(interval);
    });
</script>

<button on:click={() => (index = click(((index + 1 - skip) % (indices - skip)) + skip))}
    >click me</button
>
<button on:click={() => (key = !key)}>print me</button>

<div>
    {index}
    {$value}
</div>
<div>
    {text1(index, i11, i12, i21, i22, $value ?? defaults)}
</div>
<div>
    {text2(index, i11, i12, i21, i22)}
</div>

<span>nodes</span>
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>IN</th>
            <th>OUT</th>
            <th>IN[v]</th>
            <th>OUT[v]</th>
        </tr>
    </thead>
    <tbody>
        {#each mapping.nodes as node (node.id)}
            <tr>
                <td>{node.id}</td>
                <td>{JSON.stringify(node.connections.in ?? null)}</td>
                <td>{JSON.stringify(node.connections.out ?? null)}</td>
                <td>{JSON.stringify(node.values.in ?? null)}</td>
                <td>{JSON.stringify(node.values.out ?? null)}</td>
            </tr>
        {/each}
    </tbody>
</table>

<span>edges</span>
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>I</th>
            <th>I[P]</th>
            <th>O</th>
            <th>O[P]</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        {#each mapping.edges as edge (edge.id)}
            <tr>
                <td>{edge.id}</td>
                <td>{JSON.stringify(edge.connections.in?.id ?? null)}</td>
                <td>{JSON.stringify(edge.connections.in?.port ?? null)}</td>
                <td>{JSON.stringify(edge.connections.out?.id ?? null)}</td>
                <td>{JSON.stringify(edge.connections.out?.port ?? null)}</td>
                <td>{JSON.stringify(edge.value)}</td>
            </tr>
        {/each}
    </tbody>
</table>

<div class="cc">
    <!-- <span>{i11}</span><input type="checkbox" bind:checked={i11} />
    <span>{i12}</span><input type="checkbox" bind:checked={i12} />
    <span>{i21}</span><input type="checkbox" bind:checked={i21} />
    <span>{i22}</span><input type="checkbox" bind:checked={i22} /> -->
    <span>{i11}</span><input type="range" min={0} max={4} step={1} bind:value={i11} />
    <span>{i12}</span><input type="range" min={0} max={4} step={1} bind:value={i12} />
    <span>{i21}</span><input type="range" min={0} max={4} step={1} bind:value={i21} />
    <span>{i22}</span><input type="range" min={0} max={4} step={1} bind:value={i22} />
</div>

<style>
    .cc {
        display: grid;
        grid-template-columns: 1fr 3fr;
        width: 500px;
    }

    * {
        padding: 0px;
        margin: 0px;
        user-select: none;
    }

    input {
        width: 100%;
    }
</style>
