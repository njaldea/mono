<script lang="ts">
    import SVG from "./SVG.svelte";
    import Line from "./Line.svelte";
    import Translate from "./transform/Translate.svelte";
    import Rotate from "./transform/Rotate.svelte";
    import Scale from "./transform/Scale.svelte";

    let x1 = -25;
    let y1 = 0;
    let x2 = 25;
    let y2 = 0;

    let tx = 0;
    let ty = 0;
    let rotation = 0;
    let sx = 1;
    let sy = 1;
</script>

<div class="top">
    <SVG>
        <Rotate rotation={rotation} x={x1} y={y1}>
            <Rotate rotation={rotation} x={x1} y={y1}>
            <Translate x={tx} y={ty}>
                <Scale x={sx} y={sy}>
                    <Line bind:x1 bind:y1 bind:x2 bind:y2></Line>
                </Scale>
            </Translate>
        </Rotate>
        </Rotate>
    </SVG>
    <div class="controls">
        <div>
            <div><span>-</span></div>
            <div><span>x</span></div>
            <div><span>y</span></div>
            <span>translate</span>
            <input type="range" min={-50} max={50} step={0.001} bind:value={tx}/>
            <input type="range" min={-50} max={50} step={0.001} bind:value={ty}/>
            <span>rotate</span>
            <input type="range" min={0} max={360} step={0.001} bind:value={rotation}/>
            <div><span>-</span></div>
            <span>scale</span>
            <input type="range" min={0.001} max={2} step={0.001} bind:value={sx}/>
            <input type="range" min={0.001} max={2} step={0.001} bind:value={sy}/>
            <span>start</span>
            <input type="range" min={-50} max={50} step={0.001} bind:value={x1}/>
            <input type="range" min={-50} max={50} step={0.001} bind:value={y1}/>
            <span>end</span>
            <input type="range" min={-50} max={50} step={0.001} bind:value={x2}/>
            <input type="range" min={-50} max={50} step={0.001} bind:value={y2}/>
        </div>
    </div>
</div>

<style>
    .top {
        height: 400px;
        width: 800px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .top > :global(svg) {
        outline: solid 1px red;
    }

    .controls {
        padding: 10px;
    }

    .controls > div {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }

    .controls > div > div {
        display: grid;
        justify-content: center;
    }
</style>