import type { Config as FullConfig } from "./types/config";

export type Config = Partial<FullConfig>;
export const defineConfig = (c: Config) => c;
