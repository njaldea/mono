import { getContext, onDestroy, setContext } from "svelte";
import { Destructor } from "$lib/core/types/Destructor";
import { destructor as key } from "$lib/core/state/tags";

export const destructor = (cb: () => void) => {
    const current = new Destructor(cb);
    getContext<Destructor | undefined>(key)?.add(current);
    setContext(key, current);
    onDestroy(() => current.call());
};
