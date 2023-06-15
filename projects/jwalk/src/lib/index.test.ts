/* eslint-disable camelcase */

import { jwalker } from "./index";
import { describe, it, expect, vi } from "vitest";

const builtintype = ["number", "string", "boolean", "tuple", "object"];
const primetype = ["number", "string", "boolean"];

// prettier-ignore
describe("jwalk", () => {
    it("missing root", () => {
        expect(() => {
            jwalker<string>()
                .build("text", null);
        }).toThrowError("ROOT is not registered");
    });

    it("duplicate", () => {
        expect(() => {
            const update = vi.fn();
            const destroy = vi.fn();
            const action = vi.fn(() => ({ update, destroy }));

            jwalker<string>()
                .node("t", "number", { action })
                .node("t", "number", { action });
        })
            .toThrowError("[t] already registered");
    });

    it.each(builtintype.map((v) => [v]))("reserved type $s", (type) => {
        expect(() => {
            const update = vi.fn();
            const destroy = vi.fn();
            const action = vi.fn(() => ({ update, destroy }));
            jwalker<string>()
                .node(type, type, { action });
        })
            .toThrowError(`[${type}] is reserved`);
    });

    it("unknown alias", () => {
        expect(() => {
            const update = vi.fn();
            const destroy = vi.fn();
            const action = vi.fn(() => ({ update, destroy }));
            jwalker<string>().node("UnknownT", "WhatIsThis", { action });
        })
            .toThrowError(`[UnknownT] unknown alias type [WhatIsThis]`);
    });

    it.each(builtintype.map((v) => [v]))("builtin no action", (type) => {
        expect(() => {
            jwalker<string>()
                .node("T", type, {});
        }).toThrowError(`[T] requires an action [${type}]`);
    });

    it.each([
        ["number", 1, 4] as const,
        ["string", "123", "321"] as const,
        ["boolean", true, false] as const,
    ])("root %s", (type, cvalue, nvalue) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        const jwalk = jwalker<string>()
            .node("ROOT", type, { action })
            .build("text", cvalue);

        expect(action.mock.calls.length).eq(1);
        expect(action.mock.calls[0].length).eq(2);
        expect(action.mock.calls[0][0]).eq("text");
        expect(action.mock.calls[0][1].value).eq(cvalue);

        jwalk.update(nvalue);

        expect(update.mock.calls.length).eq(1);
        expect(update.mock.calls[0]).deep.eq([nvalue]);

        jwalk.destroy();

        expect(destroy.mock.calls.length).eq(1);
        expect(destroy.mock.calls[0]).deep.eq([]);
    });

    it.each([
        ["tuple", [{ type: "number" }, { type: "boolean" }, { type: "string" }], [1, true, "3"], [3, true, "1"]] as const,
        ["object", [{ key: "a", type: "number" }, { key: "b", type: "boolean" }, { key: "c", type: "string" }], { a: 1, b: true, c: "3"}, { a: 3, b: true, c: "1" }] as const,
    ])("root %s", (type, value, cvalue, nvalue) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        const jwalk = jwalker<string>()
            .node("ROOT", type, { value, action })
            .build("text", cvalue);

        expect(action.mock.calls.length).eq(1);
        expect(action.mock.calls[0].length).eq(2);
        expect(action.mock.calls[0][0]).eq("text");
        expect(action.mock.calls[0][1].value).eq(cvalue);
        // TODO: validate actions

        jwalk.update(nvalue);

        expect(update.mock.calls.length).eq(1);
        expect(update.mock.calls[0]).deep.eq([nvalue]);

        jwalk.destroy();

        expect(destroy.mock.calls.length).eq(1);
        expect(destroy.mock.calls[0]).deep.eq([]);
    });

    it.each(primetype.map(v => [v]))("root %s can't have value", (type) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        expect(() => {
            jwalker<string>()
                .node("ROOT", type, { value: [], action });
        }).toThrowError(`[ROOT] "${type}" can't have "value"`);
    });

    it.each([["tuple"], ["object"]])("root %s without value", (type) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        expect(() => {
            jwalker<string>()
                .node("ROOT", type, { action });
        }).toThrowError(`[ROOT] "${type}" requires "value"`);
    });

    it.each([
        ["tuple", [{ type: "tuple" }]] as const,
        ["object", [{ type: "object", key: "1234" }]] as const
    ])("root flat - nested $s - subvalue missing", (type, value) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        expect(() => {
            jwalker<string>()
                .node("ROOT", type, { value, action });
        }).toThrowError(`[ROOT] "${type}" requires "value"`);
    });

    it.each([
        ["tuple", [{ type: "number" }, { type: "boolean" }, { type: "string" }], [1, true, "3"], [3, true, "1"]] as const,
        ["object", [{ key: "a", type: "number" }, { key: "b", type: "boolean" }, { key: "c", type: "string" }], { a: 1, b: true, c: "3"}, { a: 3, b: true, c: "1" }] as const,
    ])("root alias - %s", (type, value, cvalue, nvalue) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        const jwalk = jwalker<string>()
            .node("alias", type, { action })
            .node("ROOT", "alias", { value })
            .build("text", cvalue);

        expect(action.mock.calls.length).eq(1);
        expect(action.mock.calls[0].length).eq(2);
        expect(action.mock.calls[0][0]).eq("text");
        expect(action.mock.calls[0][1].value).eq(cvalue);

        jwalk.update(nvalue);

        expect(update.mock.calls.length).eq(1);
        expect(update.mock.calls[0]).deep.eq([nvalue]);

        jwalk.destroy();

        expect(destroy.mock.calls.length).eq(1);
        expect(destroy.mock.calls[0]).deep.eq([]);
    });

    it.each([
        ["tuple"],
        ["object"],
    ])("root alias - %s already has action", (type) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        expect(() => {
            jwalker<string>()
                .node("alias", type, { action })
                .node("ROOT", "alias", { value: [], action });
        }).toThrowError("[ROOT] already has an action [alias]");
    });

    it.each(builtintype.map(v => [v]))("non-root alias %s already has action", (type) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        expect(() => {
            jwalker<string>()
                .node("L1", type, { action })
                .node("L2", "L1", { action });
        }).toThrowError("[L2] already has an action [L1]");
    });

    it.each(primetype.map(v => [v]))("non-root alias %s type can't have value", (type) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        expect(() => {
            jwalker<string>()
                .node("L1", type, { action })
                .node("L2", "L1", { value: [] });
        }).toThrowError("[L2] \"L1\" can't have \"value\"");
    });

    it.each([
        ["object", [{ type: "L1", key: "k" }]],
        ["tuple", [{ type: "L1" }]]
    ])("%s value requires value", (type, value) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        expect(() => {
            jwalker<string>()
                .node("L1", type, { action })
                .node("L2", type, { action, value });
        }).toThrowError("[L2] \"L1\" requires \"value\"");
    });
});
