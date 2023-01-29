# @nil-/doc

## 0.2.49

### Patch Changes

-   [doc][fix] fix range number formatting ([#83](https://github.com/njaldea/mono/pull/83))

## 0.2.48

### Patch Changes

-   [doc][fix] Fix type support ([#81](https://github.com/njaldea/mono/pull/81))

## 0.2.47

### Patch Changes

-   [doc][docu] minor adjustments to documentation ([#79](https://github.com/njaldea/mono/pull/79))

-   [doc][new] added support for flattened prop schema ([#79](https://github.com/njaldea/mono/pull/79))

## 0.2.46

### Patch Changes

-   [doc][break] added event control support ([#77](https://github.com/njaldea/mono/pull/77))

## 0.2.45

### Patch Changes

-   [doc][fix] keep control state when disabled after tuple/object parent toggles expand #[75](https://github.com/njaldea/mono/issues/75) ([#74](https://github.com/njaldea/mono/pull/74))

## 0.2.44

### Patch Changes

-   [doc][new] tuple and object controls now collapsible without disabling ([#72](https://github.com/njaldea/mono/pull/72))

## 0.2.43

### Patch Changes

-   [doc][fix] disable Range.svelte tooltip when disabled ([#70](https://github.com/njaldea/mono/pull/70))

-   [doc][new] added auto scroll when content of layout is only one component ([#70](https://github.com/njaldea/mono/pull/70))

## 0.2.42

### Patch Changes

-   [doc][new] added theme store in sveltekit to retain used theme ([#67](https://github.com/njaldea/mono/pull/67))

## 0.2.41

### Patch Changes

-   [doc][docu] added page for fuzzy matching ([#65](https://github.com/njaldea/mono/pull/65))

## 0.2.40

### Patch Changes

-   [doc][new] added scale flag prop for Instance/Template componen ([#63](https://github.com/njaldea/mono/pull/63))

-   [doc][patch] fixed jsdoc link for public components ([#63](https://github.com/njaldea/mono/pull/63))

-   [doc][docu] moved Sorting and Renaming section to their own pages ([#63](https://github.com/njaldea/mono/pull/63))

-   [doc][new] added placeholder to search bar ([#63](https://github.com/njaldea/mono/pull/63))

-   [doc][docu] added admonitions plugin ([#63](https://github.com/njaldea/mono/pull/63))

## 0.2.39

### Patch Changes

-   [doc][fix] force state of navigation expand icon when filtering ([#61](https://github.com/njaldea/mono/pull/61))

-   [doc][patch] tighter eslint ([#61](https://github.com/njaldea/mono/pull/61))

-   [doc][patch] added tests for non-UI related code ([#61](https://github.com/njaldea/mono/pull/61))

-   [doc][patch] moved type definition ([#61](https://github.com/njaldea/mono/pull/61))

-   [doc][patch] enabled typescript eslint rules ([#61](https://github.com/njaldea/mono/pull/61))

## 0.2.38

### Patch Changes

-   [doc][new] added fuzzy match for nav filter ([#59](https://github.com/njaldea/mono/pull/59))

## 0.2.37

### Patch Changes

-   [doc][fix] params prop is now reactive ([#57](https://github.com/njaldea/mono/pull/57))
-   [doc][docu] added component documentation link to deployment ([#57](https://github.com/njaldea/mono/pull/57))
-   [doc][patch] removed inRoot ([#57](https://github.com/njaldea/mono/pull/57))
-   [doc][patch] refactored Instance/Template/Params ([#57](https://github.com/njaldea/mono/pull/57))

## 0.2.36

### Patch Changes

-   [doc][fix] color changes and transition ([#55](https://github.com/njaldea/mono/pull/55))
-   [doc][patch] added html meta details ([#55](https://github.com/njaldea/mono/pull/55))

## 0.2.35

### Patch Changes

-   [doc][break] changed Control "side" flag to "position" prop ([#53](https://github.com/njaldea/mono/pull/53))
-   [doc][new] added nil icon ([#53](https://github.com/njaldea/mono/pull/53))

## 0.2.34

### Patch Changes

-   [doc][new] added Control hide property ([#51](https://github.com/njaldea/mono/pull/51))
    [doc][break] renamed Control expand property to hide
    [doc][break] Control now defaults to show

## 0.2.33

### Patch Changes

-   [doc][patch] update formatting (camel case use) ([#49](https://github.com/njaldea/mono/pull/49))

## 0.2.32

### Patch Changes

-   [doc][new] relaxed file extension for sveltekit helper ([#47](https://github.com/njaldea/mono/pull/47))

## 0.2.31

### Patch Changes

-   [doc][patch] better container style ([#45](https://github.com/njaldea/mono/pull/45))
-   [doc][patch] improved ThemeIcon ([#45](https://github.com/njaldea/mono/pull/45))

## 0.2.30

### Patch Changes

-   [doc] Added color transition in Layout ([#43](https://github.com/njaldea/mono/pull/43))

-   [doc] added Instance component ([#43](https://github.com/njaldea/mono/pull/43))

## 0.2.29

### Patch Changes

-   [doc][feature] ThemeIcon ([#41](https://github.com/njaldea/mono/pull/41))
    [doc][feature] added top bar to separate title and other controls

## 0.2.28

### Patch Changes

-   [doc][fix] reorder css style ([#37](https://github.com/njaldea/mono/pull/37))

## 0.2.27

### Patch Changes

-   [doc][fix] fix fira code css import ([#35](https://github.com/njaldea/mono/pull/35))

## 0.2.26

### Patch Changes

-   [doc][docu] removed fallback page in documentation ([#30](https://github.com/njaldea/mono/pull/30))

## 0.2.25

### Patch Changes

-   186187c: [doc][new] removed layout slot prop for content. all unnamed slots will be part of the default slot
-   186187c: [doc][fix] fix range tooltip styling
-   a82c0de: [doc][new] support dark/light mode

## 0.2.24

### Patch Changes

-   782e6fa: [doc][new] simplified sveltekit glue layer
-   782e6fa: [doc][docu] added documentation to public methods

## 0.2.23

### Patch Changes

-   5655f86: [doc][new] added slot prop `key` to Template component
-   5655f86: [doc][patch] moved some devDependencies to peerDependencies

## 0.2.22

### Patch Changes

-   3ce0a62: [doc][new] support for touch event via pointerevent (draggable container)

## 0.2.21

### Patch Changes

-   0398a72: [doc][fix] remove dependency on box-sizing
-   0398a72: [doc][fix] control min width
-   0398a72: [doc][new] made template configurable by column prop

## 0.2.20

### Patch Changes

-   3eee0ce: [doc][fix] removed setting of margin/padding
-   3eee0ce: [doc][fix] only propagate box-sizing (inherit)

## 0.2.19

### Patch Changes

-   1dad00f: [doc][fix] removed external css. inlined css even duplicating some of them.

## 0.2.18

### Patch Changes

-   a63dd42: [doc][fix] added tooltip for range

## 0.2.17

### Patch Changes

-   af86341: [doc][fix] moved default mapping in a common lib
-   af86341: [doc][fix] fix typing
-   af86341: [doc][patch] if Param's tag is not provided, use stringified id

## 0.2.16

### Patch Changes

-   650eb4b: [doc][fix] revived proper ordering of params
-   650eb4b: [doc][new] each param now has its own defaults (which is resolved from template's default and pram's props)

## 0.2.15

### Patch Changes

-   44a7113: [doc][docu] added documentation for internal Container
-   44a7113: [doc][new] adjusted api for load (now `routes`)
-   44a7113: [doc][fix] fix for layout group route

## 0.2.14

### Patch Changes

-   6265fa6: [doc][new] added Tuple and Object Controls
-   6265fa6: [doc][docu] added temporary internal doc

## 0.2.13

### Patch Changes

-   39dbce9: [doc][new] navigation now automatically opens when redirected to a route that is still collapsed

## 0.2.12

### Patch Changes

-   6c2d946: [doc][fix] Nav now is not scrollable
-   6c2d946: [doc][fix] Removes Container's "reversed" flag
-   6c2d946: [doc][fix] Adds "secondary" flag to Container
-   6c2d946: [doc][fix] Changes Container slot name (primary is top or left, seconadry is bottom or right)
-   6c2d946: [doc][fix] load now removes routes with parameters
-   6c2d946: [doc][fix] Template now supports `noreset`
-   6c2d946: [doc][fix] Updates documentation

## 0.2.10

### Patch Changes

-   c6de380: [doc][new] container collapsing now supported
-   c6de380: [doc][patch] styling of container now uses grid for easier handling

## 0.2.9

### Patch Changes

-   5c10f11: [doc][patch] layout fill height

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
