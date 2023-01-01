import type { Renamer } from "../types";

const match = /(\d+)-(.+)/;

/**
 * If a text follows `<I>-<Name>` format,
 * this method simply removes the Prefix.
 *
 * @param text
 * @returns `<Name>`
 */
export const renamer: Renamer = (text: string) => {
    const m = match.exec(text);
    if (m) {
        return m[2];
    }
    return text;
};
