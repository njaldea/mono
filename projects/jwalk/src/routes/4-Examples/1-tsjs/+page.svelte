<script lang="ts">
    import type { UpdateArg } from "../../tseditor";
    import { content } from "./view";
    import Code from "./Code.svelte";

    let cc: UpdateArg = {
        importmap: {},
        module: ""
    };
    const update = (detail: UpdateArg) => (cc = detail);
</script>

<h1>ts/js</h1>

<hr />

<iframe title="view" srcdoc={content(cc)} frameBorder="0"></iframe>

<Code {update} />

<style>
    iframe {
        width: 100%;
        height: 203px;
        outline: 2px solid rgb(104, 100, 100);
    }
</style>
