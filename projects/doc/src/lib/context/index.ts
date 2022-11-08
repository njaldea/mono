import { getContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';
import { get, writable } from 'svelte/store';

import type { Events, Props } from '$lib/types/controls';

const url = Symbol();
const controls = Symbol();
const props = Symbol();

export type Controls = {
    events: Events;
    props: Props;
};
export type PropValues = Record<string, any>;
type URLMapping<T> = Record<string, Writable<T>>;

export function setURL(value: string) {
    let store = getContext<Writable<string>>(url);
    if (store == null) {
        store = setContext(url, writable<string>(value));
    } else {
        store.set(value);
    }
}

export function initControls() {
    return setContext<URLMapping<Controls>>(controls, {});
}

export function initProps() {
    return setContext<URLMapping<PropValues>>(props, {});
}

export function getURL() {
    return get(getContext<Writable<string>>(url));
}

export function getProps() {
    return getContext<URLMapping<PropValues>>(props)[getURL()];
}

export function setProps(value: PropValues) {
    getContext<URLMapping<PropValues>>(props)[getURL()].set(value);
}
export function setControls(value: Controls) {
    getContext<URLMapping<Controls>>(controls)[getURL()].set(value);
}
