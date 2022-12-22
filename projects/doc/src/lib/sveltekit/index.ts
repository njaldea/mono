import { derived, type Readable } from "svelte/store";
import { page } from "$app/stores";
import { goto } from "$app/navigation";

const PREFIX = ".";
const SUFFIX = "/+page.svelte";

function toRoute(p: string) {
    return p.substring(PREFIX.length, p.length - SUFFIX.length);
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

type Routes = {
    /**
     * List of routes
     */
    data: string[];
    /**
     * Current route but removes unneeded group layout in the route
     */
    current: Readable<string | null>;
    /**
     * Callback to navigate to other pages
     * @param e - event that contains detail about the target url
     */
    navigate: (e: CustomEvent<string>) => void;
};

/**
 * Dedicated helper method to be used for sveltekit
 * @param detail - vite's `import.meta.glob(..., { eager: true })`
 * @param prefix - only use when layout is not in the root route
 * @returns Routes
 */
export function sveltekit(detail: Record<string, unknown>, prefix: string | null = null): Routes {
    return {
        data: Object.keys(detail)
            .map(toRoute)
            .map(collapseLayout)
            .filter(isNotRoot)
            .filter(isRouteDynamic),
        current: derived(page, ($page) => {
            if ($page.route.id) {
                if (prefix) {
                    return collapseLayout($page.route.id.substring(prefix.length));
                }
                return collapseLayout($page.route.id);
            }
            return null;
        }),
        navigate: prefix ? (e) => goto(`${prefix}${e.detail}`) : (e) => goto(e.detail)
    };
}
