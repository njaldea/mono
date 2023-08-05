<script lang="ts">
    import Example from "./Example.svelte";
</script>

<h1><code>jwalker().type(...)</code></h1>

<Example />

<br />

These types are will be called <code>Prime</code> types which can be used all through out the
builder.

<code>Prime</code> types available by default:
<ul>
    <li>"number" as <code>number</code></li>
    <li>"boolean" as <code>boolean</code></li>
    <li>"string" as <code>string</code></li>
</ul>

<h3>Arguments</h3>
<ul>
    <li>type</li>
    <li>list of types detail</li>
</ul>

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
            <td><pre><code>{"{\n  type: string;\n  value?: string[];\n}[]"}</code></pre></td>
            <td
                ><pre><code
                        >{JSON.stringify(
                            [{ type: "boolean" }, { type: "tuple", value: ["boolean", "string"] }],
                            null,
                            2
                        )}</code
                    ></pre></td
            >
            <td>
                <code>type</code> is any prime types already registered to jwalk<br />
                <code>value</code> is optional and only required for group types<br />
            </td>
        </tr>
    </tbody>
</table>
