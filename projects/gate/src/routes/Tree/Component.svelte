<script lang="ts">
    import { Tree } from "$lib/graph/tree";
    import { onMount } from "svelte";
    import { debounce, delayed } from "$lib/graph/utils";

    const sut = new Tree();
    const defaults = 0;
    type Value = number | null;

    const impl = (tag: string, op: (v1: number, v2: number) => number) => {
        return (v1: Value, v2: Value) => {
            return [op(v1 ?? defaults, v2 ?? defaults)];
        };
    };

    const input1_00 = sut.createNode(
        debounce((v) => [v ?? defaults]),
        { in: 1, out: 1 }
    ); // id 0
    const input2_01 = sut.createNode(
        delayed((v) => [v ?? defaults]),
        { in: 1, out: 1 }
    ); // id 1
    // const input1_00 = sut.createNode((v) => [v ?? defaults], { in: 1, out: 1 }); // id 0
    // const input2_01 = sut.createNode((v) => [v ?? defaults], { in: 1, out: 1 }); // id 1
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

    const v1 = in1____07.output();
    const v2 = in2____08.output();
    const v3 = in3____09.output();
    const v4 = in4____10.output();

    const edge1__11 = sut.createEdge(); // id 11
    const edge2__12 = sut.createEdge(); // id 12

    const edgeo__13 = sut.createEdge(); // id 13
    const nodeo__14 = sut.createNode((v) => [v ?? defaults], { in: 1, out: 1 }); // 14

    let i11 = 1;
    let i12 = 2;
    let i21 = 3;
    // let i22 = 4;
    $: i22 = i12;

    $: input1_00.input(0, i11);
    $: input2_01.input(0, i12);
    $: input3_02.input(0, i21);
    $: input4_03.input(0, i22);

    const value = nodeo__14.output(0);

    const click = (flag: number) => {
        switch (flag) {
            case 0:
                sut.connect(input1_00, 0, in1____07); //  0 0  7
                sut.connect(input2_01, 0, in2____08); //  1 0  8
                sut.connect(input3_02, 0, in3____09); //  2 0  9
                sut.connect(input2_01, 0, in4____10); //  1 0  10
                // sut.connect(input4_03, 0, in4____10); //  3 0 10
                sut.connect(in1____07, 0, node1__04); //  7 0  4
                sut.connect(in2____08, 1, node1__04); //  8 1  4
                sut.connect(in3____09, 0, node2__05); //  9 0  5
                sut.connect(in4____10, 1, node2__05); // 10 1  5
                sut.connect(node1__04, 0, edge1__11); //  4 0 11
                sut.connect(node2__05, 0, edge2__12); //  5 0  2
                sut.connect(edge1__11, 0, node3__06); // 11 0  6
                sut.connect(edge2__12, 1, node3__06); // 12 1  6
                sut.connect(node3__06, 0, edgeo__13); //  6 0 13
                sut.connect(edgeo__13, 0, nodeo__14); // 13 0 14
                break;
            case 1:
                sut.connect(input1_00, 0, in1____07); //  0 0  7
                sut.connect(input2_01, 0, in2____08); //  1 0  8
                sut.connect(input3_02, 0, in3____09); //  2 0  9
                sut.connect(input2_01, 0, in4____10); //  1 0  10
                // sut.connect(input4_03, 0, in4____10); //  3 0 10
                sut.connect(in1____07, 0, node1__04); //  7 0  4
                sut.connect(in2____08, 1, node1__04); //  8 1  4
                sut.connect(in3____09, 0, node2__05); //  9 0  5
                sut.connect(in4____10, 1, node2__05); // 10 1  5
                sut.connect(node1__04, 0, edge1__11); //  4 0 11
                sut.connect(node2__05, 0, edge2__12); //  5 0 12
                sut.connect(edge1__11, 1, node3__06); // 11 1  6
                sut.connect(edge2__12, 0, node3__06); // 12 0  6
                sut.connect(node3__06, 0, edgeo__13); //  6 0 13
                sut.connect(edgeo__13, 0, nodeo__14); // 13 0 14
                break;
            case 2:
                sut.connect(input1_00, 0, in1____07); //  0 0  7
                sut.connect(input2_01, 0, in2____08); //  1 0  8
                sut.connect(input3_02, 0, in3____09); //  2 0  9
                sut.connect(input2_01, 0, in4____10); //  1 0  10
                // sut.connect(input4_03, 0, in4____10); //  3 0 10
                sut.connect(in1____07, 0, node1__04); //  7 0  4
                sut.connect(in2____08, 1, node1__04); //  8 1  4
                sut.connect(in3____09, 0, node3__06); //  9 0  6
                sut.connect(in4____10, 1, node3__06); // 10 1  6
                sut.connect(node1__04, 0, edge1__11); //  4 0 11
                sut.connect(node3__06, 0, edge2__12); //  6 0 12
                sut.connect(edge1__11, 0, node2__05); // 11 0  5
                sut.connect(edge2__12, 1, node2__05); // 12 1  5
                sut.connect(node2__05, 0, edgeo__13); //  5 0 13
                sut.connect(edgeo__13, 0, nodeo__14); // 13 0 14
                break;
            case 3:
                sut.connect(input1_00, 0, in1____07); //  0 0  7
                sut.connect(input2_01, 0, in2____08); //  1 0  8
                sut.connect(input3_02, 0, in3____09); //  2 0  9
                sut.connect(input2_01, 0, in4____10); //  1 0  10
                // sut.connect(input4_03, 0, in4____10); //  3 0 10
                sut.connect(in1____07, 0, node3__06); //  7 0  6
                sut.connect(in2____08, 1, node3__06); //  8 1  6
                sut.connect(in3____09, 0, node2__05); //  9 0  5
                sut.connect(in4____10, 1, node2__05); // 10 1  5
                sut.connect(node3__06, 0, edge1__11); //  6 0 11
                sut.connect(node2__05, 0, edge2__12); //  5 0 12
                sut.connect(edge1__11, 0, node1__04); // 11 0 13
                sut.connect(edge2__12, 1, node1__04); // 12 1 13
                sut.connect(node1__04, 0, edgeo__13); //  4 0 13
                sut.connect(edgeo__13, 0, nodeo__14); // 13 0 14
                break;
        }
        sut.debugUpdate();
        return flag;
    };
    const text1 = (n: number, v1: number, v2: number, v3: number, v4: number) => {
        switch (n) {
            case 0:
                return `(${v1} + ${v2}) * (${v3} - ${v4}) = (${v1 + v2}) * (${v3 - v4}) = ${
                    (v1 + v2) * (v3 - v4)
                }`;
            case 1:
                return `(${v3} - ${v4}) * (${v1} + ${v2}) = (${v3 - v4}) * (${v1 + v2}) = ${
                    (v1 + v2) * (v3 - v4)
                }`;
            case 2:
                return `(${v1} + ${v2}) - (${v3} * ${v4}) = (${v1 + v2}) - (${v3 * v4}) = ${
                    v1 + v2 - v3 * v4
                }`;
            case 3:
                return `(${v1} * ${v2}) + (${v3} - ${v4}) = (${v1 * v2}) + (${v3 - v4}) = ${
                    v1 * v2 + (v3 - v4)
                }`;
        }
    };

    const indices = 4;
    export let skip = 0;
    export let initial: number;
    let index = click(initial);

    const debug = sut.debug();

    onMount(() => {
        const unsub = value.subscribe(() => {
            sut.debugUpdate();
        });
        return () => {
            unsub();
            sut.dispose();
        };
    });
</script>

<div class="connections">
    <table>
        <tbody>
            <tr>
                <td>
                    <button
                        on:click={() =>
                            (index = click(((index + 1 - skip) % (indices - skip)) + skip))}
                        >{index}</button
                    >
                </td>
                <td>{$value}</td>
                <td />
            </tr>
            <tr>
                <td>a</td>
                <td><span>{i11}</span></td>
                <td><input type="range" min={0} max={4} step={1} bind:value={i11} /></td>
            </tr>
            <tr>
                <td>b</td>
                <td><span>{i12}</span></td>
                <td><input type="range" min={0} max={4} step={1} bind:value={i12} /></td>
            </tr>
            <tr>
                <td>c</td>
                <td><span>{i21}</span></td>
                <td><input type="range" min={0} max={4} step={1} bind:value={i21} /></td>
            </tr>
            <!-- <tr>
                <td>d</td>
                <td><span>{i22}</span></td>
                <td><input type="range" min={0} max={4} step={1} bind:value={i22} /></td>
            </tr> -->
            <tr>
                <td>result</td>
                <td />
                <td
                    >{text1(
                        index,
                        $v1 ?? defaults,
                        $v2 ?? defaults,
                        $v3 ?? defaults,
                        $v4 ?? defaults
                    )}</td
                >
            </tr>
        </tbody>
    </table>
</div>

<div class="connections two">
    <table>
        <thead>
            <tr>
                <th>NODE ID</th>
                <th>IN</th>
                <th>OUT</th>
                <th>IN[v]</th>
                <th>OUT[v]</th>
            </tr>
        </thead>
        <tbody>
            {#each $debug.nodes as node (node.id)}
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
    <table>
        <thead>
            <tr>
                <th>EDGE ID</th>
                <th>I</th>
                <th>I[P]</th>
                <th>O</th>
                <th>O[P]</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            {#each $debug.edges as edge (edge.id)}
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
</div>

<style>
    * {
        padding: 0px;
        margin: 0px;
        user-select: none;
    }

    span {
        display: block;
        width: 20px;
    }

    td {
        text-align: center;
    }

    input {
        width: 300px;
    }

    button {
        width: 100%;
        height: 100%;
    }

    .connections {
        display: grid;
        grid-template-columns: 1fr;
        place-items: center;
    }
    .connections.two {
        grid-template-columns: 1fr 1fr;
    }
</style>
