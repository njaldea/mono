<script lang="ts">
    import { getProps } from '$lib/context';
    const props = getProps();
</script>

<slot props={$props} />
