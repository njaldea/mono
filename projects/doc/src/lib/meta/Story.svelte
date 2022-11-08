<script lang="ts">
    export let name: string;
    export let props: Record<string, unknown>;

    import { setProps } from '$lib/context';
    setProps(props);
</script>
