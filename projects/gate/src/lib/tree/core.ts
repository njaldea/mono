import { derived, writable, get } from "svelte/store";
import type { Writable, Readable } from "svelte/store";
import type { TreeDebug, EdgeDebug, NodeDebug } from "./debug";
import type { KnownLength, ValidIndex, WithinLength } from "./types";

export type Edge<TYPE> = {
    get id(): number;
    input(value: TYPE): void;
    output(): Readable<TYPE>;
};

export type Node<IN extends unknown[], OUT extends unknown[]> = {
    get id(): number;
    input<PORT extends number>(port: WithinLength<IN, PORT>, value: IN[PORT]): void;
    output<PORT extends number>(port: WithinLength<OUT, PORT>): Readable<OUT[PORT]>;
};

type EdgeI<TYPE> = Edge<TYPE> & {
    debug(): EdgeDebug<TYPE>;
    attachI(id: number, port: number): void;
    attachO(id: number, port: number): void;
    detachI(): void;
    detachO(): void;
    dispose(): void;
};

type NodeI<IN extends unknown[], OUT extends unknown[]> = Node<IN, OUT> & {
    debug(): NodeDebug<IN, OUT>;
    attachI(id: number, port: number): void;
    attachO(id: number, port: number): void;
    detachI(id: number, port: number): void;
    detachO(id: number, port: number): void;
    dispose(): void;
};

class EdgeImpl<TYPE> implements EdgeI<TYPE> {
    #id: number;
    #in: { node: NodeI<unknown[], unknown[]>; port: number; unsub: () => void } | null;
    #out: { node: NodeI<unknown[], unknown[]>; port: number; unsub: () => void } | null;
    #value: Writable<TYPE>;

    #node: (i: number) => NodeI<unknown[], unknown[]>;

    constructor(id: number, value: TYPE, node: (i: number) => NodeI<unknown[], unknown[]>) {
        this.#id = id;
        this.#in = null;
        this.#out = null;
        this.#node = node;
        this.#value = writable(value);
    }

    get id() {
        return this.#id;
    }

    input(value: TYPE) {
        this.#value.set(value);
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
        // bypass, this is guaranteed by connect
        const unsub = node.output(port as never).subscribe((v) => this.#value.set(v as TYPE));
        this.#in = { node, port, unsub };
        this.#in.node.attachO(this.#id, port);
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
        // bypass, this is guaranteed by connect
        const unsub = this.#value.subscribe((v) => node.input(port as never, v));
        this.#out = { node, port, unsub };
        this.#out.node.attachI(this.#id, port);
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
            d.node.detachI(this.#id, d.port);
        }
    }

    debug() {
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

type Impl<IN extends unknown[], OUT extends unknown[]> = (...args: IN) => Promise<OUT> | OUT;

class NodeImpl<IN extends unknown[], OUT extends unknown[]> implements NodeI<IN, OUT> {
    #id: number;
    #impl: Impl<IN, OUT>;
    #ci: (EdgeI<unknown> | null)[];
    #co: EdgeI<unknown>[][];
    #vi: Writable<IN>;
    #vo: Writable<OUT>;

    #cleanup: () => void;
    #edge: (i: number) => EdgeI<unknown>;

    constructor(
        id: number,
        init: { in: IN; out: OUT },
        impl: Impl<IN, OUT>,
        edge: (i: number) => EdgeI<unknown>
    ) {
        this.#id = id;
        this.#impl = impl;

        this.#ci = Array.from({ length: init.in.length }, () => null);
        this.#co = Array.from({ length: init.out.length }, () => []);

        this.#vi = writable(init.in);
        this.#vo = writable(init.out);

        this.#edge = edge;
        this.#cleanup = this.#vi.subscribe((v) => {
            void Promise.resolve(this.#impl(...v))
                .then((r) => this.#vo.set(r))
                .catch(() => {});
        });
    }

    get id() {
        return this.#id;
    }

    output<PORT extends number>(port: WithinLength<OUT, PORT>): Readable<OUT[PORT]> {
        if (port < this.#co.length) {
            return derived(this.#vo, (v) => v[port]);
        } else {
            throw new Error(`Invalid output PORT[${port}] on NODE[${this.id}]`);
        }
    }

    input<PORT extends number>(port: WithinLength<IN, PORT>, value: IN[PORT]) {
        if (port < this.#ci.length) {
            this.#vi.update((v) => {
                v[port] = value;
                return v;
            });
        } else {
            throw new Error(`Invalid output PORT[${port}] on NODE[${this.id}]`);
        }
    }

    attachI(id: number, port: number) {
        if (port < this.#ci.length) {
            const edge = this.#ci[port];
            this.#ci[port] = null;
            if (null != edge) {
                edge.detachO();
            }
            this.#ci[port] = this.#edge(id);
        } else {
            throw new Error(`Invalid attach to input PORT[${port}] on NODE[${this.id}]`);
        }
    }

    attachO(id: number, port: number) {
        if (port < this.#co.length) {
            const edges = this.#co[port];
            const edge = edges.find((v) => v.id === id);
            if (null == edge) {
                this.#co[port].push(this.#edge(id));
            }
        } else {
            throw new Error(`Invalid attach to output PORT[${port}] on NODE[${this.id}]`);
        }
    }

    detachI(id: number, port: number) {
        if (port < this.#ci.length) {
            const edge = this.#ci[port];
            this.#ci[port] = null;
            if (null != edge) {
                if (edge.id !== id) {
                    throw new Error(`Invalid detach to input PORT[${port}] on NODE[${this.id}]`);
                }
                edge.detachO();
            }
        } else {
            throw new Error(`Invalid detach to input PORT[${port}] on NODE[${this.id}]`);
        }
    }

    detachO(id: number, port: number) {
        if (port < this.#co.length) {
            const edges = this.#co[port];
            const edge = edges.find((v) => v.id === id);
            if (null != edge) {
                this.#co[port] = this.#co[port].filter((v) => v.id !== id);
                edge.detachI();
            }
        } else {
            throw new Error(`Invalid detach to output PORT[${port}] on NODE[${this.id}]`);
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

export class Core {
    #gen: number;
    // this is to type erase it. all conversion is handled by this class anyway.
    #nodes: Map<number, unknown>;
    #edges: Map<number, unknown>;

    #debugger: Writable<TreeDebug>;

    constructor() {
        this.#gen = 0;
        this.#nodes = new Map<number, unknown>();
        this.#edges = new Map<number, unknown>();

        this.#debugger = writable({ nodes: [], edges: [] });
    }

    createNode<IN extends unknown[], OUT extends unknown[]>(
        impl: Impl<KnownLength<IN>, KnownLength<OUT>>,
        init: { in: KnownLength<IN>; out: KnownLength<OUT> }
    ) {
        const node = new NodeImpl<KnownLength<IN>, KnownLength<OUT>>(
            this.#gen++,
            init,
            impl,
            (id: number) => this.#edges.get(id) as EdgeImpl<unknown>
        );
        this.#nodes.set(node.id, node);
        return node as Node<KnownLength<IN>, KnownLength<OUT>>;
    }

    removeNode<IN extends unknown[], OUT extends unknown[]>(
        node: Node<IN, OUT>
    ) {
        this.#nodes.delete(node.id);
    }

    createEdge<TYPE>(value: TYPE) {
        const edge = new EdgeImpl<TYPE>(
            this.#gen++,
            value,
            (id: number) => this.#nodes.get(id) as NodeImpl<unknown[], unknown[]>
        );
        this.#edges.set(edge.id, edge);
        return edge as Edge<TYPE>;
    }

    removeEdge<TYPE>(edge: Edge<TYPE>) {
        this.#edges.delete(edge.id);
    }

    connectNE<IN extends unknown[], OUT extends unknown[], TYPE>(
        node: Node<IN, OUT>,
        port: ValidIndex<OUT, TYPE>,
        edge: Edge<TYPE>
    ) {
        (edge as EdgeI<TYPE>).attachI(node.id, port);
    }

    connectEN<IN extends unknown[], OUT extends unknown[], TYPE>(
        edge: Edge<TYPE>,
        port: ValidIndex<IN, TYPE>,
        node: Node<IN, OUT>
    ) {
        (edge as EdgeI<TYPE>).attachO(node.id, port);
    }

    disconnectI<TYPE>(edge: Edge<TYPE>) {
        (edge as EdgeI<TYPE>).detachI();
    }

    disconnectO<TYPE>(edge: Edge<TYPE>) {
        (edge as EdgeI<TYPE>).detachO();
    }

    dispose() {
        [...this.#edges.values()].forEach((v) => (v as EdgeI<unknown>).dispose());
        this.#edges.clear();
        [...this.#nodes.values()].forEach((v) => (v as NodeI<unknown[], unknown[]>).dispose());
        this.#nodes.clear();
    }

    debugUpdate() {
        this.#debugger.set({
            nodes: [...this.#nodes.entries()].map(([, v]) =>
                (v as NodeI<unknown[], unknown[]>).debug()
            ),
            edges: [...this.#edges.entries()].map(([, v]) => (v as EdgeI<unknown>).debug())
        });
    }

    debug() {
        return derived(this.#debugger, (v) => v);
    }
}
