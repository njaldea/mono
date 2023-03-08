type Common = {
    config?: string;
    in?: string;
    out?: string;
};

export type Mode =
    | { iife: string; cjs: false; mjs: false; json: false }
    | { cjs: boolean; iife: undefined; mjs: false; json: false }
    | { mjs: boolean; iife: undefined; cjs: false; json: false }
    | { json: boolean; iife: undefined; cjs: false; mjs: false };

export type Args = Common & Mode;
