export const grouptype = ["tuple", "object"] as const;
export const basetype = ["number", "string", "boolean"] as const;
export const builtintype = [...basetype, ...grouptype] as const;

export type BaseType = (typeof basetype)[number];
export type GroupType = (typeof grouptype)[number];
export type BuiltInType = (typeof builtintype)[number];
