<script lang="ts">
    import Header from "$lib/components/block/controls/misc/TopHeader.svelte";
    import Styler from "$lib/components/block/controls/misc/Styler.svelte";

    import Detail from "./Detail.svelte";

    import type { SvelteComponentTyped } from "svelte/internal";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
    export let component: C;

    type I = $$Generic;
    export let info: (n: string) => I;

    type V = $$Generic;
    export let name1: V | undefined;
    export let name2: V | undefined;
    export let name3: V | undefined;

    export let stringify = false;
</script>

<Detail>

    | variable | value                                       |
    | -------- | ------------------------------------------- |
    | name1    | {stringify ? JSON.stringify(name1) : name1} |
    | name2    | {stringify ? JSON.stringify(name2) : name2} |
    | name3    | {stringify ? JSON.stringify(name3) : name3} |

</Detail>

<Detail>
    <Styler>
        <Header />
        <svelte:component
            this={component}
            info={info("name1")}
            bind:value={name1}
            depth={10}
            disabled={false}
        />
        <svelte:component
            this={component}
            info={info("name2")}
            bind:value={name2}
            depth={30}
            disabled={false}
        />
        <svelte:component
            this={component}
            info={info("name3")}
            bind:value={name3}
            depth={50}
            disabled
        />
    </Styler>
</Detail>
