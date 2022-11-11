<script lang="ts">
    import Container from '$lib/etc/Container.svelte';
    import Component from '$lib/layout/content/Controls.svelte';
    import { setControls, setProps, setActiveStory, setStories } from '$lib/context';
    import type { Controls, PropValues } from '$lib/context';
    import type { Writable } from 'svelte/store';

    export let controls: Writable<Controls>;
    export let props: Writable<Record<string, PropValues>>;

    setControls(controls);
    setProps(props);
    let story = setActiveStory();
    setStories();
</script>

<Container offset={200} padding={150} reversed>
    <svelte:fragment slot="a">
        <slot />
    </svelte:fragment>
    <svelte:fragment slot="b">
        {#key $story}
            {#if $story != null}
                <Component bind:props={$props[$story]} controls={$controls} />
            {/if}
        {/key}
    </svelte:fragment>
</Container>
