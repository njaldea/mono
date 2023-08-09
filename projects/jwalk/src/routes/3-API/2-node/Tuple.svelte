<script lang="ts">
    import { tseditor } from "../../tseditor";
    const detail = {
        libs: { "@nil-/jwalk": "https://unpkg.com/@nil-/jwalk" },
        code: `import { jwalker } from "@nil-/jwalk";

const j = jwalker()
    .node("slider", "tuple", {
        value: ["number", "boolean"],
        action: (context, { value, refs, meta, auto }) => {
            return auto(() => context, () => {}, value);
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
            <td />
        </tr>
        <tr>
            <td><code>"tuple"</code></td>
            <td colspan="2" />
            <td />
        </tr>
        <tr>
            <td rowspan="2">detail</td>
            <td>action</td>
            <td>required</td>
            <td>method that describes what to do when traversing the node</td>
        </tr>
        <tr>
            <td>value</td>
            <td>required</td>
            <td><code>string[]</code> (types registered to the builder)</td>
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
            <td><code>0 | 1 | ...</code> - only for type inferencing</td>
        </tr>
        <tr>
            <td>aligned with auto create/destroy argument type</td>
        </tr>
        <tr>
            <td rowspan="2">value</td>
            <td>equivalent to value from node registration</td>
        </tr>
        <tr>
            <td><code>[T1, T2, ...]</code></td>
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
