<script lang="ts">
    import Sandbox from "../Sandbox.svelte";
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

<p>
    The only responsibility of <code>jwalk</code> is to execute the nodes by traversing the graph you
    setup yourself.
</p>

<p>
    Anything you can do inside the <code>nodes</code> is up to your imagination.
</p>

<h3>See <a href="/6-Sandbox">Sandbox</a> for interactive example</h3>

<h3>Limitations</h3>

<ul>
    <li>
        Currently, data validation is expected to be done by the user before `build`/`update`.<br />
        Some considerations is to add `zod` json validation before execution of each node.
    </li>
</ul>
