export type Value = number | null;

export type EdgeDebug = {
    id: number;
    connections: {
        in: { id: number; port: number } | null;
        out: { id: number; port: number } | null;
    };
    value: Value;
};

export type NodeDebug = {
    id: number;
    connections: {
        in: (number | null)[];
        out: number[][];
    };
    values: {
        in: Value[];
        out: Value[];
    };
};

export type TreeDebug = {
    nodes: NodeDebug[];
    edges: EdgeDebug[];
};
