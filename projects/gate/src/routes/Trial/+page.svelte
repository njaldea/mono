<script lang="ts">
    import SVG from "./SVG.svelte";
    import Line from "./Line.svelte";

    let x1 = -25;
    let y1 = 0;
    let x2 = 25;
    let y2 = 0;

    let tx = 0;
    let ty = 0;
    let sx = 1;
    let sy = 1;
</script>


<div class="svg">
    <SVG>
        <g transform={`translate(${tx} ${ty}) scale(${sx} ${sy})`}>
            <Line bind:x1 bind:y1 bind:x2 bind:y2></Line>
        </g>
    </SVG>
</div>

<div>
    <span>translate</span>
    <input type="range" min={-50} max={50} step={0.001} bind:value={tx}/>
    <input type="range" min={-50} max={50} step={0.001} bind:value={ty}/>
</div>
<div>
    <span>scale</span>
    <input type="range" min={0.001} max={2} step={0.001} bind:value={sx}/>
    <input type="range" min={0.001} max={2} step={0.001} bind:value={sy}/>
</div>
<div>
    <span>start</span>
    <input type="range" min={-50} max={50} step={0.001} bind:value={x1}/>
    <input type="range" min={-50} max={50} step={0.001} bind:value={y1}/>
</div>
<div>
    <span>end</span>
    <input type="range" min={-50} max={50} step={0.001} bind:value={x2}/>
    <input type="range" min={-50} max={50} step={0.001} bind:value={y2}/>
</div>

<style>
    .svg {
        width: 500px;
        height: 500px;
    }

    div:not(.svg) {
        width: 500px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
</style>