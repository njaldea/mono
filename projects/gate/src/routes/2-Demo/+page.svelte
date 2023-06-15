<!-- prettier-ignore -->
<script lang="ts">
    import { Core } from "$lib/tree/core";
    import { onMount } from "svelte";
    import { debounce, delayed } from "$lib/tree/utils";

    const sut = new Core();
    const debug = sut.debug();

    const impl = (_: string, op: (v1: number, v2: number) => number) => {
        return (v1: number, v2: number) => {
            return [op(v1, v2)] as [number];
        };
    };

    let i11 = 1;
    let i12 = 2;
    let i21 = 3;
    // let i22 = 4;
    $: i22 = i12;

    const input = [
        sut.createNode<[number], [number]>(debounce((...v) => v), { i: [0], o: [0] }), // 0
        sut.createNode<[number], [number]>(delayed((...v) => v), { i: [0], o: [0] }), // 1
        sut.createNode<[number], [number]>((...v) => v, { i: [0], o: [0] }), // 2
        sut.createNode<[number], [number]>((...v) => v, { i: [0], o: [0] }), // 3
    ];

    const node = [
        sut.createNode<[number, number], [number]>(impl("a", (v1, v2) => v1 + v2), { i: [0, 0], o: [0] }), // 4
        sut.createNode<[number, number], [number]>(impl("s", (v1, v2) => v1 - v2), { i: [0, 0], o: [0] }), // 5
        sut.createNode<[number, number], [number]>(impl("m", (v1, v2) => v1 * v2), { i: [0, 0], o: [0] }), // 6
    ];

    const inEdge = [
        sut.createEdge<number>(0), // 7
        sut.createEdge<number>(0), // 8
        sut.createEdge<number>(0), // 9
        sut.createEdge<number>(0), // 10
    ];

    const v1 = inEdge[0].output();
    const v2 = inEdge[1].output();
    const v3 = inEdge[2].output();
    const v4 = inEdge[3].output();

    const edge = [
        sut.createEdge<number>(0), // 11
        sut.createEdge<number>(0), // 12
    ];

    const edgeo = sut.createEdge<number>(0); // 13
    const nodeo = sut.createNode<[number], [number]>((v: number) => [v], { i: [0], o: [0] }); // 14

    $: input[0].input(0, i11);
    $: input[1].input(0, i12);
    $: input[2].input(0, i21);
    $: input[3].input(0, i22);

    const value = nodeo.output(0);

    const click = (flag: number) => {
        switch (flag) {
            case 0:
                sut.connectNE(input[0], 0, inEdge[0]); //  0 0  7
                sut.connectNE(input[1], 0, inEdge[1]); //  1 0  8
                sut.connectNE(input[2], 0, inEdge[2]); //  2 0  9
                sut.connectNE(input[1], 0, inEdge[3]); //  1 0 10
                // sut.connectNE(input4_03, 0, in4____10); //  3 0 10
                sut.connectEN(inEdge[0], 0, node[0]); //  7 0  4
                sut.connectEN(inEdge[1], 1, node[0]); //  8 1  4
                sut.connectEN(inEdge[2], 0, node[1]); //  9 0  5
                sut.connectEN(inEdge[3], 1, node[1]); // 10 1  5
                sut.connectNE(node[0], 0, edge[0]); //  4 0 11
                sut.connectNE(node[1], 0, edge[1]); //  5 0  2
                sut.connectEN(edge[0], 0, node[2]); // 11 0  6
                sut.connectEN(edge[1], 1, node[2]); // 12 1  6
                sut.connectNE(node[2], 0, edgeo); //  6 0 13
                sut.connectEN(edgeo, 0, nodeo); // 13 0 14
                break;
            case 1:
                sut.connectNE(input[0], 0, inEdge[0]); //  0 0  7
                sut.connectNE(input[1], 0, inEdge[1]); //  1 0  8
                sut.connectNE(input[2], 0, inEdge[2]); //  2 0  9
                sut.connectNE(input[1], 0, inEdge[3]); //  1 0 10
                // sut.connect(input4_03, 0, in4____10); //  3 0 10
                sut.connectEN(inEdge[0], 0, node[0]); //  7 0  4
                sut.connectEN(inEdge[1], 1, node[0]); //  8 1  4
                sut.connectEN(inEdge[2], 0, node[1]); //  9 0  5
                sut.connectEN(inEdge[3], 1, node[1]); // 10 1  5
                sut.connectNE(node[0], 0, edge[0]); //  4 0 11
                sut.connectNE(node[1], 0, edge[1]); //  5 0 12
                sut.connectEN(edge[0], 1, node[2]); // 11 1  6
                sut.connectEN(edge[1], 0, node[2]); // 12 0  6
                sut.connectNE(node[2], 0, edgeo); //  6 0 13
                sut.connectEN(edgeo, 0, nodeo); // 13 0 14
                break;
            case 2:
                sut.connectNE(input[0], 0, inEdge[0]); //  0 0  7
                sut.connectNE(input[1], 0, inEdge[1]); //  1 0  8
                sut.connectNE(input[2], 0, inEdge[2]); //  2 0  9
                sut.connectNE(input[1], 0, inEdge[3]); //  1 0 10
                // sut.connect(input4_03, 0, in4____10); //  3 0 10
                sut.connectEN(inEdge[0], 0, node[0]); //  7 0  4
                sut.connectEN(inEdge[1], 1, node[0]); //  8 1  4
                sut.connectEN(inEdge[2], 0, node[2]); //  9 0  6
                sut.connectEN(inEdge[3], 1, node[2]); // 10 1  6
                sut.connectNE(node[0], 0, edge[0]); //  4 0 11
                sut.connectNE(node[2], 0, edge[1]); //  6 0 12
                sut.connectEN(edge[0], 0, node[1]); // 11 0  5
                sut.connectEN(edge[1], 1, node[1]); // 12 1  5
                sut.connectNE(node[1], 0, edgeo); //  5 0 13
                sut.connectEN(edgeo, 0, nodeo); // 13 0 14
                break;
            case 3:
                sut.connectNE(input[0], 0, inEdge[0]); //  0 0  7
                sut.connectNE(input[1], 0, inEdge[1]); //  1 0  8
                sut.connectNE(input[2], 0, inEdge[2]); //  2 0  9
                sut.connectNE(input[1], 0, inEdge[3]); //  1 0 10
                // sut.connect(input4_03, 0, in4____10); //  3 0 10
                sut.connectEN(inEdge[0], 0, node[2]); //  7 0  6
                sut.connectEN(inEdge[1], 1, node[2]); //  8 1  6
                sut.connectEN(inEdge[2], 0, node[1]); //  9 0  5
                sut.connectEN(inEdge[3], 1, node[1]); // 10 1  5
                sut.connectNE(node[2], 0, edge[0]); //  6 0 11
                sut.connectNE(node[1], 0, edge[1]); //  5 0 12
                sut.connectEN(edge[0], 0, node[0]); // 11 0 13
                sut.connectEN(edge[1], 1, node[0]); // 12 1 13
                sut.connectNE(node[0], 0, edgeo); //  4 0 13
                sut.connectEN(edgeo, 0, nodeo); // 13 0 14
                break;
        }
        debug.update();
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
            default:
                return "invalid case";
        }
    };

    const indices = 4;
    const skip = 0;
    const initial = 0;
    let index = click(initial);

    onMount(() => {
        const unsub = value.subscribe(() => debug.update());
        return () => (unsub(),  sut.dispose());
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
                <td>{text1(index, $v1, $v2, $v3, $v4)}</td>
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
                    <td>{JSON.stringify(node.connections.i)}</td>
                    <td>{JSON.stringify(node.connections.o)}</td>
                    <td>{JSON.stringify(node.values.i)}</td>
                    <td>{JSON.stringify(node.values.o)}</td>
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
                    <td>{JSON.stringify(edge.connections.i?.id ?? null)}</td>
                    <td>{JSON.stringify(edge.connections.i?.port ?? null)}</td>
                    <td>{JSON.stringify(edge.connections.o?.id ?? null)}</td>
                    <td>{JSON.stringify(edge.connections.o?.port ?? null)}</td>
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
