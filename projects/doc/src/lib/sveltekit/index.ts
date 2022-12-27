import { derived, type Readable } from "svelte/store";
import { page } from "$app/stores";
import { goto } from "$app/navigation";

const toRoute = (p: string) => p.substring(1, p.lastIndexOf("/"));

const routeHasLayoutGroup = /\(.*\)/;
const collapseLayout = (p: string) =>
    p
        .split("/")
        .filter((p) => null == routeHasLayoutGroup.exec(p))
        .join("/");

const isNotRoot = (p: string) => p !== "/";

const routeIsDynamic = /.*\[.*\].*/;
const isRouteDynamic = (p: string) => null == routeIsDynamic.exec(p);

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
