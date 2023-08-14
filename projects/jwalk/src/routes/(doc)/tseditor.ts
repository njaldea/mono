/* eslint-disable */
// @ts-nocheck

export type UpdateArg = { importmap: Record<string, string>; module: string };
export type Update = (detail: UpdateArg) => void;

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
const context = writable();

export const tseditor = (
    loader: HTMLDivElement,
    detail: {
        readonly code: string;
        readonly libs: Record<string, string>;
        readonly readonly?: boolean;
        readonly update?: Update;
    }
) => {
    if (!request) {
        request = true;
        load().then((v) => context.set(v));
    }

    let unsub;
    let cleanup;
    unsub = context.subscribe((v) => {
        if (v != null) {
            if (unsub) {
                unsub();
                unsub = null;
            }
            const config = {
                text: detail.code,
                compilerOptions: {
                    target: window.ts.ModuleKind.CommonJS,
                    module: window.ts.ModuleKind.ESNext,
                    jsx: 0
                },
                logger: {
                    log: () => {},
                    error: () => {}
                },
                elementToAppend: loader,
                monacoSettings: {
                    theme: "sandbox-dark",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    readOnly: detail.readonly === true,
                    scrollbar: {
                        alwaysConsumeMouseWheel: false
                    }
                }
            };

            require.config({
                paths: { ...builtins, ...detail.libs },
                ignoreDuplicateModules: ["vs/editor/editor.main"]
            });

            const sandbox = v.factory.createTypeScriptSandbox(config, v.main, window.ts);
            const inlay = sandbox.monaco.languages.registerInlayHintsProvider("typescript", {
                provideInlayHints: async (model, _, cancel) => {
                    const def = { hints: [], dispose: () => {} };
                    if (model.isDisposed()) {
                        return def;
                    }

                    const text = model.getValue();
                    const queryRegex = /^\s*\/\/\s*\^\?$/gm;
                    const hints = [];
                    const worker = await sandbox.getWorkerProcess();
                    let match;
                    while ((match = queryRegex.exec(text)) !== null) {
                        if (cancel.isCancellationRequested) {
                            return def;
                        }

                        const end = match.index + match[0].length - 1;
                        const endPos = model.getPositionAt(end);
                        const inspectionPos = new sandbox.monaco.Position(
                            endPos.lineNumber - 1,
                            endPos.column
                        );
                        const hint = await worker.getQuickInfoAtPosition(
                            "file://" + model.uri.path,
                            model.getOffsetAt(inspectionPos)
                        );
                        if (!hint || !hint.displayParts) continue;

                        let label = hint.displayParts
                            .map((d) => d.text)
                            .join("")
                            .replace(/\r?\n\s*/g, " ");
                        if (label.length > 120) label = label.slice(0, 119) + "...";

                        const inlay = {
                            kind: 2,
                            position: new sandbox.monaco.Position(
                                endPos.lineNumber,
                                endPos.column + 1
                            ),
                            label: `: ${label} `
                        };
                        hints.push(inlay);
                    }
                    return {
                        hints,
                        dispose: () => {}
                    };
                }
            });

            if (detail.update) {
                const change = () => {
                    sandbox.getRunnableJS().then((e) => {
                        detail.update({
                            importmap: detail.libs,
                            module: e
                        });
                    });
                };
                sandbox.getModel().onDidChangeContent(change);
                change();
            }

            cleanup = () => {
                inlay.dispose();
                sandbox.getModel().dispose();
            };
            sandbox.editor.focus();
        }
    });

    return {
        destroy: () => {
            unsub && unsub();
            unsub = null;
            cleanup && cleanup();
            cleanup = null;
        }
    };
};
