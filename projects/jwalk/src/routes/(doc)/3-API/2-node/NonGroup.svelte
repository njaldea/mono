<script lang="ts">
    import Sandbox from "../../Sandbox.svelte";
</script>

<div>
    <Sandbox
        code={`import { jwalker } from "@nil-/jwalk";

const j = jwalker()
    .node("other", "tuple", { content: ["number", "boolean"] })
    .node("slider", "number", {
        refs: ["other"],
        action: ({
            context,
            value,
//          ^?
            refs
        }) => {
            return {
                update: (v) => {},
//                       ^?
                destroy: () => {}
            };
        }
    });

type Primes = typeof j.primes;
type Slider = typeof j.types.slider;
//   ^?
`}
    />
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

<h4>action's arg</h4>

<table>
    <thead>
        <tr>
            <th>key</th>
            <th>description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>context</td>
            <td>from <code>jwalker&ltT&gt</code></td>
        </tr>
        <tr>
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
    div {
        position: relative;
        height: 480px;
    }
</style>
