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
            console.log = (...v) => {
                logs.push([logs.length, ...v]);
                content.innerHTML =
                    "<tbody>" +
                    logs.map(vv =>
                        "<tr><td>" +
                        vv.join("</td><td>") +
                        "</td></tr>"
                    ).join("") +
                    "</tbody>";
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
        </style>
    </head>
    <body class="markdown-body">
        <table>
            <tbody id="content"/>
        </table>
    </body>
</html>
`;
};
