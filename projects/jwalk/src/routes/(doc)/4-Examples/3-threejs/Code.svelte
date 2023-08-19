<script lang="ts">
    import Sandbox from "../../Sandbox.svelte";
</script>

<div>
    <Sandbox
        readonly
        code={`import { jwalker } from "@nil-/jwalk";
import {
    Object3D,
    Mesh,
    MeshBasicMaterial,
    LineBasicMaterial,
    LineSegments,
    BoxGeometry,
    EdgesGeometry
} from "three";

const geometry = new BoxGeometry(0.5, 0.5, 0.5);
const material = new MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.35 });
const edgeMaterial = new LineBasicMaterial({ color: 0xffffff });
const edges = new EdgesGeometry(geometry);

const builder = jwalker<Object3D>()
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
    .node("ROOT", "map", { value: "box" })

let data: typeof builder.types.ROOT = { a: [1, 0, 0], b: [0, 0, 0], c: [-1, 0, 0] };

// scene not included to simplify example
const j = builder.build(scene, data);

// update values
j.update(data);

// cleanup resources
j.destroy();
`}
    />
</div>

<style>
    div {
        position: relative;
        min-height: 300px;
        padding-top: 5px;
        flex: 1;
    }
</style>
