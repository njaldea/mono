export const reinit = `
const cleanup = (c) => {
    c._clean.forEach(c => c());
    c._clean = [];
};
cleanup(document.getElementById("toggle"));
cleanup(document.getElementById("v1"));
cleanup(document.getElementById("v2"));
cleanup(document.getElementById("v3"));
cleanup(document.getElementById("v4"));
cleanup(document.getElementById("op1"));
cleanup(document.getElementById("op2"));
`;

export const html = `
const ipoint = document.getElementById("injection-point");
ipoint.innerHTML = \`<div class="root">
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
<style>
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
        gap: 10px;
        padding-left: 15px;
        padding-right: 10px;
        place-items: center;
        box-sizing: border-box;
    }

    button {
        width: 100%;
        height: 30px;
        border-radius: 8px;
        border: 1px solid transparent;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        cursor: pointer;
        margin: auto;
        transition: border-color 0.25s;
        box-sizing: border-box;
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
        box-sizing: border-box;
    }
</style>
\`;

const wrapEL = (c) => {
    const store = c.addEventListener;
    c._el = c.addEventListener;
    c._clean = [];
    c.addEventListener = (...args) => {
        c._el(...args);
        c._clean.push(() => c.removeEventListener(...args));
    }
}

wrapEL(document.getElementById("toggle"));
wrapEL(document.getElementById("v1"));
wrapEL(document.getElementById("v2"));
wrapEL(document.getElementById("v3"));
wrapEL(document.getElementById("v4"));
wrapEL(document.getElementById("op1"));
wrapEL(document.getElementById("op2"));
`;
