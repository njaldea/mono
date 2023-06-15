/**
 * Used by Builder / check / resolver
 */
export type TypeDetail = {
    type: string;
    action?: (
        n: unknown,
        detail: { readonly value: unknown; readonly actions?: unknown; readonly action?: unknown }
    ) => { update: (vv: unknown) => void; destroy: () => void };
    value?: readonly {
        readonly type?: string;
        readonly key?: string;
        readonly value?: unknown;
    }[];
};
