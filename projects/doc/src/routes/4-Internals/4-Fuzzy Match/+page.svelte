<script lang="ts">
    import { score } from "$lib/components/navigation/utils/fuzz";
    import { getContext } from "svelte";

    const urls = getContext<string[]>("urls");
    let value = "";
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
                {#each urls as text (text)}
                    {@const [values, matches] = score(text, value)}
                    <tr>
                        <td>
                            <a href={text}>
                                {#if 0 === value.length}
                                    {text}
                                {:else}
                                    <!-- this is expensive as it is highlighting one character at a time -->
                                    {#each text as c, i (i)}
                                        {#if matches.includes(i)}
                                            <span>{c}</span>
                                        {:else}
                                            {c}
                                        {/if}
                                    {/each}
                                {/if}
                            </a>
                        </td>
                        <td>{values}</td>
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

    span {
        background-color: red;
        color: white;
    }

    td:nth-child(2) {
        text-align: center;
    }
</style>
