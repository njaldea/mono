import { writable, type Writable } from 'svelte/store';
import type { ActionReturn } from 'svelte/action';

type Parameter = {
    reset: () => number;
    vertical: boolean;
    reversed: boolean;
};

type Return = {
    position: Writable<number>;
    draggable: (div: HTMLDivElement, parameter: Parameter) => ActionReturn<Parameter>;
};

export const createDraggable = (offset: number): Return => {
    const position = writable(offset);
    function draggable(div: HTMLDivElement, parameter: Parameter) {
        let param = parameter ?? { reset: () => 0, vertical: true, reversed: false };

        let moving = false;
        position.set(param.reset());
        let current_page = 0;

        function engage(e: MouseEvent) {
            moving = true;
            position.set(param.reset());
            current_page = param.vertical ? e.pageX : e.pageY;
        }

        function disengage() {
            moving = false;
        }

        function move(e: MouseEvent) {
            if (moving) {
                const page = param.vertical ? e.pageX : e.pageY;
                position.update((v) => v + (page - current_page) * (param.reversed ? -1 : 1));
                current_page = page;
            }
        }

        div.addEventListener('mousedown', engage);
        document.addEventListener('mouseup', disengage);
        document.addEventListener('mousemove', move);
        return {
            update: (parameter: Parameter) => {
                if (
                    param.reversed !== parameter.reversed ||
                    param.vertical !== parameter.vertical
                ) {
                    moving = false;
                }
                param = parameter;
                position.set(param.reset());
            },
            destroy: () => {
                div.removeEventListener('mousedown', engage);
                document.removeEventListener('mouseup', disengage);
                document.removeEventListener('mousemove', move);
            }
        };
    }

    return {
        position,
        draggable
    };
};
