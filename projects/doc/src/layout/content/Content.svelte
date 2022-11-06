<script lang="ts">
    import Container from '../../etc/Container.svelte';
    import Controls from './Controls.svelte';
    import { setURL, initControls, initProps } from '../../context';
    import { writable } from 'svelte/store';

    export let url: string;

    const controls = initControls();
    const props = initProps();

    function reset(url: string) {
        setURL(url);
        if (controls[url] == null) {
            controls[url] = writable({ events: [], props: [] });
        }
        if (props[url] == null) {
            props[url] = writable({});
        }
    }

    $: reset(url);
</script>

{#key url}
    <div>
        <Container offset={200} padding={150} reversed>
            <svelte:fragment slot="a">
                <slot />
            </svelte:fragment>
            <svelte:fragment slot="b">
                <Controls prop_values={props[url]} controls={controls[url]} />
            </svelte:fragment>
        </Container>
    </div>
{/key}

<style>
    div {
        width: 100%;
        height: 100%;
    }
</style>
