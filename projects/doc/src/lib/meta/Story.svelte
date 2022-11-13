<script lang="ts">
    export let name: string;
    export let props: Record<string, unknown>;

    import { getProps, getStories } from "$lib/context";
    getProps().update((v) => ({ ...v, [name]: props }));
    getStories().update((v) => {
        if (!v.includes(name)) {
            return [...v, name];
        }
        return [...v];
    });
</script>
