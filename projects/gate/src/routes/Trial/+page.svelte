<script lang="ts">
    import SVG from "./svg/SVG.svelte";
    import Line from "./svg/Line.svelte";
    import Translate from "./svg/transform/Translate.svelte";
    import Scale from "./svg/transform/Scale.svelte";
    import Circle from "./svg/Circle.svelte";

    let x1 = -25;
    let y1 = 0;
    let x2 = 25;
    let y2 = 0;

    let tx = 0;
    let ty = 0;
    let sx = 1;
    let sy = 1;

    // work around until svelte supports container query
    let width: number;

    type EventDetail = { x: number; y: number };
    type Event = CustomEvent<EventDetail>;
    type Callback = (e: Event) => void;

    let lines: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }[] = [];
    let starting: EventDetail | null = null;

    const create: Callback = (e) => (starting = { x: e.detail.x, y: e.detail.y });

    const release: Callback = (e) => {
        if (starting != null) {
            lines = [
                ...lines,
                {
                    x1: starting.x,
                    y1: starting.y,
                    x2: e.detail.x,
                    y2: e.detail.y
                }
            ];
            starting = null;
        }
    };

    const cancel = () => (starting = null);
</script>

<div class="wrap">
    <div bind:clientWidth={width} class:vertical={width < 800} class="content">
        <div class="svg">
            <SVG on:engage={create} on:confirm={release} on:cancel={cancel}>
                <Translate x={tx} y={ty}>
                    <Scale x={sx} y={sy}>
                        <Line bind:x1 bind:y1 bind:x2 bind:y2 movable />
                    </Scale>
                </Translate>
                {#each lines as line, i (i)}
                    <Line {...line} />
                {/each}
                {#if starting != null}
                    <Circle x={starting.x} y={starting.y} />
                {/if}
            </SVG>
        </div>
        <div class="controls">
            <div class="header">-</div>
            <div class="header">x</div>
            <div class="header">y</div>
            <span>translate</span>
            <input type="range" min={-50} max={50} step={0.001} bind:value={tx} />
            <input type="range" min={-50} max={50} step={0.001} bind:value={ty} />
            <span>scale</span>
            <input type="range" min={0.001} max={2} step={0.001} bind:value={sx} />
            <input type="range" min={0.001} max={2} step={0.001} bind:value={sy} />
            <span>p1</span>
            <input type="range" min={-50} max={50} step={0.001} bind:value={x1} />
            <input type="range" min={-50} max={50} step={0.001} bind:value={y1} />
            <span>p2</span>
            <input type="range" min={-50} max={50} step={0.001} bind:value={x2} />
            <input type="range" min={-50} max={50} step={0.001} bind:value={y2} />
        </div>
    </div>
</div>

<style>
    .wrap {
        width: 100%;
        height: 100%;
    }

    .content {
        width: 800px;
        height: 400px;
        display: grid;
        grid-template-columns: 400px;
        grid-template-rows: 400px;
    }

    .content.vertical {
        width: 400px;
        height: 800px;
        grid-template-columns: 400px;
        grid-template-rows: 400px 400px;
    }

    .svg {
        width: 100%;
        height: 100%;
        outline: solid 1px red;
    }

    .controls {
        display: grid;
        padding: 10px;
        align-items: center;
        grid-auto-rows: 25px;
        grid-template-columns: 1fr 2fr 2fr;
    }

    input {
        width: 100%;
        height: 100%;
    }

    .header {
        margin: auto;
    }
</style>
