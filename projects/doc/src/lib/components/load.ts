const prefix = ".".length;
const suffix = "/+page.svelte".length;

function toRoute(p: string) {
    return p.substring(prefix, p.length - suffix);
}

const route_advanced_layout_match = /\(.*\)/;
function collapseLayout(p: string) {
    return p
        .split("/")
        .filter((p) => route_advanced_layout_match.exec(p) == null)
        .join("/");
}

function isNotRoot(p: string) {
    return p !== "/";
}

const route_rest_match = /.*\[.*\].*/;
function isRouteDynamic(p: string) {
    return route_rest_match.exec(p) == null;
}

export function load(files_from_import_meta: Record<string, unknown>): string[] {
    return Object.keys(files_from_import_meta)
        .map(toRoute)
        .map(collapseLayout)
        .filter(isNotRoot)
        .filter(isRouteDynamic);
}
