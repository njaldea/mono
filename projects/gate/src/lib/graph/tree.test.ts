import { Tree, connect } from "./tree";

import { get } from "svelte/store";

import { describe, it, expect } from "vitest";

const impl = (tag: string) => {
    return (v1: number | null, v2: number | null) => {
        const result = [(v1 ?? 0) + (v2 ?? 0)];
        console.log(tag, result);
        return result;
    };
};

describe("Tree", () => {
    it("Basic", () => {
        const sut = new Tree();

        const adder11 = sut.createNode(impl("adder11"), { in: 2, out: 1 });
        const adder12 = sut.createNode(impl("adder12"), { in: 2, out: 1 });

        const adder2 = sut.createNode(impl("adder2"), { in: 2, out: 1 });
        const edge112 = sut.createEdge();
        const edge122 = sut.createEdge();

        connect(adder11, 0, edge112);
        connect(adder12, 0, edge122);
        connect(edge112, 0, adder2);
        connect(edge122, 1, adder2);

        adder11.input(0, 100);
        adder11.input(1, 200);
        adder12.input(0, 10);
        adder12.input(1, 20);

        console.log(get(adder2.output(0)));
    });
});
