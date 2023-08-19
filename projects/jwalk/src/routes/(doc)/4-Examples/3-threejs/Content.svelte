<script lang="ts" context="module">
    import { jwalker, memoizer } from "$lib";
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
    const material = new MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.35 });
    const edgeMaterial = new LineBasicMaterial({ color: 0xffffff });
    const edges = new EdgesGeometry(geometry);

    const builder = jwalker<Object3D>({ memoizer })
        .type("position", [{ type: "tuple", content: ["number", "number", "number"] }])
        .node("box", "position", {
            action: ({ context, value }) => {
                const ref = new Object3D();
                ref.add(new Mesh(geometry, material));
                ref.add(new LineSegments(edges, edgeMaterial));

                ref.position.set(...value);
                context.add(ref);
                return {
                    update: (v) => ref.position.set(...v),
                    destroy: () => context.remove(ref)
                };
            }
        })
        .node("ROOT", "map", { content: "box" });

    export type Data = typeof builder.types.ROOT;
</script>

<script lang="ts">
    import { onDestroy } from "svelte";

    export let scene: Scene;
    export let data: Data;

    const i = builder.build(scene, data);

    $: i.update(data);
    onDestroy(() => i.destroy());
</script>
