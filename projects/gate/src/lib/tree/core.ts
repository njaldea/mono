import { derived, writable } from "svelte/store";
import type { Writable, Readable } from "svelte/store";

import { NodeProxy, NodeImpl, type Node, type NodeI, type Impl } from "./node";
import { EdgeProxy, EdgeImpl, type Edge, type EdgeI } from "./edge";
import type { KnownLength, ValidIndex } from "./types";
import type { TreeDebug } from "./debug";

type BNode = NodeI<unknown[], unknown[]>;
type BEdge = EdgeI<unknown>;

/*
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
        this.#nodes.delete(this.#target(node).id);
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
        this.#edges.delete(this.#target(edge).id);
    }

    connectNE<IN extends unknown[], OUT extends unknown[], TYPE>(
        node: Node<IN, OUT>,
        port: ValidIndex<OUT, TYPE>,
        edge: Edge<TYPE>
    ) {
        this.#target(edge).attachI(this.#target(node).id, port);
    }

    connectEN<IN extends unknown[], OUT extends unknown[], TYPE>(
        edge: Edge<TYPE>,
        port: ValidIndex<IN, TYPE>,
        node: Node<IN, OUT>
    ) {
        this.#target(edge).attachO(this.#target(node).id, port);
    }

    disconnectI<TYPE>(edge: Edge<TYPE>) {
        this.#target(edge).detachI();
    }

    disconnectO<TYPE>(edge: Edge<TYPE>) {
        this.#target(edge).detachO();
    }

    #target<TYPE>(node: Edge<TYPE>): EdgeI<TYPE>;
    #target<IN extends unknown[], OUT extends unknown[]>(node: Node<IN, OUT>): NodeI<IN, OUT>;
    #target<IN extends unknown[], OUT extends unknown[], TYPE>(o: Node<IN, OUT> | Edge<TYPE>) {
        if (o instanceof EdgeProxy) {
            if (this.#edges.get(o.id) === o.handle) {
                return o.handle as EdgeI<TYPE>;
            }
            throw new Error(`Invalid Edge[${o.id}]`);
        } else if (o instanceof NodeProxy) {
            if (this.#nodes.get(o.id) === o.handle) {
                return o.handle as NodeI<IN, OUT>;
            }
            throw new Error(`Invalid Node[${o.id}]`);
        }
        throw new Error("Invalid object provided");
    }

    dispose() {
        this.#edges.forEach((v) => (v as BEdge).dispose());
        this.#nodes.forEach((v) => (v as BNode).dispose());
        this.#edges.clear();
        this.#nodes.clear();
    }

    debug(): Readable<TreeDebug> & { update: () => void } {
        const store = derived(this.#debugger, (v) => v);
        return {
            subscribe: (cb) => store.subscribe(cb),
            update: () => {
                this.#debugger.set({
                    nodes: [...this.#nodes.values()].map((v) => (v as BNode).debug()),
                    edges: [...this.#edges.values()].map((v) => (v as BEdge).debug())
                });
            }
        };
    }
}
