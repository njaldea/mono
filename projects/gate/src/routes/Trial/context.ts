import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";

const svg = Symbol();
export function getSVG() {
    return getContext<SVGSVGElement>(svg);
}

export function initSVG(e: SVGSVGElement) {
    return setContext<SVGSVGElement>(svg, e);
}

const scale = Symbol();
export function initScale() {
    return setContext<Writable<{ x: number; y: number }>>(scale, writable({ x: 1, y: 1 }));
}

export function getScale() {
    return getContext<Writable<{ x: number; y: number }>>(scale);
}
