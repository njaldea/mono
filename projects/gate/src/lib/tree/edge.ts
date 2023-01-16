import { derived, writable, get } from "svelte/store";
import type { Writable, Readable } from "svelte/store";
import type { EdgeDebug } from "./debug";
import type { NodeI } from "./node";

export type Edge<TYPE> = {
    get id(): number;
    input(value: TYPE): void;
    output(): Readable<TYPE>;
};

export type EdgeI<TYPE> = Edge<TYPE> & {
    debug(): EdgeDebug<TYPE>;
    attachI(id: number, port: number): void;
    attachO(id: number, port: number): void;
    detachI(): void;
    detachO(): void;
    dispose(): void;
};

export class EdgeImpl<TYPE> implements EdgeI<TYPE> {
    #id: number;
    #i: { node: NodeI<unknown[], unknown[]>; port: number; unsub: () => void } | null;
    #o: { node: NodeI<unknown[], unknown[]>; port: number; unsub: () => void } | null;
    #value: Writable<TYPE>;

    #node: (i: number) => NodeI<unknown[], unknown[]>;

    constructor(id: number, value: TYPE, node: (i: number) => NodeI<unknown[], unknown[]>) {
        this.#id = id;
        this.#i = null;
        this.#o = null;
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
            const d = this.#i;
            if (null != d) {
                if (id === d.node.id && port === d.port) {
                    return;
                }
                this.detachI();
            }
        }

        // check for loop, might need to revisit
        {
            const d = this.#o;
            if (null != d && id === d.node.id) {
                this.detachO();
            }
        }

        const node = this.#node(id);
        // bypass, this is guaranteed by connect
        const unsub = node.output(port as never).subscribe((v) => this.#value.set(v as TYPE));
        this.#i = { node, port, unsub };
        this.#i.node.attachO(this.#id, port);
    }

    attachO(id: number, port: number) {
        {
            const d = this.#o;
            if (null != d) {
                if (id === d.node.id && port === d.port) {
                    return;
                }
                this.detachO();
            }
        }

        // check for loop, might need to revisit
        {
            const d = this.#i;
            if (null != d && id === d.node.id) {
                this.detachI();
            }
        }

        const node = this.#node(id);
        // bypass, this is guaranteed by connect
        const unsub = this.#value.subscribe((v) => node.input(port as never, v));
        this.#o = { node, port, unsub };
        this.#o.node.attachI(this.#id, port);
    }

    detachI() {
        const d = this.#i;
        this.#i = null;
        if (null != d) {
            d.unsub();
            d.node.detachO(this.#id, d.port);
        }
    }

    detachO() {
        const d = this.#o;
        this.#o = null;
        if (null != d) {
            d.unsub();
            d.node.detachI(this.#id, d.port);
        }
    }

    debug() {
        return {
            id: this.#id,
            connections: {
                i: this.#i ? { id: this.#i.node.id, port: this.#i.port } : null,
                o: this.#o ? { id: this.#o.node.id, port: this.#o.port } : null
            },
            value: get(this.#value)
        };
    }

    dispose() {
        this.detachO();
        this.detachI();
    }
}

export class EdgeProxy<TYPE> implements Edge<TYPE> {
    #handle: Edge<TYPE>;

    constructor(h: Edge<TYPE>) {
        this.#handle = h;
    }

    get id() {
        return this.#handle.id;
    }

    get handle() {
        return this.#handle;
    }

    input(value: TYPE) {
        this.#handle.input(value);
    }

    output() {
        return this.#handle.output();
    }
}
