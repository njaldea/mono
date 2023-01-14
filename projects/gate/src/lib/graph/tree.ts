import { derived, writable, get } from "svelte/store";
import type { Writable, Readable } from "svelte/store";

type Value = number | null;

type EdgeDebug = {
    id: number;
    connections: {
        in: { id: number; port: number } | null;
        out: { id: number; port: number } | null;
    };
    value: Value;
};

type NodeDebug = {
    id: number;
    connections: {
        in: (number | null)[];
        out: number[][];
    };
    values: {
        in: Value[];
        out: Value[];
    };
};

type IEdge = {
    get id(): number;
    value(v: Value): void;
    debug(): EdgeDebug;

    attachI(id: number, port: number): void;
    attachO(id: number, port: number): void;
    detachI(): void;
    detachO(): void;
};

type INode = {
    get id(): number;
    input(port: number, value: Value): void;
    output(port: number): Readable<Value>;
    debug(): NodeDebug;

    attachI(id: number, port: number): void;
    attachO(id: number, port: number): void;
    detachI(port: number): void;
    detachO(id: number, port: number): void;
};

class Edge implements IEdge {
    #id: number;
    #in: { node: INode; port: number } | null;
    #out: { node: INode; port: number } | null;
    #value: Writable<Value>;
    #iunsub: (() => void) | null;
    #ounsub: (() => void) | null;

    #node: (i: number) => INode | null;

    constructor(id: number, node: (i: number) => INode | null) {
        this.#id = id;
        this.#in = null;
        this.#out = null;
        this.#node = node;
        this.#value = writable(null);
        this.#iunsub = null;
        this.#ounsub = null;
    }

    get id() {
        return this.#id;
    }

    value(v: Value) {
        this.#value.set(v);
        this.#out?.node.input(this.#out.port, v);
    }

    attachI(id: number, port: number) {
        {
            const d = this.#in;
            if (null != d) {
                if (id === d.node.id && port === d.port) {
                    return;
                }
                this.#in = null;
                d.node.detachO(this.#id, d.port);
            }
        }

        {
            const d = this.#out;
            if (null != d && id === d.node.id) {
                this.#out = null;
                d.node.detachI(port);
            }
        }

        const node = this.#node(id);
        if (null != node) {
            this.#in = { node, port };
            if (this.#iunsub) {
                this.#iunsub();
            }
            this.#iunsub = node.output(port).subscribe((v) => this.#value.set(v));
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
                this.#out = null;
                d.node.detachI(d.port);
            }
        }

        // check for loop, might need to revisit
        {
            const d = this.#in;
            if (null != d && id === d.node.id) {
                this.#in = null;
                d.node.detachO(this.#id, port);
            }
        }

        const node = this.#node(id);
        if (null != node) {
            this.#out = { node, port };
            if (this.#ounsub) {
                this.#ounsub();
            }
            this.#ounsub = this.#value.subscribe((v) => node.input(port, v));
            this.#out.node.attachI(this.#id, port);
        }
    }

    detachI() {
        const d = this.#in;
        this.#in = null;
        if (this.#iunsub) {
            this.#iunsub();
            this.#iunsub = null;
        }
        if (null != d) {
            d.node.detachO(this.#id, d.port);
        }
    }

    detachO() {
        const d = this.#out;
        this.#out = null;
        if (this.#ounsub) {
            this.#ounsub();
            this.#ounsub = null;
        }
        if (null != d) {
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
        this.#iunsub?.();
        this.#ounsub?.();
    }
}

class Node implements INode {
    #id: number;

    #impl: (...args: Value[]) => Value[];

    #connections: {
        i: (IEdge | null)[];
        o: IEdge[][];
    };

    #inputs: Writable<Value[]>;
    #outputs: Writable<Value[]>;

    #cleanup: () => void;

    #edge: (i: number) => IEdge | null;

    constructor(
        id: number,
        limits: { in: number; out: number },
        impl: (...args: (Value | null)[]) => Value[],
        edge: (i: number) => IEdge | null
    ) {
        this.#id = id;
        this.#impl = impl;

        this.#connections = { i: [], o: [] };
        this.#inputs = writable([]);
        this.#outputs = writable([]);

        this.#edge = edge;

        for (let i = 0; i < limits.in; ++i) {
            this.#inputs.update((v) => [...v, null]);
            this.#connections.i.push(null);
        }

        for (let i = 0; i < limits.out; ++i) {
            this.#outputs.update((v) => [...v, null]);
            this.#connections.o.push([]);
        }

        this.#cleanup = this.#inputs.subscribe(() => {
            const result = this.#impl(...get(this.#inputs));
            this.#outputs.set(result);
        });
    }

    get id() {
        return this.#id;
    }

    output(port: number) {
        return derived(this.#outputs, (v) => v[port]);
    }

    input(port: number, value: Value) {
        this.#inputs.update((v) => {
            v[port] = value;
            return v;
        });
    }

    attachI(id: number, port: number) {
        const edge = this.#connections.i[port];
        this.#connections.i[port] = null;
        if (null != edge) {
            edge.detachO();
        }
        this.#connections.i[port] = this.#edge(id);
    }

    attachO(id: number, port: number) {
        const edges = this.#connections.o[port];
        const edge = edges.find((v) => v.id === id);
        if (null == edge) {
            const target = this.#edge(id);
            if (null != target) {
                this.#connections.o[port].push(target);
            } else {
                console.log(`Missing Edge[${id}]`);
            }
        }
    }

    detachI(port: number) {
        const edge = this.#connections.i[port];
        this.#connections.i[port] = null;
        if (null != edge) {
            edge.detachO();
        }
    }

    detachO(id: number, port: number) {
        const edges = this.#connections.o[port];
        const edge = edges.find((v) => v.id === id);
        if (null != edge) {
            this.#connections.o[port] = this.#connections.o[port].filter((v) => v.id !== id);
            edge.detachI();
        }
    }

    debug() {
        return {
            id: this.#id,
            connections: {
                in: this.#connections.i.map((v) => v?.id ?? null),
                out: this.#connections.o.map((v) => v.map((n) => n.id))
            },
            values: {
                in: get(this.#inputs),
                out: get(this.#outputs)
            }
        };
    }

    dispose() {
        this.#cleanup();
    }
}

export class Tree {
    #gen: number;
    #nodes: Map<number, INode>;
    #edges: Map<number, IEdge>;

    constructor() {
        this.#gen = 0;
        this.#nodes = new Map<number, INode>();
        this.#edges = new Map<number, IEdge>();
    }

    createNode(impl: (...args: Value[]) => Value[], limits: { in: number; out: number }) {
        const node = new Node(this.#gen++, limits, impl, (i: number) => this.getEdge(i) ?? null);
        this.#nodes.set(node.id, node);
        return node as INode;
    }

    getNode(id: number) {
        return this.#nodes.get(id) ?? null;
    }

    removeNode(node: INode) {
        this.#nodes.delete(node.id);
    }

    createEdge() {
        const edge = new Edge(this.#gen++, (i: number) => this.getNode(i) ?? null);
        this.#edges.set(edge.id, edge);
        return edge as IEdge;
    }

    removeEdge(edge: IEdge) {
        this.#edges.delete(edge.id);
    }

    getEdge(id: number) {
        return this.#edges.get(id) ?? null;
    }

    debug() {
        return {
            nodes: [...this.#nodes.entries()].map(([, v]) => v.debug()),
            edges: [...this.#edges.entries()].map(([, v]) => v.debug())
        };
    }

    dispose() {
        [...this.#nodes.values()].map((v) => (v as Node).dispose());
        [...this.#edges.values()].map((v) => (v as Edge).dispose());
    }
}

export function connect(node: INode, i: number, edge: IEdge): void;
export function connect(edge: IEdge, i: number, node: INode): void;
// eslint-disable-next-line func-style
export function connect(f: INode | IEdge, i: number, s: IEdge | INode) {
    if (f instanceof Node && s instanceof Edge) {
        s.attachI(f.id, i);
        return;
    }

    if (f instanceof Edge && s instanceof Node) {
        f.attachO(s.id, i);
        return;
    }
}
