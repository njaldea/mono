<script lang="ts">
    import Example from "./Example.svelte";
</script>

<h1>jwalk</h1>

<p>
    A library that <strong>walks</strong> through JSON data following schema provided. It is a play of
    words with "jaywalk" but for JSON.
</p>

<p>A "jaywalker" is described as a pedestrian that violates the "rules".</p>
<p>
    In contrary, "jwalk" expects users to provide the "rules" to follow how to traverse the graph.
</p>

Examples in this documentation uses the following:
<ul>
    <li>
        <a href="/4-Examples/1-tsjs">typescript / javascript (manual DOM manipulation)</a>
    </li>
    <li>
        <a href="/4-Examples/2-svelte">svelte</a>
    </li>
    <li>
        <a href="/4-Examples/3-threejs">threejs</a>
    </li>
</ul>

<p>
    The only responsibility of <code>jwalk</code> is to execute the nodes by traversing the graph you
    setup yourself.
</p>

<p>
    Anything you can do inside the <code>nodes</code> is up to your imagination.
</p>

<h3>Sample usage</h3>

<Example />

<h4>Result</h4>

<pre class="language-undefined">
[GROUP]  INIT    [true, 100]
[BOOL]   INIT    true
[Number] INIT    100
[GROUP]  UPDATE  [false, 200]
[BOOL]   UPDATE  false
[Number] UPDATE  200
[Number] DESTROY
[BOOL]   DESTROY
[GROUP]  DESTROY
</pre>

<h3>Limitations</h3>

<ul>
    <li>
        Currently, data validation is expected to be done by the user before `build`/`update`.<br />
        Some considerations is to add `zod` json validation before execution of each node.
    </li>
</ul>
