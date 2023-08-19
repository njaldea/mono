<script lang="ts">
    import Sandbox from "../../Sandbox.svelte";
</script>

<div>
    <Sandbox
        code={`import { jwalker } from "@nil-/jwalk";

const j = jwalker()
    .node("slider", "object", {
        content: ["a:number", "b:boolean"],
        action: ({
            context,
            value, refs,
//          ^?
            meta, auto
//          ^?
        }) => {
            return auto(
                (k) => context,
//               ^?
                (k) => {},
//               ^?
                value
            );
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
            <td />
        </tr>
        <tr>
            <td><code>"object"</code></td>
            <td colspan="2" />
            <td />
        </tr>
        <tr>
            <td rowspan="3">detail</td>
            <td>action</td>
            <td>required</td>
            <td>method that describes what to do when traversing the node</td>
        </tr>
        <tr>
            <td rowspan="2">content</td>
            <td rowspan="2">required</td>
            <td><code>string[]</code> (types registered to the builder)</td>
        </tr>
        <tr>
            <td>should be in <code>key:type</code> format</td>
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
            <td>value</td>
            <td />
            <td>type inferred from registered alias type</td>
        </tr>
        <tr>
            <td>refs</td>
            <td />
            <td>additional actions requested from node registration</td>
        </tr>
        <tr>
            <td rowspan="4">meta</td>
            <td rowspan="2">keys</td>
            <td><code>"a" | "b" | ...</code> - only for type inferencing</td>
        </tr>
        <tr>
            <td>aligned with auto create/destroy argument type</td>
        </tr>
        <tr>
            <td rowspan="2">content</td>
            <td>equivalent to content from node registration</td>
        </tr>
        <tr>
            <td><code>&#x7B; a: T1, b: T2, ... &#x7D;</code></td>
        </tr>
        <tr>
            <td rowspan="2">auto</td>
            <td />
            <td>delegate node lifetime to jwalk</td>
        </tr>
        <tr>
            <td />
            <td>expects create/destroy/value</td>
        </tr>
    </tbody>
</table>

<style>
    div {
        position: relative;
        height: 480px;
    }
</style>
