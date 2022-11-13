import { getContext, setContext } from "svelte";
import type { Writable } from "svelte/store";
import type { Events, Props } from "$lib/types/controls";

import { writable } from "svelte/store";

export type Controls = { events: Events; props: Props };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropValues = Record<string, any>;

const control_events = Symbol();
export function setControlEvents() {
    return setContext<Writable<Events>>(control_events, writable([]));
}
export function getControlEvents() {
    return getContext<Writable<Events>>(control_events);
}

const control_props = Symbol();
export function setControlProps() {
    return setContext<Writable<Props>>(control_props, writable([]));
}
export function getControlProps() {
    return getContext<Writable<Props>>(control_props);
}

const props = Symbol();
export function setProps(store: Writable<Record<string, PropValues>>) {
    return setContext<Writable<Record<string, PropValues>>>(props, store);
}
export function getProps() {
    return getContext<Writable<Record<string, PropValues>>>(props);
}

const stories = Symbol();
export function setStories() {
    return setContext<Writable<string[]>>(stories, writable([]));
}
export function getStories() {
    return getContext<Writable<string[]>>(stories);
}

const story = Symbol();
export function setActiveStory() {
    return setContext(story, writable<string | null>(null));
}

export function getActiveStory() {
    return getContext<Writable<string | null>>(story);
}

const defaults = Symbol();
export function setDefaults<Args>() {
    return setContext(defaults, writable<Args | null>(null));
}

export function getDefaults<Args>() {
    return getContext<Writable<Args | null>>(defaults);
}
