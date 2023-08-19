<script lang="ts" context="module">
    declare const __VERSION__: string;
    const version = __VERSION__;
</script>

<script lang="ts">
    import { tseditor } from "./tseditor";
    import type { Update } from "./tseditor";

    export let readonly = false;
    export let code: string;
    export let libs: Record<string, string> = {};
    export let update: undefined | Update = undefined;
</script>

<div class="outer">
    <div
        class="inner"
        use:tseditor={{
            readonly,
            code,
            libs: {
                "@nil-/jwalk": `https://unpkg.com/@nil-/jwalk@${version}`,
                ...libs
            },
            update
        }}
    />
</div>

<style>
    .outer {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgb(104, 100, 100);
        padding: 2px;
        box-sizing: border-box;
    }
    .inner {
        width: 100%;
        height: 100%;
    }
</style>
