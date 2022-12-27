import { getContext, setContext } from "svelte";
import { uiContainer } from "$lib/core/state/tags";

import { getCore } from "$lib/core/context/core";
import { ContainerProxy } from "$lib/core/types/ContainerProxy";
import type { IContainer } from "$lib/core/types/ContainerProxy";

export const getCurrentUIContainer = () => {
    const container = getContext<IContainer>(uiContainer);
    if (null != container) {
        return container;
    }
    const { fsui } = getCore();
    if (null != fsui) {
        return fsui;
    }
    throw "FullscreenUI does not exist!";
};

export const setFullscreenUI = (container: IContainer) => {
    getCore().fsui = new ContainerProxy(container, null);
};

export const setCurrentUIContainer = (container: IContainer) => {
    const current = getCurrentUIContainer() as ContainerProxy;
    setContext(uiContainer, new ContainerProxy(container, current));
};
