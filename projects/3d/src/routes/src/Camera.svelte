<script lang="ts">
    import Camera from "$lib/components/camera/arcrotate/Camera.svelte";
    import KeyboardControl from "$lib/components/camera/arcrotate/KeyboardControl.svelte";
    import PointerControl from "$lib/components/camera/arcrotate/PointerControl.svelte";
    import Target from "$lib/components/camera/arcrotate/Target.svelte";

    let {
        id,
        toggle,
        target,
        alpha,
        beta,
        radius
    }: {
        id: string;
        toggle: boolean;
        target: string;
        alpha?: number;
        beta?: number;
        radius?: number;
    } = $props();
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
