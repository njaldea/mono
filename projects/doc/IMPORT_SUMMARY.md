# Import Summary for projects/doc/src/lib/index.ts

This file summarizes the modules re-exported by projects/doc/src/lib/index.ts.

- projects/doc/src/lib/components/navigation/utils/renamer.ts: Defines the `Renamer` type and a `renamer` function that strips a leading numeric prefix like `"12-Title"` to `"Title"`.
- projects/doc/src/lib/components/navigation/utils/sorter.ts: Defines the `Sorter` type and a `sorter` function that orders strings by numeric prefixes when present, with lexicographic fallback.
- projects/doc/src/lib/components/block/controls/types.ts: Declares control-related types like `PropType`, `Prop`, `Event`, and related aliases for control schemas.
- projects/doc/src/lib/components/layout/Layout.svelte: Core layout with navigation, content, and optional panel; supports themes, sorting/renaming, and snippet slots for title/misc/content/panel.
- projects/doc/src/lib/components/layout/DocLayout.svelte: Wrapper that accepts a `settings` object and forwards config and snippet slots to `Layout`, with a panel snippet fallback.
- projects/doc/src/lib/components/block/Instance.svelte: Manages block instance state, control context bindings, and re-render logic for slot content; provides values/events to children.
- projects/doc/src/lib/components/block/Block.svelte: Initializes block context (params/defaults/controls), uses `Base` theme, and renders children in a scrollable grid.
- projects/doc/src/lib/components/block/Template.svelte: Iterates over params to render multiple `Instance` blocks; syncs defaults and orientation, and renders the provided snippet.
- projects/doc/src/lib/components/block/Controls.svelte: Updates the controls context with provided props and events.
- projects/doc/src/lib/components/block/Params.svelte: Registers and updates parameter entries in the params store with tag and prop values.
- projects/doc/src/lib/components/layout/icons/Icon.svelte: Generic icon wrapper with sizing and hover scale animation.
- projects/doc/src/lib/components/layout/icons/Nil.svelte: SVG icon with tweened stroke length and hover-triggered toggle animation.
- projects/doc/src/lib/components/layout/icons/Theme.svelte: SVG theme icon (sun/moon) using masks; adjusts rotation and opacity for dark/light.
