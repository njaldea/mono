import { get, writable, type Writable } from "svelte/store";
import type { ActionReturn } from "svelte/action";

type Parameter = {
    reset: () => number;
    vertical: boolean;
    reversed: boolean;
    dbltap?: () => void;
    tap?: () => void;
    moving: Writable<boolean>;
};

type Return = {
    position: Writable<number>;
    draggable: (div: HTMLDivElement, parameter: Parameter) => ActionReturn<Parameter>;
};

export const createDraggable = (offset: number): Return => {
    const position = writable(offset);

    const draggable = (div: HTMLDivElement, parameter: Parameter) => {
        let tm = new Date().getTime();

        let param = parameter;

        position.set(param.reset());
        let refPage = 0;

        const disengage = () => param.moving.set(false);

        const checkDoubleTap = () => {
            const tm2 = new Date().getTime();
            const diff = tm2 - tm;
            tm = tm2;
            return diff < 200;
        };

        const engage = (e: PointerEvent) => {
            if (checkDoubleTap()) {
                param.dbltap?.();
                disengage();
                return;
            }

            param.moving.set(true);
            position.set(param.reset());
            refPage = param.vertical ? e.pageX : e.pageY;
            param.tap?.();
        };

        const move = (e: PointerEvent) => {
            if (get(param.moving)) {
                const page = param.vertical ? e.pageX : e.pageY;
                position.update((v) => v + (page - refPage) * (param.reversed ? -1 : 1));
                refPage = page;
            }
        };

        div.addEventListener("pointerdown", engage);
        window.addEventListener("pointerup", disengage);
        window.addEventListener("pointercancel", disengage);
        window.addEventListener("pointermove", move);
        return {
            update: (parameter: Parameter) => {
                param = parameter;
            },
            destroy: () => {
                div.removeEventListener("pointerdown", engage);
                window.removeEventListener("pointerup", disengage);
                window.removeEventListener("pointercancel", disengage);
                window.removeEventListener("pointermove", move);
            }
        };
    };

    return {
        position,
        draggable
    };
};

type Parameter2 = {
    reset: () => number;
    vertical: boolean;
    reversed: boolean;
    dbltap?: () => void;
    tap?: () => void;
};

type Return2 = {
    position: Writable<number>;
    engaged: Writable<boolean>;
    draggable: (div: HTMLDivElement, parameter: Parameter2) => ActionReturn<Parameter2>;
};

export const createDraggable2 = (): Return2 => {
    const position = writable(0);
    const engaged = writable(false);

    const draggable = (div: HTMLDivElement, parameter: Parameter2) => {
        let tm = new Date().getTime();

        let param = parameter;

        position.set(param.reset());
        let refPage = 0;

        const disengage = () => engaged.set(false);

        const checkDoubleTap = () => {
            const tm2 = new Date().getTime();
            const diff = tm2 - tm;
            tm = tm2;
            return diff < 200;
        };

        const engage = (e: PointerEvent) => {
            if (checkDoubleTap()) {
                param.dbltap?.();
                disengage();
                return;
            }

            engaged.set(true);
            position.set(param.reset());
            refPage = param.vertical ? e.pageX : e.pageY;
            param.tap?.();
        };

        const move = (e: PointerEvent) => {
            if (get(engaged)) {
                const page = param.vertical ? e.pageX : e.pageY;
                position.update((v) => v + (page - refPage) * (param.reversed ? -1 : 1));
                refPage = page;
            }
        };

        div.addEventListener("pointerdown", engage);
        window.addEventListener("pointerup", disengage);
        window.addEventListener("pointercancel", disengage);
        window.addEventListener("pointermove", move);
        return {
            update: (parameter: Parameter2) => {
                param = parameter;
            },
            destroy: () => {
                div.removeEventListener("pointerdown", engage);
                window.removeEventListener("pointerup", disengage);
                window.removeEventListener("pointercancel", disengage);
                window.removeEventListener("pointermove", move);
            }
        };
    };

    return {
        position,
        engaged,
        draggable,
    };
};
