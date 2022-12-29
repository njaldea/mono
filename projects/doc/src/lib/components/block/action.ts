import type { ActionReturn } from "svelte/action";

type Options = { class: string; min: number; w: boolean; enabled: boolean };

/**
 *  Temporary support for container query until svelte supports it
 */
export const cquery = (div: HTMLDivElement, options: Options): ActionReturn<Options> => {
    let o = options;

    const check = () =>
        div.classList.toggle(o.class, (o.w ? div.clientWidth : div.clientHeight) > o.min);
    const observer = new ResizeObserver(check);
    if (o.enabled) {
        observer.observe(div);
    }

    return {
        update: (options) => {
            if (o.enabled !== options.enabled) {
                if (!o.enabled && options.enabled) {
                    observer.observe(div);
                } else {
                    observer.disconnect();
                }
            }
            o = options;
            check();
        },
        destroy: () => o.enabled && observer.disconnect()
    };
};
