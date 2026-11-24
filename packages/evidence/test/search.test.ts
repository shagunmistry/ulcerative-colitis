import { describe, expect, it } from "vitest";
import { search } from "../src";

const hrefs = (q: string) => search(q).map((h) => h.href);

describe("search", () => {
  it.each(["", "   ", "(", ".*", "[a-", "\\"])("returns nothing for %j", (q) => {
    expect(search(q)).toEqual([]);
  });

  it("matches British and American spellings", () => {
    expect(hrefs("fecal")[0]).toBe("/treatments/other#fmt");
    expect(hrefs("faecal")[0]).toBe("/treatments/other#fmt");
    expect(hrefs("diarrhea")).toContain("/understand#symptoms");
    expect(hrefs("diarrhoea")).toContain("/understand#symptoms");
    expect(hrefs("tumeric")).toEqual([]);
  });

  it("finds Greek letters and drug names buried in the science", () => {
    expect(hrefs("αvβ6")).toContain("/understand#autoantibody");
    expect(hrefs("Infliximab")).toContain("/treatments#cytokine");
  });

  it("requires every word to match", () => {
    expect(hrefs("curcumin zzzz")).toEqual([]);
  });

  it("ranks title matches first", () => {
    expect(hrefs("probiotics")[0]).toBe("/treatments/other#probiotics");
  });

  it("includes outside links with full addresses", () => {
    const external = search("LIMUC").filter((h) => h.kind === "link");
    expect(external[0]!.href).toMatch(/^https:\/\//);
  });

  it.each(["urgent care", "emergency"])("finds urgent care advice for %j", (q) => {
    expect(hrefs(q)[0]).toBe("/understand#urgent-care");
  });

  it("respects the limit", () => {
    expect(search("the", 3)).toHaveLength(3);
  });
});
