<script>
    const data = [
        ['<a href="/3-API">Context</a>', "object passed forward to each node when traversing", ""],
        [
            '<a href="/3-API/1-type">Prime</a>',
            "a type supported by jwalk/builder",
            "registered through <code>builder.type(...)</code>"
        ],
        [
            '<a href="/3-API/2-node">Node</a>',
            "a type that has an equivalent action",
            "registered through <code>builder.node(...)</code>"
        ],
        [
            '<a href="/3-API/2-node">action</a>',
            "a method that represents a code to be executed for the node",
            ""
        ],
        [
            '<a href="/3-API/2-node">group</a> type',
            "a reserved type that represents a collection of items",
            `<code>"${["tuple", "object", "list", "map"].join('"</code> / <code>"')}"</code>`
        ]
    ];
</script>

<h1>Appendix</h1>

<table>
    <thead>
        <tr>
            <th>terminology</th>
            <th>description</th>
            <th>--</th>
        </tr>
    </thead>
    <tbody>
        {#each data as row}
            <tr>
                <td>{@html row[0]}</td>
                <td>{row[1]}</td>
                <td>{@html row[2]}</td>
            </tr>
        {/each}
    </tbody>
</table>
