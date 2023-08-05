<script lang="ts">
    import { tseditor } from "../../tseditor";
    const detail = {
        libs: { "@nil-/jwalk": "https://unpkg.com/@nil-/jwalk@0.0.6" },
        code: `import { jwalker } from "@nil-/jwalk";

const j = jwalker<null>()
    .node("other", "tuple", { value: ["number", "boolean"] })
    .node("slider", "number", {
        refs: ["other"],
        action: (context, { value, refs }) => {
            /** initialization **/
            return {
                update: (v) => { /** update  **/ },
                destroy: () => { /** cleanup **/ }
            }
        }
    });

type Primes = typeof j.primes;
type Types = typeof j.types;
`
    };
</script>

<div class="outer">
    <div class="inner" use:tseditor={detail} />
</div>

<h2>Arguments</h2>

<table>
    <thead>
        <tr>
            <th>arguments</th>
            <th colspan="2">subkeys</th>
            <th>description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>type</td>
            <td colspan="2" />
            <td>Can't be ROOT or Group type</td>
        </tr>
        <tr>
            <td>aliased type</td>
            <td colspan="2" />
            <td>prime type</td>
        </tr>
        <tr>
            <td rowspan="2">detail</td>
            <td>action</td>
            <td>required</td>
            <td>method that describes what to do when traversing the node</td>
        </tr>
        <tr>
            <td>refs</td>
            <td>optional</td>
            <td>additional actions available inside the action</td>
        </tr>
    </tbody>
</table>

<h4>action's detail</h4>

<table>
    <thead>
        <tr>
            <th>argument</th>
            <th>subkey</th>
            <th>description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>context</td>
            <td />
            <td>from <code>jwalker&ltT&gt</code></td>
        </tr>
        <tr>
            <td rowspan="2">detail</td>
            <td>value</td>
            <td>type inferred from registered alias type</td>
        </tr>
        <tr>
            <td>refs</td>
            <td>additional actions requested from node registration</td>
        </tr>
    </tbody>
</table>

<style>
    .outer {
        background-color: rgb(104, 100, 100);
        padding-block: 10px;
        width: 100%;
        height: 350px;
    }
    .inner {
        width: 100%;
        height: 100%;
    }
</style>
