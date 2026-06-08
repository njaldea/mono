<script lang="ts">
    let {
        name
    }: {
        name: string;
    } = $props();
</script>

<h1>{name} Column</h1>
<p>Three-way split with draggable dividers.</p>
<p>Drag the dividers to resize the columns.</p>
<table>
    <thead>
        <tr>
            <th>Column</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{name}</td>
            <td>Resizable column in 3-way split layout</td>
        </tr>
    </tbody>
</table>
