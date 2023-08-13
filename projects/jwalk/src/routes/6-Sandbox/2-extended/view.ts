export const content = ({
    importmap,
    module
}: {
    importmap: Record<string, string>;
    module: string;
}) => {
    return `<!DOCTYPE html>
<html lang="en" class="dark">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="/assets/markdown.css" />
        <${"script"} type="importmap">{ "imports": ${JSON.stringify(importmap)} }</script>
        <${"script"} type="module">
            const content = document.getElementById("content");
            const logs = [];
            const widths = [];
            console.log = (...v) => {
                const n = [\`\${logs.length}> \`, ...v];
                logs.push(n);
                while (n.length > widths.length) {
                    widths.push(0);
                }
                for (let i = 0; i < widths.length; ++i) {
                    widths[i] = Math.max(widths[i], n[i]?.length ?? 0);
                }
                content.innerHTML =
                    logs.map(vv => {
                        return vv.map((v, i) => {
                            if (i === 0) {
                                return v.padStart(widths[i], ' ');
                            }
                            return v.padEnd(widths[i] + 1, ' ');
                        }).join(" ")
                    }).join("\\n");
            };
            ${module}
        </script>
        <style>
            html, body {
                width: 100%;
                height: 100%;
            }
            body {
                overflow: scroll;
                scrollbar-width: none;
                -ms-overflow-style: none;
            }
            body::-webkit-scrollbar {
                display: none;
            }
            pre {
                box-sizing: border-box;
                height: 100%;
            }
        </style>
    </head>
    <body class="markdown-body">
        <pre id="content"/>
    </body>
</html>
`;
};
