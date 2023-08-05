In this example, there are two actions provided.

-   viewer
-   editor

These will be used for two separate `jwalk` instance.

### utility

```ts
const toSvelteAction = (component: SvelteComponent) => ({
    update: (value) => component.$set({ value }),
    destroy: () => component.$destroy()
});
```

### viewer

```ts
export const viewer = () => {
    return jwalker<Node>()
        .node("Point", "tuple", {
            value: ["number", "number"],
            action: ({ context, target }, { value }) => {
                return toSvelteAction(
                    new VPoint({
                        target,
                        props: { value: value, context }
                    })
                );
            }
        })
        .node("Group", "object", {
            value: ["123:Point"],
            action: ({ target, context }, { value, refs, meta }) => {
                return toSvelteAction(
                    new Object({
                        target,
                        props: { value, keys: meta.value, refs, context }
                    })
                );
            }
        })
        .node("ROOT", "object", {
            value: ["subgroup:Group", "point:Point", "point35:Point"],
            action: ({ target, context }, { value, refs, meta }) => {
                return toSvelteAction(
                    new Object({
                        target,
                        props: { value, keys: meta.value, refs, context }
                    })
                );
            }
        });
};
```

### editor

```ts
export const editor = () => {
    jwalker<Node>()
        .node("Point", "tuple", {
            value: ["number", "number"],
            action: ({ context, target }, { value }) => {
                return toSvelteAction(
                    new EPoint({
                        target,
                        props: { value, context }
                    })
                );
            }
        })
        .node("Group", "object", {
            value: ["123:Point"],
            action: ({ target, context }, { value, refs, meta }) => {
                return toSvelteAction(
                    new Object({
                        target,
                        props: { value, keys: meta.value, refs, context }
                    })
                );
            }
        })
        .node("ROOT", "object", {
            value: ["subgroup:Group", "point:Point", "point35:Point"],
            action: ({ target, context }, { value, refs, meta }) => {
                return toSvelteAction(
                    new Object({
                        target,
                        props: { value, keys: meta.value, refs, context }
                    })
                );
            }
        });
};
```
