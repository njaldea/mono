<script lang="ts">
    import { getTheme, type Theme } from "../context";
    import Icon from "./icons/Icon.svelte";
    import ThemeIcon from "./icons/Theme.svelte";

    let {
        theme = $bindable()
    }: {
        theme?: Theme;
    } = $props();

    const dark = getTheme();

    const toggle = () => {
        if (undefined !== theme) {
            theme = $dark ? "light" : "dark";
        } else {
            $dark = !$dark;
        }
    };
</script>

<Icon onclick={toggle}>
    <ThemeIcon dark={undefined === theme ? $dark : "dark" === theme} />
</Icon>
