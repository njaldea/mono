export type ValueType =
    | undefined
    | boolean
    | number
    | string
    | ValueType[]
    | {
          [key: string]: ValueType;
      };
