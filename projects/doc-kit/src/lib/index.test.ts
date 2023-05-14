import { get, writable } from "svelte/store";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import type { Page } from "@sveltejs/kit/types";

describe("sveltekit", () => {
    const page = writable<Pick<Page, "route">>({ route: { id: null } });
    const goto = vi.fn();

    beforeEach(() => {
        vi.doMock("$app/stores", () => ({ page }));
        vi.doMock("$app/navigation", () => ({ goto }));
    });

    afterEach(() => {
        vi.doUnmock("$app/stores");
        vi.doUnmock("$app/navigation");
        page.set({ route: { id: null } });
        goto.mockReset();
    });

    it("defaulted prefix", async () => {
        const { build: SUT } = await import(".");

        const result = SUT({
            "/this/is/a/route/page.extension": null,
            "/this/is/another/(group)/route/page.extension": null
        });

        expect(result.data).deep.equals(["this/is/a/route", "this/is/another/route"]);

        expect(get(result.current)).is.equal(null);

        page.set({ route: { id: "/prefix/curent/route" } });
        expect(get(result.current)).is.equal("/prefix/curent/route");

        await result.navigate({ detail: "/navigate/here" } as CustomEvent<string>);

        expect(goto).toHaveBeenCalledOnce();
        expect(goto).toHaveBeenCalledWith("/navigate/here");
    });

    it("overridden prefixed", async () => {
        const { build: SUT } = await import(".");

        const result = SUT(
            {
                "/this/is/a/route/page.extension": null,
                "/this/is/another/(group)/route/page.extension": null
            },
            "/prefix"
        );

        expect(result.data).deep.equals(["this/is/a/route", "this/is/another/route"]);

        expect(get(result.current)).is.equal(null);

        page.set({ route: { id: "/prefix/curent/route" } });
        expect(get(result.current)).is.equal("/curent/route");

        await result.navigate({ detail: "/navigate/here" } as CustomEvent<string>);

        expect(goto).toHaveBeenCalledOnce();
        expect(goto).toHaveBeenCalledWith("/prefix/navigate/here");
    });
});
