<script lang="ts">
    import { tseditor } from "../tseditor";
    const detail = {
        libs: { "@nil-/jwalk": "https://unpkg.com/@nil-/jwalk@0.0.6" },
        code: `import { jwalker, memoizer, type Options } from "@nil-/jwalk";
const options: Options = { memoizer };
const builder = jwalker<null>(options);
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
        height: 200px;
    }
    .inner {
        width: 100%;
        height: 100%;
    }
</style>
