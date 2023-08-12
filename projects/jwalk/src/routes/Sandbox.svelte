<script lang="ts" context="module">
</script>

<script lang="ts">
    import { tseditor } from "./tseditor";

    export let readonly = false;
    export let height: number;
    export let code: string;
    export let libs: Record<string, string> = {};
    export let update:
        | undefined
        | ((detail: { importmap: Record<string, string>; module: string }) => void) = undefined;
</script>

<div class="outer" style={`height: ${height}px`}>
    <div
        class="inner"
        use:tseditor={{
            readonly,
            code,
            libs: {
                "@nil-/jwalk": "https://unpkg.com/@nil-/jwalk",
                ...libs
            },
            update
        }}
    />
</div>

<style>
    .outer {
        background-color: rgb(104, 100, 100);
        padding: 2px;
        width: 100%;
        box-sizing: border-box;
    }
    .inner {
        width: 100%;
        height: 100%;
    }
</style>
