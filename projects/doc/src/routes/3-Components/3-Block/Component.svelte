<script lang="ts">
    type OType = { vText: string; vNumber: number; vToggle: boolean; vAny: any; };

    let {
        tag,
        vText,
        vColor,
        vNumber,
        vRange,
        vSelect,
        vToggle,
        vArray,
        vObject,
        vDefaulted = "default value",
        left_click,
        l_click_detail,
        right_click,
        r_click_detail
    }: {
        tag: string;
        vText: string;
        vColor: string;
        vNumber: number;
        vRange: number;
        vSelect: string;
        vToggle: boolean;
        vArray: [number, string, boolean, ...any];
        vObject?: OType;
        vDefaulted?: string;
        left_click?: () => void;
        l_click_detail?: () => void;
        right_click?: () => void;
        r_click_detail?: () => void;
    } = $props();
</script>

<div
    onclick={() => {
        left_click?.();
        l_click_detail?.();
    }}
    oncontextmenu={(e) => {
        e.preventDefault();
        right_click?.();
        r_click_detail?.();
    }}
    onkeypress={null}
    role="none"
>
    <table>
        <thead>
            <tr><th>{tag}</th><th>Value</th></tr>
        </thead>
        <tbody>
            <tr><td>vText</td><td>{vText}</td></tr>
            <tr><td>vColor</td><td>{vColor}</td></tr>
            <tr><td>vNumber</td><td>{vNumber}</td></tr>
            <tr><td>vRange</td><td>{vRange}</td></tr>
            <tr><td>vSelect</td><td>{vSelect}</td></tr>
            <tr><td>vToggle</td><td>{vToggle}</td></tr>
            <tr><td>vArray</td><td><pre>{JSON.stringify(vArray, null, 4)}</pre></td></tr>
            <tr><td>vObject</td><td><pre>{JSON.stringify(vObject, null, 4)}</pre></td></tr>
            <tr><td>vDefaulted</td><td>{vDefaulted}</td></tr>
        </tbody>
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

    tr > td > pre {
        background-color: transparent;
        padding: 5px;
        margin: 0px;
    }
</style>
