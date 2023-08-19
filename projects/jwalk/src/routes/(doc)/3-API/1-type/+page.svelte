<script lang="ts">
    import Sandbox from "../../Sandbox.svelte";
</script>

<h1><code>jwalker().type(...)</code></h1>

<div>
    <Sandbox
        code={`import { jwalker } from "@nil-/jwalk";

const j = jwalker()
    .type(
        "point",
        [
            { type: "boolean" },
            { type: "tuple", content: [ "number",  "number" ] },
        ]
    );

type Primes = typeof j.primes;
//   ^?
type Point = typeof j.types.point;
//   ^?
`}
    />
</div>

<br />

<p>Any type registered through this API is going to be called <code>Prime</code> type.</p>

<p><code>Prime</code> types available by default:</p>
<ul>
    <li>"number" as <code>number</code></li>
    <li>"boolean" as <code>boolean</code></li>
    <li>"string" as <code>string</code></li>
</ul>

<h3>Arguments</h3>

<table>
    <thead>
        <tr>
            <th>argument</th>
            <th>description</th>
            <th>type</th>
            <th>example</th>
            <th />
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>type</td>
            <td>name of the new prime type to be registered</td>
            <td><pre><code>{"string"}</code></pre></td>
            <td><pre><code>"point"</code></pre></td>
            <td>
                <pre>
                    <code>
Invalid values
---
"ROOT"
"list"
"tuple"
"map"
"object"
                    </code>
                </pre>
            </td>
        </tr>
        <tr>
            <td>detail</td>
            <td>list of descriptors that will indicate the type of the alias</td>
            <td><pre><code>{"{\n    type: string;\n    content?: string[];\n}[]"}</code></pre></td>
            <td
                ><pre><code
                        >{JSON.stringify(
                            [
                                { type: "boolean" },
                                { type: "tuple", content: ["boolean", "string"] }
                            ],
                            null,
                            4
                        )}</code
                    ></pre></td
            >
            <td>
                <code>type</code> is any prime types already registered to jwalk<br />
                <code>content</code> is only required for group types<br />
            </td>
        </tr>
    </tbody>
</table>

<style>
    div {
        position: relative;
        height: 320px;
    }
</style>
