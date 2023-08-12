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
            }
        
            #toggle {
                margin-bottom: 1rem;
            }
        
            .parent {
                max-width: 1280px;
                margin: 0 auto;
                padding: 2rem;
                text-align: center;
            }
        
            button {
                border-radius: 8px;
                border: 1px solid transparent;
                padding: 0.6em 1.2em;
                font-size: 1em;
                font-weight: 500;
                font-family: inherit;
                background-color: #1a1a1a;
                cursor: pointer;
                transition: border-color 0.25s;
            }
        
            button:hover {
                border-color: #646cff;
            }
        
            button:focus,
            button:focus-visible {
                outline: 4px auto -webkit-focus-ring-color;
            }
        </style>
    </head>
    <body class="markdown-body">
        <div class="root">
            <div class="parent">
                <button id="toggle">value is 0</button>
                <div class="controls">
                    <input type="number" value="0" id="v1"></input>
                    <span id="op1">+</span>
                    <input type="number" value="0" id="v2"></input>
                </div>
                <div>*</div>
                <div class="controls">
                    <input type="number" value="0" id="v3"></input>
                    <span id="op2">+</span>
                    <input type="number" value="0" id="v4"></input>
                </div>
            </div>
        </div>
    </body>
</html>
`;
};
