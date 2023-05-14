<script lang="ts">
    import { getTheme, type Theme } from "../context";
    import Icon from "./icons/Icon.svelte";
    import ThemeIcon from "./icons/Theme.svelte";
    export let theme: Theme | undefined;

    const dark = getTheme();

    const toggle = () => {
        if (theme !== undefined) {
            theme = $dark ? "light" : "dark";
        } else {
            $dark = !$dark;
        }
    };
</script>

<Icon on:click={toggle}>
    <ThemeIcon dark={theme === undefined ? $dark : theme === "dark"} />
</Icon>
