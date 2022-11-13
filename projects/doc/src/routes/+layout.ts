import { loader } from "$lib";
export const load = loader(import.meta.glob("./**/+page.svelte", { eager: true }));
