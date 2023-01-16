export type EdgeDebug<TYPE> = {
    id: number;
    connections: {
        in: { id: number; port: number } | null;
        out: { id: number; port: number } | null;
    };
    value: TYPE | null;
};

export type NodeDebug<IN extends unknown[], OUT extends unknown[]> = {
    id: number;
    connections: {
        i: (number | null)[];
        o: number[][];
    };
    values: {
        i: IN;
        o: OUT;
    };
};

export type TreeDebug = {
    nodes: NodeDebug<unknown[], unknown[]>[];
    edges: EdgeDebug<unknown>[];
};
