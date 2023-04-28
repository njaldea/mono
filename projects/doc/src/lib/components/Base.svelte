<script lang="ts">
    export let dark = false;
    export let fill = false;
</script>

<div class:dark class:fill>
    <slot />
</div>

<!-- prettier-ignore -->
<style>
    div {
        font-family: var(--nil-doc-font-family, ""), Consolas, Courier, 'Courier New', monospace;
    }

    .fill {
        width: 100%;
        height: 100%;
    }

    div {
        --i-nil-doc-color: var(--nil-doc-color, hsl(0, 0%, 0%));
        --i-nil-doc-color-scheme: var(--nil-doc-color-scheme, light);

        --i-nil-doc-bg-color: var(--nil-doc-bg-color, hsl(0, 0%, 98%));
        --i-nil-doc-content-outline-color: var(--nil-doc-content-outline-color, hsla(0, 0%, 0%, 0.3));

        --i-nil-doc-block-bg-color: var(--nil-doc-block-bg-color, hsla(0, 0%, 98%, 0.3));
        --i-nil-doc-block-outline-color: var(--nil-doc-block-outline-color, hsla(0, 0%, 0%, 0.3));

        --i-nil-doc-container-p: var(--nil-doc-container-p, hsl(0, 2%, 70%));
        --i-nil-doc-container-s: var(--nil-doc-container-s, hsl(0, 0%, 0%));

        --i-nil-doc-controls-p: var(--nil-doc-controls-p, hsl(0, 0%, 100%));
        --i-nil-doc-controls-s: var(--nil-doc-controls-s, hsl(210, 29%, 97%));
        --i-nil-doc-controls-hover: var(--nil-doc-controls-hover, hsl(210, 100%, 90%));
    }

    div.dark {
        --i-nil-doc-color: var(--nil-doc-color, hsl(0, 0%, 80%));
        --i-nil-doc-color-scheme: var(--nil-doc-color-scheme, dark);

        --i-nil-doc-bg-color: var(--nil-doc-bg-color, hsl(210, 6%, 7%));
        --i-nil-doc-content-outline-color: var(--nil-doc-content-outline-color, hsla(0, 0%, 100%, 0.3));

        --i-nil-doc-block-bg-color: var(--nil-doc-block-bg-color, hsla(200, 4%, 7%, 0.3));
        --i-nil-doc-block-outline-color: var(--nil-doc-block-outline-color, hsla(0, 0%, 1000%, 0.3));

        --i-nil-doc-container-p: var(--nil-doc-container-p, hsl(0, 2%, 40%));
        --i-nil-doc-container-s: var(--nil-doc-container-s, hsl(0, 0%, 100%));

        --i-nil-doc-controls-p: var(--nil-doc-controls-p, hsl(213, 26%, 7%));
        --i-nil-doc-controls-s: var(--nil-doc-controls-s, hsl(213, 26%, 11%));
        --i-nil-doc-controls-hover: var(--nil-doc-controls-hover, hsl(203, 100%, 15%));
    }

    div {
        --i-nil-doc-nav-hovered: var(--nil-doc-nav-hovered, hsla(203, 98%, 50%, 0.25));
        --i-nil-doc-nav-page-hovered: var(--nil-doc-nav-page-hovered, hsla(203, 98%, 50%, 0.6));
        --i-nil-doc-nav-selected: var(--nil-doc-nav-selected, hsla(203, 98%, 50%, 0.85));

        --i-nil-doc-instance-hovered: var(--nil-doc-instance-hovered, hsla(203, 98%, 50%, 0.25));
        --i-nil-doc-instance-control-hovered: var(--nil-doc-instance-control-hovered, hsla(203, 98%, 50%, 0.6));
        --i-nil-doc-instance-selected-color: var(--nil-doc-instance-selected-color, hsla(203, 98%, 50%, 0.85));

        --i-nil-doc-transition-time: var(--nil-doc-transition-time, 350ms);
    }
</style>
