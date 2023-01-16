import { derived, writable, get } from "svelte/store";
import type { Writable, Readable } from "svelte/store";
import type { WithinLength } from "./types";
import type { NodeDebug } from "./debug";
import type { EdgeI } from "./edge";

export type Node<IN extends unknown[], OUT extends unknown[]> = {
    get id(): number;
    input<PORT extends number>(port: WithinLength<IN, PORT>, value: IN[PORT]): void;
    output<PORT extends number>(port: WithinLength<OUT, PORT>): Readable<OUT[PORT]>;
};

export type NodeI<IN extends unknown[], OUT extends unknown[]> = Node<IN, OUT> & {
    debug(): NodeDebug<IN, OUT>;
    attachI(id: number, port: number): void;
    attachO(id: number, port: number): void;
    detachI(id: number, port: number): void;
    detachO(id: number, port: number): void;
    dispose(): void;
};

export type Impl<IN extends unknown[], OUT extends unknown[]> = (...args: IN) => Promise<OUT> | OUT;

export class NodeImpl<IN extends unknown[], OUT extends unknown[]> implements NodeI<IN, OUT> {
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
        { i, o }: { i: IN; o: OUT },
        impl: Impl<IN, OUT>,
        edge: (i: number) => EdgeI<unknown>
    ) {
        this.#id = id;
        this.#impl = impl;

        this.#ci = Array.from({ length: i.length }, () => null);
        this.#co = Array.from({ length: o.length }, () => []);

        this.#vi = writable(i);
        this.#vo = writable(o);

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
                i: this.#ci.map((v) => v?.id ?? null),
                o: this.#co.map((v) => v.map((n) => n.id))
            },
            values: {
                i: get(this.#vi),
                o: get(this.#vo)
            }
        };
    }

    dispose() {
        this.#cleanup();
    }
}

export class NodeProxy<IN extends unknown[], OUT extends unknown[]> implements Node<IN, OUT> {
    #handle: Node<IN, OUT>;

    constructor(h: Node<IN, OUT>) {
        this.#handle = h;
    }

    get id() {
        return this.#handle.id;
    }

    get handle() {
        return this.#handle;
    }

    input<PORT extends number>(port: WithinLength<IN, PORT>, value: IN[PORT]) {
        this.#handle.input(port, value);
    }

    output<PORT extends number>(port: WithinLength<OUT, PORT>) {
        return this.#handle.output(port);
    }
}
