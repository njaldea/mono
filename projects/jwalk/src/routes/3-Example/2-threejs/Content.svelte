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
            value: [{ type: "number" }, { type: "number" }, { type: "number" }] as const,
            action: (target, { value }) => {
                const ref = new Object3D();
                const mesh = new Mesh(geometry, material);
                const edge = new LineSegments(edges, edgeMaterial);

                ref.add(mesh);
                ref.add(edge);

                ref.position.set(...value);
                target.add(ref);
                return {
                    update: (v) => ref.position.set(...v),
                    destroy: () => target.remove(mesh)
                };
            }
        })
        .node("ROOT", "object", {
            value: [
                { type: "box", key: "a" },
                { type: "box", key: "b" },
                { type: "box", key: "c" }
            ] as const,
            action: (target, { value, action }) => {
                const obj = new Object3D();
                target.add(obj);
                return action(obj, value);
            }
        });

    export type Data = Inspect<typeof builder>["types"]["ROOT"]["value"];
</script>

<script lang="ts">
    import { onDestroy } from "svelte";

    export let scene: Scene;
    export let data: Data;

    const i = builder.build(scene, data);

    $: i.update(data);
    onDestroy(() => i.destroy());
</script>
