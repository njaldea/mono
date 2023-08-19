<script lang="ts">
    import { onMount } from "svelte";

    const replaceAll = (data: string, map: Record<string, string>) => {
        for (const [key, value] of Object.entries(map)) {
            data = data.replaceAll(key, value);
        }
        return data;
    };

    onMount(() => {
        const handle = (e: MessageEvent) => {
            if (e.origin !== window.location.origin) {
                return;
            }
            if (e.data.type === "module") {
                const blob = new Blob(
                    [replaceAll(e.data.code as string, e.data.map as Record<string, string>)],
                    { type: "application/javascript" }
                );
                const url = URL.createObjectURL(blob);
                import(/* @vite-ignore */ url)
                    .then(() => URL.revokeObjectURL(url))
                    .then(() => document.body.classList.remove("error"))
                    .catch(() => document.body.classList.add("error"));
            }
        };
        window.addEventListener("message", handle);
        window.top?.postMessage({ type: "init" });
        return () => window.removeEventListener("message", handle);
    });
</script>

<div id="injection-point"></div>

<style>
    :global(html, body) {
        width: 100%;
        height: 100%;
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        color: white;
        background-color: #1e1e1e;
    }

    :global(body) {
        border: solid transparent 2px;
        overflow: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    :global(body.error) {
        border: solid red 2px;
    }

    :global(body::-webkit-scrollbar) {
        display: none;
    }

    #injection-point {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
</style>
