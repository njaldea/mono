<script lang="ts">
    export let vertical: boolean;
    export let b: boolean;
    export let name: string;
</script>

<h1>{name} slot: {b ? "Secondary" : "Primary"}</h1>
{#if !b}
    <table>
        <thead>
            <tr>
                <th>property</th>
                <th>value</th>
                <th>default</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>vertical</td>
                <td>{vertical}</td>
                <td>false</td>
            </tr>
            <tr>
                <td>b (use as Primary)</td>
                <td>{"A" !== name}</td>
                <td>false</td>
            </tr>
        </tbody>
    </table>
{:else}
    <p>Will collapse when divider is double clicked.</p>
    <p>Visual indication should be visible on drag.</p>
{/if}
