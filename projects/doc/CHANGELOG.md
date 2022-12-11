# @nil-/doc

## 0.2.15

### Patch Changes

-   44a7113: [doc] added documentation for internal Container
    [doc] adjusted api for load (now `routes`)
    [doc] fix for layout group route

## 0.2.14

### Patch Changes

-   6265fa6: [doc] added Tuple and Object Controls
    [doc] added temporary internal doc

## 0.2.13

### Patch Changes

-   39dbce9: [doc] navigation now automatically opens when redirected to a route that is still collapsed

## 0.2.12

### Patch Changes

-   6c2d946: [fix] Nav now is not scrollable
    [fix] Removes Container's "reversed" flag
    [fix] Adds "secondary" flag to Container
    [fix] Changes Container slot name (primary is top or left, seconadry is bottom or right)
    [fix] load now removes routes with parameters
    [fix] Template now supports `noreset`
    [fix] Updates documentation

## 0.2.11

### Patch Changes

-   8d16322: noop

## 0.2.10

### Patch Changes

-   c6de380: [feature] container collapsing now supported
    [cleanup] styling of container now uses grid for easier handling

## 0.2.9

### Patch Changes

-   5c10f11: [fix] layout fill height

## 0.2.8

### Patch Changes

-   865eef0: Adjusted Container to allow collapsing (based on primary/secondary and double clicking the divider)

## 0.2.7

### Patch Changes

-   a286896: Removed fonts to css
    Moved common style to css files
    Moved static in src
    Moved Controls to its own component
    Scoped styles by `nil-doc` prefix
    Fixed css reset for Layout and Block
    Allow filtering after renaming (url paths)
    Added title to +layout.svelte
    Updated layout documentation
    Update dependencies

## 0.1.0

### Minor Changes

-   Alpha release
