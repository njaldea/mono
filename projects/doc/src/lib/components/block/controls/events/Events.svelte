<script lang="ts">
    import type { Event } from "../types";
    import Styler from "./misc/Styler.svelte";

    export let visible: boolean;
    export let events: Event[];
    export let handlers: Record<string, (ev: CustomEvent<unknown>) => void> | undefined;

    let history: { name: string; detail: string; count: number }[] = [];

    const stringify = (detail: unknown) => {
        if (detail) {
            if (typeof detail === "string") {
                return detail;
            }
            return JSON.stringify(detail);
        }
        return "";
    };

    const wrap = (ext: Event[]): Record<string, (ev: CustomEvent<unknown>) => void> => {
        const obj: Record<string, (ev: CustomEvent<unknown>) => void> = {};
        if (ext != null) {
            for (const name of ext) {
                obj[name] = (ev) => {
                    const detail = stringify(ev.detail);
                    if (history.length > 0) {
                        const last = history[history.length - 1];
                        if (last.name === name && last.detail === detail && last.count < 99) {
                            last.count += 1;
                            history = history;
                            return;
                        }
                    }
                    history.push({ name, detail, count: 1 });
                    if (history.length > 10) {
                        history.shift();
                    }
                    history = history;
                };
            }
        }
        return obj;
    };

    $: handlers = wrap(events);
</script>

{#if visible}
    <Styler>
        <slot />
        {#each history as { count, detail, name }, i (i)}
            <div>
                <div class="name">
                    <div>{name}</div>
                    {#if count > 1}
                        <div class="count">
                            [{count.toString().padStart(2, "0")}]
                        </div>
                    {/if}
                </div>
                <div>{detail}</div>
            </div>
        {/each}
    </Styler>
{/if}

<style>
    .name {
        padding: 0rem 0.5rem;
        display: grid;
        place-content: center;
        grid-auto-flow: column;
        grid-auto-columns: 1.875rem;
        grid-template-columns: 1fr;
    }

    .count {
        display: grid;
        place-items: center;
        text-align: center;
        font-size: 0.8rem;
    }
</style>
