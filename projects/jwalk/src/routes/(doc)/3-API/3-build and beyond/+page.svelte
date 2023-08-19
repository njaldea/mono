<script lang="ts">
    import Sandbox from "../../Sandbox.svelte";
</script>

<h1><code>jwalker().build(...)</code></h1>

<p>jwalk needs to be built first before actual usage.</p>
<p><code>"ROOT"</code> node has to be registered before building.</p>

<div>
    <Sandbox
        code={`import { jwalker } from "@nil-/jwalk";

const j = jwalker()
    .node("ROOT", "map", { content: "number" })
    .build(null, { a: 100 });

j.update({ a: 100, b: 300 });

j.destroy();

type Primes = typeof j.primes;
type ROOT = typeof j.types.ROOT;
//   ^?
`}
    />
</div>

<h2>Arguments</h2>

<table>
    <thead>
        <tr>
            <th>arguments</th>
            <th>description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>context</td>
            <td>passed to the ROOT action</td>
        </tr>
        <tr>
            <td>value</td>
            <td>data to be propagated to the graph</td>
        </tr>
    </tbody>
</table>

<h2>Returns</h2>

<table>
    <thead>
        <tr>
            <th>key</th>
            <th>type</th>
            <th>description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>update</td>
            <td><pre>(v: Value) => void</pre></td>
            <td>propagate the value to the graph</td>
        </tr>
        <tr>
            <td>destroy</td>
            <td><pre>() => void</pre></td>
            <td>release resources owned</td>
        </tr>
    </tbody>
</table>

<style>
    div {
        position: relative;
        height: 280px;
    }
</style>
