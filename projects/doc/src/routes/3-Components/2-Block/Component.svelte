<script lang="ts">
    export let tag: string;
    export let vText: string;
    export let vNumber: number;
    export let vRange: number;
    export let vSelect: string;
    export let vSwitch: boolean;
    export let vArray: [number, string, boolean, ...any];

    type OType = { vText: string; vNumber: number; vSwitch: boolean };
    export let vObject: undefined | OType = undefined;
    export let vDefaulted = "default value";
</script>

<div>
    <table>
        <tr><th>{tag}</th><th>Value</th></tr>
        <tr><td>vText</td><td>{vText}</td></tr>
        <tr><td>vNumber</td><td>{vNumber}</td></tr>
        <tr><td>vRange</td><td>{vRange}</td></tr>
        <tr><td>vSelect</td><td>{vSelect}</td></tr>
        <tr><td>vSwitch</td><td>{vSwitch}</td></tr>
        <tr><td>vArray</td><td><pre>{JSON.stringify(vArray, null, 4)}</pre></td></tr>
        <tr><td>vObject</td><td><pre>{JSON.stringify(vObject, null, 4)}</pre></td></tr>
        <tr><td>vDefaulted</td><td>{vDefaulted}</td></tr>
    </table>
</div>

<style>
    div {
        width: 100%;
        height: 100%;
        display: grid;
        box-sizing: border-box;
        justify-items: center;
        align-items: center;
    }

    div > table {
        margin: 20px;
    }

    pre {
        background-color: transparent;
        padding: 5px;
        margin: 0px;
    }
</style>
