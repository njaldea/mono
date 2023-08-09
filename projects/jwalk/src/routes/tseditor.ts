/* eslint-disable */
// @ts-nocheck

import { writable } from "svelte/store";

const builtins = {
    vs: "https://typescript.azureedge.net/cdn/5.1.6/monaco/min/vs",
    sandbox: "https://www.typescriptlang.org/js/sandbox"
} as const;

const load = async () => {
    return new Promise((resolve, reject) => {
        const getLoaderScript = document.createElement("script");
        getLoaderScript.src = "https://www.typescriptlang.org/js/vs.loader.js";
        getLoaderScript.async = true;
        getLoaderScript.onload = () => {
            require.config({
                paths: { ...builtins },
                ignoreDuplicateModules: ["vs/editor/editor.main"]
            });

            require(["vs/editor/editor.main", "vs/language/typescript/tsWorker", "sandbox/index"], (
                main,
                _tsWorker,
                factory
            ) => {
                const isOK = main && window.ts && factory;
                if (!isOK) {
                    console.error("Could not get all the dependencies of sandbox set up!");
                    console.error("main", !!main, "ts", !!window.ts, "sandbox", !!sandbox);
                    reject("error");
                    return;
                }

                resolve({ main, factory });
            });
        };

        document.body.appendChild(getLoaderScript);
    });
};

let request = false;
let context = writable();

export const tseditor = (
    loader: HTMLDivElement,
    detail: {
        readonly code: string;
        readonly libs: Record<string, string>;
        readonly readonly?: boolean;
    }
) => {
    if (!request) {
        request = true;
        load().then((v) => context.set(v));
    }

    let unsub;
    let sandbox;
    unsub = context.subscribe((v) => {
        if (v != null) {
            unsub && unsub();
            unsub = null;
            const config = {
                text: detail.code,
                compilerOptions: {
                    module: "esnext",
                    target: "esnext"
                },
                elementToAppend: loader,
                monacoSettings: {
                    theme: "sandbox-dark",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    readOnly: detail.readonly === true
                }
            };

            require.config({
                paths: {
                    ...builtins,
                    ...detail.libs
                },
                ignoreDuplicateModules: ["vs/editor/editor.main"]
            });

            sandbox = v.factory.createTypeScriptSandbox(config, v.main, window.ts);

            sandbox.editor.focus();
        }
    });

    return {
        destroy: () => {
            unsub && unsub();
            if (sandbox) {
                sandbox.getModel().dispose();
                sandbox.editor.dispose();
            }
        }
    };
};
