<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Context from "./Context.svelte";

    const dispatcher = createEventDispatcher();

    let svg: SVGSVGElement;

    const pointer = (s: SVGSVGElement) => {
        const engage = (e: PointerEvent) => {
            const m = s.getScreenCTM();
            const x = m?.a ?? 1;
            const y = m?.d ?? 1;
            dispatcher("engage", { x: e.offsetX / x - 50, y: e.offsetY / y - 50 });
        };

        const confirm = (e: PointerEvent) => {
            const m = s.getScreenCTM();
            const x = m?.a ?? 1;
            const y = m?.d ?? 1;
            dispatcher("confirm", { x: e.offsetX / x - 50, y: e.offsetY / y - 50 });
        };

        const cancel = () => dispatcher("cancel");

        s.addEventListener("pointerdown", engage);
        s.addEventListener("pointerup", confirm);
        s.addEventListener("pointercancel", cancel);

        return {
            destroy: () => {
                s.removeEventListener("pointerdown", engage);
                s.removeEventListener("pointerup", confirm);
                s.removeEventListener("pointercancel", cancel);
            }
        };
    };
</script>

<svg use:pointer bind:this={svg} viewBox="-50 -50 100 100">
    {#if svg}
        <Context {svg} on:engage on:confirm on:cancel>
            <slot />
        </Context>
    {/if}
</svg>

<style>
    svg {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        fill: none;
        stroke: white;
        stroke-width: 5;
        stroke-linecap: round;
        stroke-linejoin: round;
        user-select: none;
        touch-action: none;
        box-sizing: border-box;
        background-color: black;
    }
</style>
