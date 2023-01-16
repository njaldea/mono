import { derived, writable } from "svelte/store";
import { type Node, type NodeI, NodeImpl, NodeProxy, type Impl } from "./node";
import { type Edge, type EdgeI, EdgeImpl, EdgeProxy } from "./edge";
import type { Writable } from "svelte/store";
import type { TreeDebug } from "./debug";
import type { KnownLength, ValidIndex } from "./types";

type BNode = NodeI<unknown[], unknown[]>;
type BEdge = EdgeI<unknown>;

/**
 * The object returned are only proxies to hide implementation that should not be available to the users.
 * Core keeps all the implementation objects while users only keep a Proxy that has a reference to the implementations.
 * When connecting/disconnecting, the expected input is always a proxy.
 *
 * This is done to enable type checking to still work.
 */

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
        init: { i: KnownLength<IN>; o: KnownLength<OUT> }
    ): Node<KnownLength<IN>, KnownLength<OUT>> {
        const node = new NodeImpl<KnownLength<IN>, KnownLength<OUT>>(
            this.#gen++,
            init,
            impl,
            (id: number) => this.#edges.get(id) as BEdge
        );
        this.#nodes.set(node.id, node);
        return new NodeProxy(node);
    }

    removeNode<IN extends unknown[], OUT extends unknown[]>(node: Node<IN, OUT>) {
        this.#nodes.delete(this.#validate(node).id);
    }

    createEdge<TYPE>(value: TYPE): Edge<TYPE> {
        const edge = new EdgeImpl<TYPE>(
            this.#gen++,
            value,
            (id: number) => this.#nodes.get(id) as BNode
        );
        this.#edges.set(edge.id, edge);
        return new EdgeProxy(edge);
    }

    removeEdge<TYPE>(edge: Edge<TYPE>) {
        this.#edges.delete(this.#validate(edge).id);
    }

    connectNE<IN extends unknown[], OUT extends unknown[], TYPE>(
        node: Node<IN, OUT>,
        port: ValidIndex<OUT, TYPE>,
        edge: Edge<TYPE>
    ) {
        this.#validate(edge).attachI(this.#validate(node).id, port);
    }

    connectEN<IN extends unknown[], OUT extends unknown[], TYPE>(
        edge: Edge<TYPE>,
        port: ValidIndex<IN, TYPE>,
        node: Node<IN, OUT>
    ) {
        this.#validate(edge).attachO(this.#validate(node).id, port);
    }

    disconnectI<TYPE>(edge: Edge<TYPE>) {
        this.#validate(edge).detachI();
    }

    disconnectO<TYPE>(edge: Edge<TYPE>) {
        this.#validate(edge).detachO();
    }

    #validate<TYPE>(node: Edge<TYPE>): EdgeI<TYPE>;
    #validate<IN extends unknown[], OUT extends unknown[]>(node: Node<IN, OUT>): NodeI<IN, OUT>;
    #validate<IN extends unknown[], OUT extends unknown[], TYPE>(o: Node<IN, OUT> | Edge<TYPE>) {
        if (o instanceof EdgeProxy<TYPE>) {
            if (this.#edges.get(o.id) !== o.handle) {
                throw new Error(`Invalid Edge[${o.id}]`);
            } else {
                return o.handle;
            }
        } else if (o instanceof NodeProxy<IN, OUT>) {
            if (this.#nodes.get(o.id) !== o.handle) {
                throw new Error(`Invalid Node[${o.id}]`);
            } else {
                return o.handle;
            }
        }
        throw new Error("Invalid object provided");
    }

    dispose() {
        [...this.#edges.values()].forEach((v) => (v as BEdge).dispose());
        this.#edges.clear();
        [...this.#nodes.values()].forEach((v) => (v as BNode).dispose());
        this.#nodes.clear();
    }

    debugUpdate() {
        this.#debugger.set({
            nodes: [...this.#nodes.entries()].map(([, v]) => (v as BNode).debug()),
            edges: [...this.#edges.entries()].map(([, v]) => (v as BEdge).debug())
        });
    }

    debug() {
        return derived(this.#debugger, (v) => v);
    }
}
