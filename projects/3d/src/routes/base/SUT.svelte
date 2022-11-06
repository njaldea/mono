<script lang="ts">
    export let v1: number;
    export let v2: string;
    export let v3: string;
    export let v4: boolean;
</script>

{JSON.stringify({ v1, v2, v3, v4 }, null, 4)}
