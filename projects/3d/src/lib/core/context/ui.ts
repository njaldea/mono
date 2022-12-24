import { getContext, setContext } from "svelte";
import { tags } from "$lib/core/state/tags";

import { getCore } from "$lib/core/context/core";
import { ContainerProxy } from "$lib/core/types/ContainerProxy";
import type { IContainer } from "$lib/core/types/ContainerProxy";

export const getCurrentUIContainer = () => {
    const container = getContext<IContainer>(tags.ui_container);
    if (null == container) {
        const { fsui } = getCore();
        if (null == fsui) {
            throw "FullscreenUI does not exist!";
        }
        return fsui;
    } else {
        return container;
    }
};

export const setFullscreenUI = (container: IContainer) => {
    getCore().fsui = new ContainerProxy(container, 0);
};

export const setCurrentUIContainer = (container: IContainer) => {
    const current = getCurrentUIContainer() as ContainerProxy;
    const depth = null == current ? 1 : current.depth + 1;
    setContext(tags.ui_container, new ContainerProxy(container, depth));
};
