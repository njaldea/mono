<script lang="ts">
    import Sandbox from "../Sandbox.svelte";
</script>

<h1>API</h1>

<p>
    <code>jwalk</code> is heavily inspired by the api of
    <a href="https://svelte.dev/docs/svelte-action">svelte actions</a>
    but is customizable to receive any type of <code>node</code> (<code>T</code> in jwalk context).
</p>

<h2><code>jwalker</code></h2>

<p><code>jwalker</code> is the main entry point in using the library.</p>

<p>
    It is a builder where users can add <code>types</code> or <code>nodes</code> to be used in the schema.
</p>

<div>
    <Sandbox
        code={`import { jwalker, memoizer, type Options } from "@nil-/jwalk";
type Context = null;

const options: Options = { memoizer };
const builder = jwalker<Context>(options);
// const builder = jwalker(options);
`}
    />
</div>

<h2>Context</h2>

<p>The generic argument of <code>jwalker</code> dictates the type of Context.</p>
<p>Context is and object passed forward when traversing the graph.</p>

<h2>Options</h2>
<h3>memoizer</h3>

<p>
    By default, jwalk does not memoize the value. This means that even if the value are the same,
    the action will be executed for every update call.
</p>

<code>jwalk</code> provides a memoizer that handles basic memoization:

<ul>
    <li>primitive types are compared</li>
    <li>objects/list types are always updated</li>
</ul>

<style>
    div {
        position: relative;
        height: 150px;
    }
</style>
