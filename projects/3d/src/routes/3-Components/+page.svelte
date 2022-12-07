<script lang="ts">
    import Canvas from "./Canvas.svelte";

    let target = "";
    let intensity = 0.3;
    let direction = [0, 1, 0] as [number, number, number];
    let position = [0, 0.5, 0] as [number, number, number];
    let rotation = [0, 0, 0] as [number, number, number];
    let scaling = [5, 5, 5] as [number, number, number];
    let color = [1, 0, 0] as [number, number, number];
    let toggle = false;
    let materialID: "standard";
</script>

<div class="canvas">
    <Canvas
        id="main"
        target={target}
        intensity={intensity}
        direction={direction}
        position={position}
        rotation={rotation}
        scaling={scaling}
        color={color}
        toggle={toggle}
        materialID={materialID}
    />
</div>

<br/>

<div class="controls">
    <div>
        <select bind:value={target}>
            {#each ["", "box1", "box2", "box3", "box4", "group1"] as id}
                <option value={id}>
                    {id}
                </option>
            {/each}
        </select>
        <button on:click={() => (toggle = !toggle)}>{toggle}</button>
        <select bind:value={materialID}>
            {#each ["standard", "grid"] as id}
                <option value={id}>
                    {id}
                </option>
            {/each}
        </select>
    </div>
    <div>color</div>
    <div>
        <input type="range" min="0" max="1" step="0.01" bind:value={color[0]} />
        <input type="range" min="0" max="1" step="0.01" bind:value={color[1]} />
        <input type="range" min="0" max="1" step="0.01" bind:value={color[2]} />
    </div>
    <div>intensity</div>
    <input type="range" min="0" max="1" step="0.01" bind:value={intensity} />
    <div>direction</div>
    <div>
        <input type="range" min="-10" max="10" step="0.01" bind:value={direction[0]} />
        <input type="range" min="-10" max="10" step="0.01" bind:value={direction[1]} />
        <input type="range" min="-10" max="10" step="0.01" bind:value={direction[2]} />
    </div>
    <div>position</div>
    <div>
        <input type="range" min="-10" max="10" step="0.01" bind:value={position[0]} />
        <input type="range" min="-10" max="10" step="0.01" bind:value={position[1]} />
        <input type="range" min="-10" max="10" step="0.01" bind:value={position[2]} />
    </div>
    <div>rotation</div>
    <div>
        <input type="range" min="-10" max="10" step="0.01" bind:value={rotation[0]} />
        <input type="range" min="-10" max="10" step="0.01" bind:value={rotation[1]} />
        <input type="range" min="-10" max="10" step="0.01" bind:value={rotation[2]} />
    </div>
    <div>scaling</div>
    <div>
        <input type="range" min="0.001" max="10" step="0.01" bind:value={scaling[0]} />
        <input type="range" min="0.001" max="10" step="0.01" bind:value={scaling[1]} />
        <input type="range" min="0.001" max="10" step="0.01" bind:value={scaling[2]} />
    </div>
</div>

<style>
    div {
        user-select: none;
    }

    .canvas {
        height: 500px;
    }

    .controls {
        margin: auto;
        display: grid;
    }

    .controls > div {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2px;
    }
</style>