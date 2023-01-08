import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";

const svg = Symbol();
export const getSVG = () => getContext<SVGSVGElement>(svg);
export const initSVG = (e: SVGSVGElement) => setContext<SVGSVGElement>(svg, e);

type Coord = {
    x: number;
    y: number;
};

const scale = Symbol();
export const initScale = () => setContext<Writable<Coord>>(scale, writable({ x: 1, y: 1 }));
export const getScale = () => getContext<Writable<Coord>>(scale);
