import { describe, expect, it } from "vitest";
import { LINKS, SOURCES, getSource, linksFor, sourceUrl } from "../src";

describe("web sources", () => {
  it("links to the page itself", () => {
    expect(sourceUrl(getSource("nhs-uc"))).toBe("https://www.nhs.uk/conditions/ulcerative-colitis/");
  });

  it("gives every source exactly one of a PubMed id or an address", () => {
    for (const s of SOURCES) expect(Number(!!s.pmid) + Number(!!s.url), s.id).toBe(1);
  });
});

describe("further reading", () => {
  it("has unique, dated https links", () => {
    expect(new Set(LINKS.map((l) => l.id)).size).toBe(LINKS.length);
    expect(new Set(LINKS.map((l) => l.url)).size).toBe(LINKS.length);
    for (const l of LINKS) {
      expect(l.url, l.id).toMatch(/^https:\/\//);
      expect(l.checkedOn, l.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(l.topics.length, l.id).toBeGreaterThan(0);
    }
  });

  it("finds links by topic", () => {
    expect(linksFor("fmt").some((l) => l.kind === "registry")).toBe(true);
    expect(linksFor("nope")).toEqual([]);
  });
});
