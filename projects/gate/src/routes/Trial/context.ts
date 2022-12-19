import { getContext, setContext } from "svelte";

const svg = Symbol();
export function getSVG() {
    return getContext<SVGSVGElement>(svg);
}

export function initSVG(e: SVGSVGElement) {
    return setContext<SVGSVGElement>(svg, e)
}