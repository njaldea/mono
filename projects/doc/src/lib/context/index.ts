import { getContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';
import type { Events, Props } from '$lib/types/controls';

import { writable } from 'svelte/store';

const controls = Symbol();
const props = Symbol();
const story = Symbol();
const stories = Symbol();

export type Controls = { events: Events; props: Props };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropValues = Record<string, any>;

export function setControls(store: Writable<Controls>) {
    return setContext<Writable<Controls>>(controls, store);
}

export function setProps(store: Writable<Record<string, PropValues>>) {
    return setContext<Writable<Record<string, PropValues>>>(props, store);
}

export function setStories() {
    return setContext<Writable<string[]>>(stories, writable([]));
}

export function setActiveStory() {
    return setContext(story, writable<string | null>(null));
}

export function getControls() {
    return getContext<Writable<Controls>>(controls);
}

export function getProps() {
    return getContext<Writable<Record<string, PropValues>>>(props);
}

export function getActiveStory() {
    return getContext<Writable<string | null>>(story);
}

export function getStories() {
    return getContext<Writable<string[]>>(stories);
}
