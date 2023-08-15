<script lang="ts">
    import Sandbox from "../Sandbox.svelte";
</script>

<h1>jwalk</h1>

<p>
    A library that <strong>walks</strong> through JSON data following schema provided. It is a play
    of words with "jaywalk" but for JSON, or more accurately, a
    <a href="https://d3gt.com/unit.html?rooted-trees">Rooted Tree</a>.
</p>

<p>
    A <a href="https://en.wikipedia.org/wiki/Jaywalking">jwalker</a> is described as a pedestrian
    that violates the "rules". In contrary, <code>jwalk</code> expects users to provide the "rules" to
    follow how to traverse the graph.
</p>

<p>
    The only responsibility of <code>jwalk</code> is to execute the nodes by traversing the graph you
    setup yourself.
</p>

<p>
    Anything you can do inside the <code>nodes</code> is up to your imagination.
</p>

<h3>See <a href="/6-Sandbox/1-basic">Sandbox</a> for interactive example</h3>

<h3>Limitations</h3>

<ul>
    <li>Currently, data validation is expected to be done by the user before `build`/`update`.</li>
</ul>
