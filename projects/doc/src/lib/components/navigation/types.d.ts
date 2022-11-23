export interface Tree {
    url: string | null;
    sub: Record<string, Tree>;
}

export interface States {
    expanded: boolean;
    sub: Record<string, States>;
}

export type Sorter = (l: string, r: string) => 1 | 0 | -1;
export type Renamer = (s: string) => string;
