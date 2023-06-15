<script lang="ts">
    import { flip } from "svelte/animate";

    import { score } from "$lib/components/navigation/utils/fuzz";
    import { getContext } from "svelte";

    import { split } from "./eval";

    const urls = getContext<string[]>("urls");
    let value = "";

    $: sorted = urls
        .map((u) => [u, score(u, value)] as [string, readonly [number, number[]]])
        .sort((l, r) => {
            if ("" !== value) {
                const lscore = l[1][0];
                const rscore = r[1][0];
                if (lscore < rscore) {
                    return +1;
                }
                if (lscore > rscore) {
                    return -1;
                }
            }
            return l[0].localeCompare(r[0]);
        });
</script>

<h1>Fuzzy Match</h1>

<div class="top">
    <div>
        <input type="text" bind:value />
        <table>
            <thead>
                <tr>
                    <th>text</th>
                    <th>score</th>
                </tr>
            </thead>
            <tbody>
                {#each sorted as [text, [value, matches]] (text)}
                    {@const selected = 0 === matches[0] ? 0 : 1}
                    <tr animate:flip={{ duration: 350 }}>
                        <td>
                            <a href={text}>
                                {#each [...split(text, matches)] as t, i (i)}
                                    <span class:selected={i % 2 === selected}>{t}</span>
                                {/each}
                            </a>
                        </td>
                        <td>{value}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    a {
        font-family: "Fira Code";
    }

    .top {
        display: grid;
        place-items: center;
    }

    input {
        width: 100%;
        margin: 0px;
        padding: 10px;
        box-sizing: border-box;
    }

    span.selected {
        background-color: red;
        color: white;
    }

    td:nth-child(2) {
        text-align: center;
    }
</style>
