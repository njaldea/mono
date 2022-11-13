<script lang="ts">
    import Container from "$lib/etc/Container.svelte";
    import Component from "$lib/layout/content/Controls.svelte";
    import { setProps, setActiveStory, setStories } from "$lib/context";
    import { setControlEvents, setControlProps } from "$lib/context";
    import type { PropValues } from "$lib/context";
    import type { Writable } from "svelte/store";

    export let props: Writable<Record<string, PropValues>>;

    setProps(props);

    setControlEvents();
    let control_props = setControlProps();
    let story = setActiveStory();
    setStories();
</script>

<Container offset={200} padding={150} reversed>
    <svelte:fragment slot="a">
        <div class="scrollable">
            <slot />
        </div>
    </svelte:fragment>
    <svelte:fragment slot="b">
        {#key $story}
            {#if $story != null}
                <Component bind:props={$props[$story]} controls={$control_props} />
            {/if}
        {/key}
    </svelte:fragment>
</Container>

<style>
    div {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        overflow: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
    }

    div::-webkit-scrollbar {
        display: none;
    }
</style>
