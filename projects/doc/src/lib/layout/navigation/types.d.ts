export interface Tree {
    url: string | null;
    sub: Record<string, Tree>;
}

export interface States {
    expanded: boolean;
    sub: Record<string, States>;
}
