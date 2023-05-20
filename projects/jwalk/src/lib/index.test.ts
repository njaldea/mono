/* eslint-disable camelcase */

import { jwalker } from "./index";
import { describe, it, expect, vi } from "vitest";

// prettier-ignore
describe("jwalk", () => {
    it("missing root", () => {
        expect(() => jwalker<string>().build("text", null))
            .toThrowError("ROOT is not registered");
    });

    it.each([
        ["number", 1, 4],
        ["string", "123", "321"],
        ["boolean", true, false],
    ])("root %s", (type: any, cvalue: any, nvalue: any) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        const jwalk = jwalker<string>()
            .add("ROOT", type, { action })
            .build("text", cvalue);
        
        expect(action.mock.calls.length).eq(1);
        expect(action.mock.calls[0].length).eq(2);
        expect(action.mock.calls[0][0]).eq("text");
        expect(action.mock.calls[0][1]).eq(cvalue);

        jwalk.update(nvalue);

        expect(update.mock.calls.length).eq(1);
        expect(update.mock.calls[0]).deep.eq([nvalue]);

        jwalk.destroy();

        expect(destroy.mock.calls.length).eq(1);
        expect(destroy.mock.calls[0]).deep.eq([]);
    });

    it.each([
        ["tuple", [{ type: "number" }, { type: "boolean" }, { type: "string" }], [1, true, "3"], [3, true, "1"]],
        ["object", [{ key: "a", type: "number" }, { key: "b", type: "boolean" }, { key: "c", type: "string" }], { a: 1, b: true, c: "3"}, { a: 3, b: true, c: "1" }],
    ])("root %s", (type: any, value: any, cvalue: any, nvalue: any) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        const jwalk = jwalker<string>()
            .add("ROOT", type, value, { action })
            .build("text", cvalue);
        
        expect(action.mock.calls.length).eq(1);
        expect(action.mock.calls[0].length).eq(3);
        expect(action.mock.calls[0][0]).eq("text");
        expect(action.mock.calls[0][1]).eq(cvalue);
        // TODO: validate actions

        jwalk.update(nvalue);

        expect(update.mock.calls.length).eq(1);
        expect(update.mock.calls[0]).deep.eq([nvalue]);

        jwalk.destroy();

        expect(destroy.mock.calls.length).eq(1);
        expect(destroy.mock.calls[0]).deep.eq([]);
    });

    it.each([["number"], ["string"], ["boolean"]])("root %s can't have value", (type: any) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        expect(() => jwalker<string>().add("ROOT", type, [], { action }))
            .toThrowError(`[ROOT] "${type}" can't have "value"`);
    });

    it.each([["tuple"], ["object"]])("root %s without value", (type: any) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        expect(() => jwalker<string>().add("ROOT", type, { action }))
            .toThrowError(`[ROOT] "${type}" requires "value"`);
    });

    it.each([
        ["tuple", [{ type: "tuple" }]],
        ["object", [{ type: "object", key: "1234" }]]
    ])("root flat - nested $s - subvalue missing", (type: any, value: any) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        expect(() => {
            jwalker<string>()
                .add(
                    "ROOT",
                    type,
                    value,
                    { action }
                );
        })
            .toThrowError(`[ROOT] "${type}" requires "value"`);
    });

    it.each([
        ["tuple", [{ type: "number" }, { type: "boolean" }, { type: "string" }], [1, true, "3"], [3, true, "1"]],
        ["object", [{ key: "a", type: "number" }, { key: "b", type: "boolean" }, { key: "c", type: "string" }], { a: 1, b: true, c: "3"}, { a: 3, b: true, c: "1" }],
    ])("root alias - %s", (type: any, value: any, cvalue: any, nvalue: any) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        const jwalk = jwalker<string>()
            .add("alias", type, { action })
            .add("ROOT", "alias", value)
            .build("text", cvalue);
        
        expect(action.mock.calls.length).eq(1);
        expect(action.mock.calls[0].length).eq(3);
        expect(action.mock.calls[0][0]).eq("text");
        expect(action.mock.calls[0][1]).eq(cvalue);
        // TODO: validate actions

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
    ])("root alias - %s already has action", (type: any) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        expect(() => {
            jwalker<string>()
                .add("alias", type, { action })
                .add("ROOT", "alias", [], { action });
        }).toThrowError("[ROOT] already has an action [alias]");
    });

    it.each([
        ["number"],
        ["boolean"],
        ["string"],
        ["tuple"],
        ["object"]
    ])("non-root %s already has action", (type: any) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        expect(() => {
            jwalker<string>()
                .add("L1", type, { action })
                .add("L2", "L1", { action });
        }).toThrowError(`[L2] already has an action [L1]`)
    });

    it.each([
        ["number"],
        ["boolean"],
        ["string"],
    ])("non-root %s type can't have value", (type: any) => {
        const update = vi.fn();
        const destroy = vi.fn();
        const action = vi.fn(() => ({ update, destroy }));

        expect(() => {
            jwalker<string>()
                .add("L1", type, { action })
                .add("L2", "L1", []);
        }).toThrowError(`[L2] "L1" can't have "value"`)
    });
});
