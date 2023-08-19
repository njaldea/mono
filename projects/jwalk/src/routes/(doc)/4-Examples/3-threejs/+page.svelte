<script lang="ts" context="module">
    import Three from "./Three.svelte";
    import Content from "./Content.svelte";
    import type { Data } from "./Content.svelte";
</script>

<script lang="ts">
    import Code from "./Code.svelte";

    let canvas: HTMLCanvasElement;
    let data = `{
    "a": [1, 0, 0],
    "b": [0, 0, 0],
    "c": [-1, 0, 0]
}`;
    let currentData: Data = {
        a: [0, 0, 0],
        b: [0, 0, 0],
        c: [0, 0, 0]
    };

    const jsonify = (d: string) => {
        try {
            const tmp = JSON.parse(d) as Data;
            for (const v of Object.values(tmp)) {
                if (v.length !== 3) {
                    throw new Error("invalid data");
                }
            }
            currentData = tmp;
        } catch {}
        return currentData as Data;
    };
</script>

<h1>threejs</h1>

<div>
    <canvas bind:this={canvas} />
    <textarea bind:value={data} />
</div>
{#if canvas}
    <Three {canvas} let:scene>
        <Content data={jsonify(data)} {scene} />
    </Three>
{/if}

<Code />

<style>
    div {
        display: grid;
        grid-template-columns: 500px minmax(200px, auto);
        grid-auto-flow: column;
        gap: 4px;
    }
    canvas {
        width: 500px;
        height: 300px;
        outline: solid 1px gray;
    }
    textarea {
        resize: none;
        padding: 10px;
        box-sizing: border-box;
    }
</style>
