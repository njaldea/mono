import { writable, get } from "svelte/store";
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
        out: (number | null)[];
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

    detachI(id: number, port: number): void;
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
                d.node.detachO(this.#id, port);
            }
        }

        {
            const d = this.#out;
            if (null != d && id === d.node.id) {
                this.#out = null;
                d.node.detachI(this.#id, port);
            }
        }

        const node = this.#node(id);
        if (null != node) {
            this.#in = { node, port };
            if (this.#iunsub) {
                this.#iunsub();
            }
            this.#iunsub = node.output(port).subscribe((v) => this.#value.set(v));
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
                d.node.detachI(this.#id, port);
            }
        }

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
            d.node.detachI(this.#id, d.port);
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
}

// const matches = (l: Value[], r: Value[]) => {
//     if (l === r) return true;
//     if (l.length !== r.length) return false;
//     for (let i = 0; i < l.length; i++) {
//         if (l[i] !== r[i]) return false;
//     }
//     return true;
// };

class Node implements INode {
    #id: number;

    #impl: (...args: Value[]) => Value[];

    #connections: {
        i: (IEdge | null)[];
        o: (IEdge | null)[];
    };

    #inputs: Writable<Value>[];
    #outputs: Writable<Value>[];

    #cleanup: (() => void)[];

    constructor(
        id: number,
        limits: { in: number; out: number },
        impl: (...args: (Value | null)[]) => Value[],
        edge: (i: number) => IEdge | null
    ) {
        this.#id = id;
        this.#impl = impl;
        this.#cleanup = [];

        this.#connections = { i: [], o: [] };
        this.#inputs = [];
        this.#outputs = [];

        for (let i = 0; i < limits.in; ++i) {
            const w = writable<Value | null>(null);
            this.#cleanup.push(
                w.subscribe(() => {
                    const result = this.#impl(...this.#inputs.map(get));
                    for (let i = 0; i < this.#outputs.length; ++i) {
                        this.#outputs[i].set(result[i]);
                    }
                })
            );
            this.#inputs.push(w);
            this.#connections.i.push(null);
        }

        for (let i = 0; i < limits.out; ++i) {
            this.#outputs.push(writable());
            this.#connections.o.push(null);
        }
    }

    get id() {
        return this.#id;
    }

    output(port: number) {
        return this.#outputs[port];
    }

    input(port: number, value: Value) {
        if (port < this.#inputs.length) {
            this.#inputs[port].set(value);
        }
    }

    detachI(id: number, port: number) {
        const edge = this.#connections.i[port];
        this.#connections.i[port] = null;
        if (null != edge) {
            edge.detachO();
        }
    }

    detachO(id: number, port: number) {
        const edge = this.#connections.o[port];
        this.#connections.o[port] = null;
        if (null != edge) {
            edge.detachI();
        }
    }

    debug() {
        return {
            id: this.#id,
            connections: {
                in: this.#connections.i.map((v) => v?.id ?? null),
                out: this.#connections.i.map((v) => v?.id ?? null)
            },
            values: {
                in: this.#inputs.map(get),
                out: this.#outputs.map(get)
            }
        };
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
