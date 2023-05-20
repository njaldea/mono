export const resolver = {
    type: <Types, Type extends string>(type: Type, types: Types) => {
        while (types[type] != null) {
            type = types[type]?.type ?? type;
        }
        return type;
    },
    action: <Types>(type: any, types: Types) => {
        const detail = types[type];
        if (detail == null) {
            return null;
        }
        if (detail.action == null) {
            return resolver.action(detail.type, types);
        } else {
            return { type, action: detail.action };
        }
    },
    value: <Types>(type: any, types: Types) => {
        const detail = types[type];
        if (detail == null) {
            return null;
        }
        if (detail.value == null) {
            return resolver.value(detail.type, types);
        } else {
            return { type, value: detail.value };
        }
    },
    resolve: <Types>(type: any, types: Types) => {
        return {
            type: resolver.type(type, types),
            action: resolver.action(type, types)?.action
        };
    }
};
