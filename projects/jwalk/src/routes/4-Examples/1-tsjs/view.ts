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
            ${module}
        </script>
        <style>
            * {
                box-sizing: border-box;
            }
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

            .root {
                user-select: none;
                font-family: Consolas;
                line-height: 1.5;
                font-weight: 400;

                color-scheme: light dark;
                color: rgba(255, 255, 255, 0.87);
                background-color: #242424;

                font-synthesis: none;
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                -webkit-text-size-adjust: 100%;

                height: 100%;
                width: 100%;
                display: grid;
                grid-template-columns: 1fr 10px 1fr 10px 1fr 10px 1fr 10px 1fr;
                gap: 2px;
                padding-inline: 4px;
                place-items: center;
            }

            button {
                width: 100%;
                height: 30px;
                border-radius: 8px;
                border: 1px solid transparent;
                margin: 0.6em 1.2em;
                font-size: 1em;
                font-weight: 500;
                font-family: inherit;
                background-color: #1a1a1a;
                cursor: pointer;
                margin: auto;
                transition: border-color 0.25s;
            }

            button:hover {
                border-color: #646cff;
            }

            button:focus,
            button:focus-visible {
                outline: 4px auto -webkit-focus-ring-color;
            }

            input {
                width: 100%;
                height: 30px;
                padding: 0px;
                padding-left: 5px;
                margin: 0px;
            }
        </style>
    </head>
    <body class="markdown-body">
        <div class="root">
            <input type="number" value="1" id="v1"></input>
            <span id="op1">+</span>
            <input type="number" value="1" id="v2"></input>
            <span>x</span>
            <input type="number" value="1" id="v3"></input>
            <span id="op2">+</span>
            <input type="number" value="1" id="v4"></input>
            <span>=</span>
            <button id="toggle">4</button>
        </div>
    </body>
</html>
`;
};
