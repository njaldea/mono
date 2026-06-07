import type { Renamer } from "../types";

const match = /(\d+)-(.+)/;

/**
 * If a text follows `<I>-<Name>` format,
 * this method simply removes the Prefix.
 */
export const renamer = ((text: string) => {
    const m = match.exec(text);
    if (m) {
        return m[2];
    }
    return text;
}) satisfies Renamer;
