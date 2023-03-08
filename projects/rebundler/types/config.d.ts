export type Plugin = "terser";

export type Mode =
    | { type: "iife"; name: string; plugins?: Plugin[] }
    | { type: "cjs"; plugins?: Plugin[] }
    | { type: "es"; plugins?: Plugin[] }
    | { type: "json" };

export type Config = {
    in: string;
    out: string;
    mode: Mode;
};
