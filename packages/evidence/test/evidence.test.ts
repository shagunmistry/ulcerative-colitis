import { THERAPIES } from "@uc/sim";
import { describe, expect, it } from "vitest";
import { CAUSES, COMPLEMENTARY, SOURCES, TRIALS, getSource, sourceUrl } from "../src";

const ids = new Set(SOURCES.map((s) => s.id));

describe("evidence", () => {
  it("has unique source ids and PubMed ids", () => {
    expect(ids.size).toBe(SOURCES.length);
    expect(new Set(SOURCES.map((s) => s.pmid)).size).toBe(SOURCES.length);
  });

  it("builds a PubMed link for every source", () => {
    expect(sourceUrl(getSource("act-infliximab"))).toBe("https://pubmed.ncbi.nlm.nih.gov/16339095/");
  });

  it("throws for an unknown source id", () => {
    expect(() => getSource("nope")).toThrow(/nope/);
  });

  it.each([
    ["causes", CAUSES.flatMap((c) => c.sourceIds)],
    ["complementary", COMPLEMENTARY.flatMap((c) => c.sourceIds)],
    ["trials", TRIALS.map((t) => t.sourceId)],
    ["simulator therapies", THERAPIES.flatMap((t) => t.sourceIds)],
  ])("%s cite only sources that exist", (_, cited) => {
    expect(cited.filter((id) => !ids.has(id))).toEqual([]);
  });

  it("cites at least one source for every cause and complementary approach", () => {
    for (const item of [...CAUSES, ...COMPLEMENTARY]) expect(item.sourceIds.length).toBeGreaterThan(0);
  });

  it("reports every trial with a drug arm and a placebo arm as percentages", () => {
    for (const t of TRIALS) {
      for (const v of [t.drugPercent, t.placeboPercent]) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(100);
      }
      expect(t.drugPercent).toBeGreaterThan(t.placeboPercent);
      expect(t.measure.length).toBeGreaterThan(0);
      expect(t.week).toBeGreaterThan(0);
    }
  });
});
