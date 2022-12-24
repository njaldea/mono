import { derived, type Readable } from "svelte/store";
import { page } from "$app/stores";
import { goto } from "$app/navigation";

const PREFIX = ".";
const SUFFIX = "/+page.svelte";

const toRoute = (p: string) => p.substring(PREFIX.length, p.length - SUFFIX.length);

const route_advanced_layout_match = /\(.*\)/;
const collapseLayout = (p: string) =>
    p
        .split("/")
        .filter((p) => null == route_advanced_layout_match.exec(p))
        .join("/");

const isNotRoot = (p: string) => p !== "/";

const route_rest_match = /.*\[.*\].*/;
const isRouteDynamic = (p: string) => null == route_rest_match.exec(p);

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
export const sveltekit = (
    detail: Record<string, unknown>,
    prefix: string | null = null
): Routes => ({
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
});
