<script lang="ts">
    import Example from "./Example.svelte";
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

<Example />

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
