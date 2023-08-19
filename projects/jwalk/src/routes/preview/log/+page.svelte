<script lang="ts">
    import Preview from "./Preview.svelte";
    const replaceAll = (data: string, map: Record<string, string>) => {
        for (const [key, value] of Object.entries(map)) {
            data = data.replaceAll(key, value);
        }
        return data;
    };

    let logs: string[][] = [];
    const action = (div: HTMLDivElement) => {
        (window as any).oldlog = window.console.log;
        window.console.log = (...v: string[]) => {
            logs = [...logs, [`${logs.length}>`, ...v]];
        };

        const handle = (e: MessageEvent) => {
            if (e.origin !== window.location.origin) {
                return;
            }
            if (e.data.type === "module") {
                logs = [];
                const blob = new Blob(
                    [replaceAll(e.data.code as string, e.data.map as Record<string, string>)],
                    { type: "application/javascript" }
                );
                const url = URL.createObjectURL(blob);
                import(/* @vite-ignore */ url)
                    .then(() => URL.revokeObjectURL(url))
                    .then(() => document.body.classList.remove("error"))
                    .catch((err) => {
                        window.console.log("ERR", err.message);
                        document.body.classList.add("error");
                    });
            }
        };
        window.addEventListener("message", handle);
        window.top?.postMessage({ type: "init" });
        return {
            destroy: () => {
                window.console.log = (window as any).oldlog;
                window.removeEventListener("message", handle);
            }
        };
    };
</script>

<div use:action id="injection-point">
    <Preview {logs} />
</div>

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
        overflow: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
        border: solid transparent 2px;
    }

    :global(body.error) {
        border: solid red 2px;
    }

    :global(body::-webkit-scrollbar) {
        display: none;
    }

    div {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
    }
</style>
