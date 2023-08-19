```svelte
<script>
    import { editor, viewer } from "../actions";
    import { onMount } from "svelte";
    import jsonpointer from "jsonpointer";

    let mounted = false;
    let json = {
        subgroup: { 123: [3, 2] },
        point: [1, 2],
        point35: [3, 5]
    };

    const notify = (path, value) => {
        if (mounted) {
            console.log("change", path, value);
            jsonpointer.set(json, path, value);
            json = json;
        }
    };
    const edetail = { notify, key: "Edit" };
    const eaction = (target, value) => {
        return editor().build({ target, detail: edetail }, value);
    };

    const vdetail = { notify, key: "View" };
    const vaction = (target, value) => {
        return viewer().build({ target, detail: vdetail }, value);
    };

    onMount(() => (mounted = true));
</script>

<h2>demo</h2>

<div>
    <div use:vaction={json} />
    <div use:eaction={json} />
</div>
```
