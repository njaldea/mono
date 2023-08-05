<script lang="ts">
    import { tseditor } from "../../tseditor";
    const detail = {
        libs: { "@nil-/jwalk": "https://unpkg.com/@nil-/jwalk@0.0.6" },
        code: `import { jwalker } from "@nil-/jwalk";

const j = jwalker<null>()
    .node("ROOT", "map", { value: "number" })
    .build(null, { a: 100 });

j.update({ a: 100, b: 300 });

j.destroy();

type Primes = typeof j.primes;
type Types = typeof j.types;
`
    };
</script>

<div class="outer">
    <div class="inner" use:tseditor={detail} />
</div>

<style>
    .outer {
        background-color: rgb(104, 100, 100);
        padding-block: 10px;
        width: 100%;
        height: 190px;
    }
    .inner {
        width: 100%;
        height: 100%;
    }
</style>
