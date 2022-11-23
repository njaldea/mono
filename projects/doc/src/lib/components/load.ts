export function load(files_from_import_meta: Record<string, unknown>): string[] {
    const prefix = ".".length;
    const suffix = "/+page.svelte".length;
    const rootlen = "./+page.svelte".length;
    return Object.keys(files_from_import_meta)
        .filter((p) => p.length > rootlen) // remove root page
        .map((p) => p.substring(prefix, p.length - suffix));
}
