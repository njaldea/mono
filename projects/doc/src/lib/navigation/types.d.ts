export type Tree = {
    url: string | null;
    sub: Record<string, Tree>;
    expanded: boolean;
    hidden: boolean;
};

export type Sorter = (l: string, r: string) => -1 | 0 | 1;
export type Renamer = (s: string) => string;
export type Parser = (s: string) => string[];
