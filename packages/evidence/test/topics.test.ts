import { describe, expect, it } from "vitest";
import { CAUSES, COMPLEMENTARY, SOURCES, TOPICS, URGENT, topicHref, topicsIn } from "../src";

const ids = (group: Parameters<typeof topicsIn>[0]) => topicsIn(group).map((t) => t.id);

describe("topics", () => {
  it("has unique ids", () => {
    expect(new Set(TOPICS.map((t) => t.id)).size).toBe(TOPICS.length);
  });

  it("gives every topic a plain summary, a caveat, the science and known sources", () => {
    const known = new Set(SOURCES.map((s) => s.id));
    for (const t of TOPICS) {
      expect(t.plain.length, t.id).toBeGreaterThan(0);
      expect(t.caveat.length, t.id).toBeGreaterThan(0);
      expect(t.science.length, t.id).toBeGreaterThan(0);
      expect(t.sourceIds.length, t.id).toBeGreaterThan(0);
      expect(t.sourceIds.filter((s) => !known.has(s)), t.id).toEqual([]);
    }
  });

  it("covers the basics, causes, medicines and other approaches", () => {
    expect(ids("basics")).toEqual(["what-it-is", "symptoms", "diagnosis", "treatment-goals"]);
    expect(ids("cause")).toEqual(CAUSES.map((c) => c.id));
    expect(ids("medicine")).toEqual(["aminosalicylate", "corticosteroid", "cytokine", "trafficking"]);
    expect(ids("other")).toEqual(COMPLEMENTARY.map((c) => c.id));
  });

  it("keeps plain summaries in short sentences", () => {
    for (const t of TOPICS) {
      const sentences = t.plain.split(/(?<=[.?!])\s+/);
      const words = t.plain.split(/\s+/).length;
      expect(words / sentences.length, t.id).toBeLessThanOrEqual(22);
    }
  });

  it("addresses each topic by page and anchor", () => {
    const href = (id: string) => topicHref(TOPICS.find((t) => t.id === id)!);
    expect(href("symptoms")).toBe("/understand#symptoms");
    expect(href("genes")).toBe("/understand#genes");
    expect(href("cytokine")).toBe("/treatments#cytokine");
    expect(href("fmt")).toBe("/treatments/other#fmt");
  });

  it("lists when to get urgent and emergency care", () => {
    expect(URGENT.emergency.length).toBeGreaterThan(0);
    expect(URGENT.urgent.length).toBeGreaterThan(0);
    expect(URGENT.sourceId).toBe("nhs-uc");
  });
});

describe("topic citations", () => {
  // Pages checked to contain the statements made in each topic.
  it.each([
    ["symptoms", ["niddk-definition", "nhs-uc"]],
    ["corticosteroid", ["niddk-definition", "niddk-treatment"]],
    ["aminosalicylate", ["nhs-uc"]],
    [
      "cytokine",
      [
        "nhs-uc",
        "act-infliximab",
        "ultra2-adalimumab",
        "pursuit-golimumab",
        "unifi-ustekinumab",
        "lucent-mirikizumab",
        "inspire-risankizumab",
        "quasar-guselkumab",
        "octave-tofacitinib",
        "uachieve-upadacitinib",
      ],
    ],
  ])("%s cites the sources that support it", (id, required) => {
    const topic = TOPICS.find((t) => t.id === id)!;
    expect(topic.sourceIds).toEqual(expect.arrayContaining(required));
  });
});
