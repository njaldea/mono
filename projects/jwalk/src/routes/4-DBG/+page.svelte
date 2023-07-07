<script lang="ts">
    import { jwalker } from "$lib";
    import type { Inspect } from "$lib/helpers/debug";
    // to simplify things, group types are removed from the value
    // if group type is needed, registering an alias via type() would be necessary
    // and that alias should be used instead.
    // this is done to flatten the array that represents the value.
    const b = jwalker<null>()
        .type("wtf", [{ type: "object", value: ["asd:boolean", "asw:number"] }])
        .type("fff", [
            { type: "object", value: ["b:string", "c:number", "d:number"] },
            { type: "tuple", value: ["string", "number", "wtf"] }
        ])
        .type("ffff", [{ type: "list", value: "boolean" }])
        .node("fixx", "ffff", {
            action: (c, { value }) => {
                return {
                    update: (v) => console.log("number", "update", v),
                    destroy: () => console.log("number", "destroy")
                };
            }
        })
        .node("Number", "object", {
            value: ["asd:fff", "qwe:wtf", "zxc:boolean"],
            action: (context, { value, refs, auto }) => {
                console.log("number", "init", value);
                return {
                    update: (v) => console.log("number", "update", v),
                    destroy: () => console.log("number", "destroy")
                };
            }
        })
        .node("ROOT", "map", {
            value: "number",
            action: (node, { value, refs, auto, pass }) => pass(node, value)
        });
    const j = b.build(null, { a: 1, b: 2, c: 3 });
    type Z = Inspect<typeof b>["primes"];
    type A = Inspect<typeof b>["types"];

    j.update({ a: 5, d: 8 });
    j.destroy();
</script>
