<script lang="ts">
    import { tseditor } from "../../tseditor";
    const detail = {
        libs: { "@nil-/jwalk": "https://unpkg.com/@nil-/jwalk" },
        code: `import { jwalker } from "@nil-/jwalk";

const j = jwalker()
    .type(
        "point",
        [
            { type: "boolean" },
            { type: "tuple", value: [ "number",  "number" ] },
        ]
    );

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
        height: 270px;
    }
    .inner {
        width: 100%;
        height: 100%;
    }
</style>
