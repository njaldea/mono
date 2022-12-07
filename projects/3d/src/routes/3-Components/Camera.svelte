<script lang="ts">
    import Camera from "$lib/components/camera/arcrotate/Camera.svelte";
    import KeyboardControl from "$lib/components/camera/arcrotate/KeyboardControl.svelte";
    import PointerControl from "$lib/components/camera/arcrotate/PointerControl.svelte";
    import Target from "$lib/components/camera/arcrotate/Target.svelte";

    export let id: string;
    export let toggle: boolean;
    export let target: string;
    export let alpha: undefined | number = undefined;
    export let beta: undefined | number = undefined;
    export let radius: undefined | number = undefined;
</script>

<Camera
    {id}
    sensibility={[2000, 2000]}
    betalimit={[0, Math.PI / 2 - 0.1]}
    radiuslimit={[0.1, 1000]}
    {alpha}
    {beta}
    {radius}
>
    {#if toggle}
        <Target {target} />
        <KeyboardControl />
        <PointerControl />
    {/if}
</Camera>
