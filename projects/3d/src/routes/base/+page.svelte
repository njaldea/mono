<script lang="ts">
    import SUT from './SUT.svelte';
    import { Controls, Template, Story } from '@nil-/doc';
</script>

<Controls
    props={[
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
    ]}
    events={[]}
/>

<Template let:props={{ v1, v2, v3, v4 }}>
    <SUT {v1} {v2} {v3} {v4} />
</Template>

<Story name="s1" props={{ v2: 't', v3: '1', v4: true }} />
