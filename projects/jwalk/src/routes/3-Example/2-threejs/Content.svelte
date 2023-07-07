<script lang="ts" context="module">
    import { jwalker } from "$lib";
    import type { Inspect } from "$lib/helpers/debug";

    import { type Scene, Object3D } from "three";
    import {
        BoxGeometry,
        Mesh,
        LineBasicMaterial,
        MeshBasicMaterial,
        LineSegments,
        EdgesGeometry
    } from "three";

    const geometry = new BoxGeometry(0.5, 0.5, 0.5);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    material.transparent = true;
    material.opacity = 0.35;

    const edgeMaterial = new LineBasicMaterial({ color: 0xffffff });
    const edges = new EdgesGeometry(geometry);

    const builder = jwalker<Object3D>()
        .node("box", "tuple", {
            value: ["number", "number", "number"],
            action: (target, { value }) => {
                const ref = new Object3D();
                ref.add(new Mesh(geometry, material));
                ref.add(new LineSegments(edges, edgeMaterial));

                ref.position.set(...value);
                target.add(ref);
                return {
                    update: (v) => ref.position.set(...v),
                    destroy: () => target.remove(ref)
                };
            }
        })
        .node("ROOT", "map", {
            value: "box",
            action: (target, { value, pass }) => pass(target, value)
        });

    export type Data = Inspect<typeof builder>["types"]["ROOT"]["value"];
</script>

<script lang="ts">
    import { onDestroy } from "svelte";

    export let scene: Scene;
    export let data: Record<string, Data>;

    const i = builder.build(scene, data);

    $: i.update(data);
    onDestroy(() => i.destroy());
</script>
