<script lang="ts">
    import { getProps } from '../context';
    const props = getProps();
</script>

<slot props={$props} />
