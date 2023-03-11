export type Args = {
    mode: "config" | "iife" | "cjs" | "es" | "json";
    in: string;
    out?: string;
    file: string;
    plugin: string[];
};
