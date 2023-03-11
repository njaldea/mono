type Mode =
    | { type: "iife"; file: string; plugins?: string[] }
    | { type: "cjs"; file: string; plugins?: string[] }
    | { type: "es"; file: string; plugins?: string[] }
    | { type: "json"; file?: string | undefined };

export type Config = {
    in: string;
    out: string;
    mode?: Mode;
};
