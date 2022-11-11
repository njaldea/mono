import { loader } from '@nil-/doc';
export const load = loader(import.meta.glob('./**/+page.svelte', { eager: true }));
