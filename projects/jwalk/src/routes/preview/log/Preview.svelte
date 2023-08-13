<script lang="ts">
    export let logs: string[][];

    $: widths = logs.reduce<number[]>((accumulator, v) => {
        while (v.length > accumulator.length) {
            accumulator.push(0);
        }
        v.forEach((v, i) => {
            accumulator[i] = Math.max(accumulator[i], v.length);
        });
        return accumulator;
    }, []);
</script>

<pre>{logs
        .map((log) =>
            log
                .map((v, i) =>
                    i === 0 ? v.padStart(widths[i], " ") : v.padEnd(widths[i] + 1, " ")
                )
                .join(" ")
        )
        .join("\n")}</pre>

<style>
    :global(html, body) {
        width: 100%;
        height: 100%;
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        color: white;
        background-color: #1e1e1e;
    }

    :global(body) {
        overflow: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    :global(body::-webkit-scrollbar) {
        display: none;
    }

    pre {
        margin: 0px;
        height: 100%;
        box-sizing: border-box;
    }
</style>
