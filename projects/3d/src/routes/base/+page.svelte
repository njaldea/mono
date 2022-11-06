<script lang="ts">
    import SUT from './SUT.svelte';
    import Controls from '@nil-/doc/meta/Controls.svelte';
    import Template from '@nil-/doc/meta/Template.svelte';
    import Story from '@nil-/doc/meta/Story.svelte';
    import type { Events, Props } from '@nil-/doc/layout/content';

    const event_controls: Events = [];
    const prop_controls: Props = [
        {
            name: 'v1',
            type: 'number',
            min: 0,
            max: 10,
            step: 1
        },
        {
            name: 'v2',
            type: 'text'
        },
        {
            name: 'v3',
            type: 'select',
            values: ['1', '2']
        },
        {
            name: 'v4',
            type: 'switch'
        }
    ];
</script>

<Controls props={prop_controls} events={event_controls} />

<Template let:props={{ v1, v2, v3, v4 }}>
    <SUT {v1} {v2} {v3} {v4} />
</Template>

<Story name="s1" props={{ v2: 't', v3: '1', v4: true }} />
