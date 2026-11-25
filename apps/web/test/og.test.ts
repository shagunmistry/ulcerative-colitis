import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { OG_TITLES, ogImage, ogTitle } from "../og-pages";

const app = join(__dirname, "../app");

describe("preview images", () => {
  it("shows the title of a known page", () => {
    expect(ogTitle("medicines")).toBe("Medicines for ulcerative colitis");
  });

  it.each([null, "", "Bleach cures colitis", "__proto__", "toString", "constructor"])(
    "shows the site title for %j",
    (page) => {
      expect(ogTitle(page)).toBe(OG_TITLES.understand);
    },
  );

  it("addresses images by page name only", () => {
    expect(ogImage("other")).toEqual({ url: "/og?page=other", width: 1200, height: 630 });
  });

  it("draws no text taken from the address", () => {
    const route = readFileSync(join(app, "og/route.tsx"), "utf8");
    expect([...route.matchAll(/searchParams\.get\("(\w+)"\)/g)].map((m) => m[1])).toEqual(["page"]);
  });

  it("no page asks for a free-text title", () => {
    const pages = readdirSync(app, { recursive: true, encoding: "utf8" }).filter((f) => f.endsWith(".tsx"));
    for (const file of pages) expect(readFileSync(join(app, file), "utf8"), file).not.toContain("/og?title=");
  });
});
