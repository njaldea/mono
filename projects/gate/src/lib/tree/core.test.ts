/* eslint-disable camelcase */

import { Core } from "./core";
import { get } from "svelte/store";
import { describe, it } from "vitest";

// prettier-ignore
describe("Tree", () => {
    it("Basic", () => {
        const sut = new Core();

        type OP = (v1: number, v2: number) => [number];
        const impl = (): OP => (v1, v2) => [v1 + v2];

        const adder11 = sut.createNode<[number, number], [number]>(impl(), { i: [0, 0], o: [0] });
        const adder12 = sut.createNode<[number, number], [number]>(impl(), { i: [0, 0], o: [0] });

        const adder2 = sut.createNode<[number, number], [number]>(impl(), { i: [0, 0], o: [0] });
        const edge112 = sut.createEdge(0);
        const edge122 = sut.createEdge(0);

        sut.connectNE(adder11, 0, edge112);
        sut.connectNE(adder12, 0, edge122);
        sut.connectEN(edge112, 0, adder2);
        sut.connectEN(edge122, 1, adder2);

        adder11.input(0, 100);
        adder11.input(1, 200);
        adder12.input(0, 10);
        adder12.input(1, 20);

        console.log(get(adder2.output(0)));
    });

    it("Reconnections", () => {
        const sut = new Core();

        type OP<T> = (v1: number, v2: number) => T;
        type Impl = (tag: string, op: OP<number>) => OP<[number]>;
        const impl: Impl = (_, op) => (v1, v2) => [op(v1, v2)];

        const input1_00 = sut.createNode<[number], [number]>((v: number) => [v] as [number], { i: [0], o: [0] });
        const input2_01 = sut.createNode<[number], [number]>((v: number) => [v] as [number], { i: [0], o: [0] });
        const input3_02 = sut.createNode<[number], [number]>((v: number) => [v] as [number], { i: [0], o: [0] });
        const input4_03 = sut.createNode<[number], [number]>((v: number) => [v] as [number], { i: [0], o: [0] });

        const node1__04 = sut.createNode<[number, number], [number]>(impl("a", (v1, v2) => v1 + v2), { i: [0, 0], o: [0] });
        const node2__05 = sut.createNode<[number, number], [number]>(impl("s", (v1, v2) => v1 - v2), { i: [0, 0], o: [0] });
        const node3__06 = sut.createNode<[number, number], [number]>(impl("m", (v1, v2) => v1 * v2), { i: [0, 0], o: [0] });

        const in1____07 = sut.createEdge(0);
        const in2____08 = sut.createEdge(0);
        const in3____09 = sut.createEdge(0);
        const in4____10 = sut.createEdge(0);

        const edge1__11 = sut.createEdge(0);
        const edge2__12 = sut.createEdge(0);

        const edgeo__13 = sut.createEdge(0);
        const nodeo__14 = sut.createNode<[number], [number]>((v: number) => [v] as [number], { i: [0], o: [0] });

        input1_00.input(0, 1);
        input2_01.input(0, 2);
        input3_02.input(0, 3);
        input4_03.input(0, 4);

        sut.connectNE(input1_00, 0, in1____07); //  0 0  7
        sut.connectNE(input2_01, 0, in2____08); //  1 0  8
        sut.connectNE(input3_02, 0, in3____09); //  2 0  9
        sut.connectNE(input2_01, 0, in4____10); //  1 0  10
        // sut.connectNE(input4_03, 0, in4____10); //  3 0 10
        sut.connectEN(in1____07, 0, node1__04); //  7 0  4
        sut.connectEN(in2____08, 1, node1__04); //  8 1  4
        sut.connectEN(in3____09, 0, node2__05); //  9 0  5
        sut.connectEN(in4____10, 1, node2__05); // 10 1  5
        sut.connectNE(node1__04, 0, edge1__11); //  4 0 11
        sut.connectNE(node2__05, 0, edge2__12); //  5 0  2
        sut.connectEN(edge1__11, 0, node3__06); // 11 0  6
        sut.connectEN(edge2__12, 1, node3__06); // 12 1  6
        sut.connectNE(node3__06, 0, edgeo__13); //  6 0 13
        sut.connectEN(edgeo__13, 0, nodeo__14); // 13 0 14

        sut.connectNE(input1_00, 0, in1____07); //  0 0  7
        sut.connectNE(input2_01, 0, in2____08); //  1 0  8
        sut.connectNE(input3_02, 0, in3____09); //  2 0  9
        sut.connectNE(input2_01, 0, in4____10); //  1 0  10
        // sut.connect(input4_03, 0, in4____10); //  3 0 10
        sut.connectEN(in1____07, 0, node1__04); //  7 0  4
        sut.connectEN(in2____08, 1, node1__04); //  8 1  4
        sut.connectEN(in3____09, 0, node2__05); //  9 0  5
        sut.connectEN(in4____10, 1, node2__05); // 10 1  5
        sut.connectNE(node1__04, 0, edge1__11); //  4 0 11
        sut.connectNE(node2__05, 0, edge2__12); //  5 0 12
        sut.connectEN(edge1__11, 1, node3__06); // 11 1  6
        sut.connectEN(edge2__12, 0, node3__06); // 12 0  6
        sut.connectNE(node3__06, 0, edgeo__13); //  6 0 13
        sut.connectEN(edgeo__13, 0, nodeo__14); // 13 0 14

        sut.connectNE(input1_00, 0, in1____07); //  0 0  7
        sut.connectNE(input2_01, 0, in2____08); //  1 0  8
        sut.connectNE(input3_02, 0, in3____09); //  2 0  9
        sut.connectNE(input2_01, 0, in4____10); //  1 0  10
        // sut.connect(input4_03, 0, in4____10); //  3 0 10
        sut.connectEN(in1____07, 0, node1__04); //  7 0  4
        sut.connectEN(in2____08, 1, node1__04); //  8 1  4
        sut.connectEN(in3____09, 0, node3__06); //  9 0  6
        sut.connectEN(in4____10, 1, node3__06); // 10 1  6
        sut.connectNE(node1__04, 0, edge1__11); //  4 0 11
        sut.connectNE(node3__06, 0, edge2__12); //  6 0 12
        sut.connectEN(edge1__11, 0, node2__05); // 11 0  5
        sut.connectEN(edge2__12, 1, node2__05); // 12 1  5
        sut.connectNE(node2__05, 0, edgeo__13); //  5 0 13
        sut.connectEN(edgeo__13, 0, nodeo__14); // 13 0 14

        sut.connectNE(input1_00, 0, in1____07); //  0 0  7
        sut.connectNE(input2_01, 0, in2____08); //  1 0  8
        sut.connectNE(input3_02, 0, in3____09); //  2 0  9
        sut.connectNE(input2_01, 0, in4____10); //  1 0  10
        // sut.connect(input4_03, 0, in4____10); //  3 0 10
        sut.connectEN(in1____07, 0, node3__06); //  7 0  6
        sut.connectEN(in2____08, 1, node3__06); //  8 1  6
        sut.connectEN(in3____09, 0, node2__05); //  9 0  5
        sut.connectEN(in4____10, 1, node2__05); // 10 1  5
        sut.connectNE(node3__06, 0, edge1__11); //  6 0 11
        sut.connectNE(node2__05, 0, edge2__12); //  5 0 12
        sut.connectEN(edge1__11, 0, node1__04); // 11 0 13
        sut.connectEN(edge2__12, 1, node1__04); // 12 1 13
        sut.connectNE(node1__04, 0, edgeo__13); //  4 0 13
        sut.connectEN(edgeo__13, 0, nodeo__14); // 13 0 14

        sut.dispose();
    });
});
