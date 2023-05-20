import { basetype, grouptype, builtintype } from "./constants";
import { resolver } from "./resolver";

export const check = {
    check: (type: string, t: { type: string; action?: any; value?: any }, types: any) => {
        if (types[type] != null) {
            throw new Error(`[${type}] already registered.`);
        }

        if (builtintype.includes(type)) {
            throw new Error(`[${type}] invalid type.`);
        }

        const rtype = resolver.type(t.type, types);
        if (!builtintype.includes(rtype)) {
            throw new Error(`[${type}] can't resolve alias type [${rtype}]`);
        }

        if (basetype.includes(rtype)) {
            if (t.value != null) {
                throw new Error(`[${type}] "${t.type}" can't have "value"`);
            }
        }

        if (t.action != null) {
            const raction = resolver.action(t.type, types);
            if (raction != null) {
                throw new Error(`[${type}] already has an action [${raction.type}]`);
            }
        }

        const recurse = (subtype, subt) => {
            const rtype = resolver.type(subtype, types);
            if (basetype.includes(rtype)) {
                if (subt.value != null) {
                    throw new Error(`[${type}] "${subtype}" can't have "value"`);
                }
            } else if (grouptype.includes(rtype)) {
                const rvalue = resolver.value(subtype, types);
                if (rvalue) {
                    if (rvalue.type !== subtype) {
                        throw new Error(`[${type}] already has value [${rvalue.type}]`)
                    } else {
                        for (const i of subt.value) {
                            recurse(i.type, i);
                        }
                    }
                } else  if (subt.value == null) {
                    throw new Error(`[${type}] "${subtype}" requires "value"`);
                }
            }
        };
        if (type === "ROOT") {
            recurse(t.type, t);
        } else if (t.value != null) {
            for (const i of t.value) {
                recurse(i.type, i);
            }
        }
    }
};
