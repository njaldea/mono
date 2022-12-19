<script lang="ts">
    import SVG from "./SVG.svelte";
    import Line from "./Line.svelte";

    let x1 = -25;
    let y1 = 0;
    let x2 = 25;
    let y2 = 0;

    let tx = 50;
    let ty = 50;
    let sx = 1;
    let sy = 1;
</script>


<div>
    <SVG>
        <g transform={`translate(${tx} ${ty}) scale(${sx} ${sy})`}>
            <Line bind:x1 bind:y1 bind:x2 bind:y2></Line>
        </g>
    </SVG>
</div>

<input type="range" min={-100} max={100} step={0.001} bind:value={tx}/>
<input type="range" min={-100} max={100} step={0.001} bind:value={ty}/>
<input type="range" min={0.001} max={2} step={0.001} bind:value={sx}/>
<input type="range" min={0.001} max={2} step={0.001} bind:value={sy}/>
<input type="range" min={0} max={100} step={0.001} bind:value={x1}/>
<input type="range" min={0} max={100} step={0.001} bind:value={y1}/>
<input type="range" min={0} max={100} step={0.001} bind:value={x2}/>
<input type="range" min={0} max={100} step={0.001} bind:value={y2}/>

<style>
    div {
        width: 500px;
        height: 500px;
    }
</style>