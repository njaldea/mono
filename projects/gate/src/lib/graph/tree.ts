import { derived, writable, get } from "svelte/store";
import type { Writable, Readable } from "svelte/store";

import type { Value, TreeDebug, EdgeDebug, NodeDebug } from "./types";

type Edge = {
    get id(): number;
    value(v: Value): void;
    output(): Readable<Value>;
};

type EdgeI = Edge & {
    debug(): EdgeDebug;
    attachI(id: number, port: number): void;
    attachO(id: number, port: number): void;
    detachI(): void;
    detachO(): void;
    dispose(): void;
};

type Node = {
    get id(): number;
    input(port: number, value: Value): void;
    output(port: number): Readable<Value>;
};

type NodeI = Node & {
    debug(): NodeDebug;
    attachI(id: number, port: number): void;
    attachO(id: number, port: number): void;
    detachI(port: number): void;
    detachO(id: number, port: number): void;
    dispose(): void;
};

type Impl = (...args: Value[]) => Promise<Value[]> | Value[];

class EdgeImpl implements EdgeI {
    #id: number;
    #in: { node: NodeI; port: number; unsub: () => void } | null;
    #out: { node: NodeI; port: number; unsub: () => void } | null;
    #value: Writable<Value>;

    #node: (i: number) => NodeI | null;

    constructor(id: number, node: (i: number) => NodeI | null) {
        this.#id = id;
        this.#in = null;
        this.#out = null;
        this.#node = node;
        this.#value = writable(null);
    }

    get id() {
        return this.#id;
    }

    value(v: Value) {
        this.#value.set(v);
        this.#out?.node.input(this.#out.port, v);
    }

    output() {
        return derived(this.#value, (v) => v);
    }

    attachI(id: number, port: number) {
        {
            const d = this.#in;
            if (null != d) {
                if (id === d.node.id && port === d.port) {
                    return;
                }
                this.detachI();
            }
        }

        // check for loop, might need to revisit
        {
            const d = this.#out;
            if (null != d && id === d.node.id) {
                this.detachO();
            }
        }

        const node = this.#node(id);
        if (null != node) {
            const unsub = node.output(port).subscribe((v) => this.#value.set(v));
            this.#in = { node, port, unsub };
            this.#in.node.attachO(this.#id, port);
        }
    }

    attachO(id: number, port: number) {
        {
            const d = this.#out;
            if (null != d) {
                if (id === d.node.id && port === d.port) {
                    return;
                }
                this.detachO();
            }
        }

        // check for loop, might need to revisit
        {
            const d = this.#in;
            if (null != d && id === d.node.id) {
                this.detachI();
            }
        }

        const node = this.#node(id);
        if (null != node) {
            const unsub = this.#value.subscribe((v) => node.input(port, v));
            this.#out = { node, port, unsub };
            this.#out.node.attachI(this.#id, port);
        }
    }

    detachI() {
        const d = this.#in;
        this.#in = null;
        if (null != d) {
            d.unsub();
            d.node.detachO(this.#id, d.port);
        }
    }

    detachO() {
        const d = this.#out;
        this.#out = null;
        if (null != d) {
            d.unsub();
            d.node.detachI(d.port);
        }
    }

    debug(): EdgeDebug {
        return {
            id: this.#id,
            connections: {
                in: this.#in ? { id: this.#in.node.id, port: this.#in.port } : null,
                out: this.#out ? { id: this.#out.node.id, port: this.#out.port } : null
            },
            value: get(this.#value)
        };
    }

    dispose() {
        this.detachO();
        this.detachI();
    }
}

class NodeImpl implements NodeI {
    #id: number;
    #impl: Impl;
    #ci: (EdgeI | null)[];
    #co: EdgeI[][];
    #vi: Writable<Value[]>;
    #vo: Writable<Value[]>;

    #cleanup: () => void;
    #edge: (i: number) => EdgeI | null;

    constructor(
        id: number,
        limits: { in: number; out: number },
        impl: Impl,
        edge: (i: number) => EdgeI | null
    ) {
        this.#id = id;
        this.#impl = impl;

        this.#ci = [];
        this.#co = [];
        this.#vi = writable([]);
        this.#vo = writable([]);

        this.#edge = edge;

        for (let i = 0; i < limits.in; ++i) {
            this.#vi.update((v) => [...v, null]);
            this.#ci.push(null);
        }

        for (let i = 0; i < limits.out; ++i) {
            this.#vo.update((v) => [...v, null]);
            this.#co.push([]);
        }

        this.#cleanup = this.#vi.subscribe((v) => {
            Promise.resolve(this.#impl(...v))
                .then((r) => this.#vo.set(r))
                .catch((e) => console.log(e));
        });
    }

    get id() {
        return this.#id;
    }

    output(port: number) {
        return derived(this.#vo, (v) => v[port]);
    }

    input(port: number, value: Value) {
        if (port < this.#ci.length) {
            this.#vi.update((v) => {
                v[port] = value;
                return v;
            });
        }
    }

    attachI(id: number, port: number) {
        const edge = this.#ci[port];
        this.#ci[port] = null;
        if (null != edge) {
            edge.detachO();
        }
        this.#ci[port] = this.#edge(id);
    }

    attachO(id: number, port: number) {
        const edges = this.#co[port];
        const edge = edges.find((v) => v.id === id);
        if (null == edge) {
            const target = this.#edge(id);
            if (null != target) {
                this.#co[port].push(target);
            } else {
                console.log(`Missing Edge[${id}]`);
            }
        }
    }

    detachI(port: number) {
        const edge = this.#ci[port];
        this.#ci[port] = null;
        if (null != edge) {
            edge.detachO();
        }
    }

    detachO(id: number, port: number) {
        const edges = this.#co[port];
        const edge = edges.find((v) => v.id === id);
        if (null != edge) {
            this.#co[port] = this.#co[port].filter((v) => v.id !== id);
            edge.detachI();
        }
    }

    debug() {
        return {
            id: this.#id,
            connections: {
                in: this.#ci.map((v) => v?.id ?? null),
                out: this.#co.map((v) => v.map((n) => n.id))
            },
            values: {
                in: get(this.#vi),
                out: get(this.#vo)
            }
        };
    }

    dispose() {
        this.#cleanup();
    }
}

export class Tree {
    #gen: number;
    #nodes: Map<number, NodeI>;
    #edges: Map<number, EdgeI>;

    #debugger: Writable<TreeDebug>;

    constructor() {
        this.#gen = 0;
        this.#nodes = new Map<number, NodeI>();
        this.#edges = new Map<number, EdgeI>();

        this.#debugger = writable({ nodes: [], edges: [] });
    }

    createNode(impl: Impl, limits: { in: number; out: number }) {
        const node = new NodeImpl(
            this.#gen++,
            limits,
            impl,
            (i: number) => this.getEdge(i) ?? null
        );
        this.#nodes.set(node.id, node);
        return node as Node;
    }

    getNode(id: number) {
        return this.#nodes.get(id) ?? null;
    }

    removeNode(node: Node) {
        this.#nodes.delete(node.id);
    }

    createEdge() {
        const edge = new EdgeImpl(this.#gen++, (i: number) => this.getNode(i) ?? null);
        this.#edges.set(edge.id, edge);
        return edge as Edge;
    }

    removeEdge(edge: Edge) {
        this.#edges.delete(edge.id);
    }

    getEdge(id: number) {
        return this.#edges.get(id) ?? null;
    }

    connect(node: Node, port: number, edge: Edge): void;
    connect(edge: Edge, port: number, node: Node): void;
    connect(node: null, port: null, edge: Edge): void;
    connect(edge: Edge, port: null, node: null): void;
    connect(a: Node | Edge | null, port: number | null, b: Edge | Node | null) {
        if (null == port) {
            if (null == a && b instanceof EdgeImpl) {
                b.detachI();
            } else if (a instanceof EdgeImpl && null != b) {
                a.detachO();
            }
        } else if (a instanceof NodeImpl && b instanceof EdgeImpl) {
            if (this.#nodes.has(a.id) && this.#edges.has(b.id)) {
                b.attachI(a.id, port);
            } else {
                throw new Error(
                    `Node[${a.id}] and/or Edge[${b.id}] does not belong to the right tree.`
                );
            }
        } else if (a instanceof EdgeImpl && b instanceof NodeImpl) {
            if (this.#edges.has(a.id) && this.#nodes.has(b.id)) {
                a.attachO(b.id, port);
            } else {
                throw new Error(
                    `Node[${b.id}] and/or Edge[${a.id}] does not belong to the right tree.`
                );
            }
        }
        this.debugUpdate();
    }

    dispose() {
        [...this.#nodes.values()].forEach((v) => v.dispose());
        this.#nodes.clear();
        [...this.#edges.values()].forEach((v) => v.dispose());
        this.#edges.clear();
    }

    debugUpdate() {
        this.#debugger.set({
            nodes: [...this.#nodes.entries()].map(([, v]) => v.debug()),
            edges: [...this.#edges.entries()].map(([, v]) => v.debug())
        });
    }

    debug() {
        return derived(this.#debugger, (v) => v);
    }
}
