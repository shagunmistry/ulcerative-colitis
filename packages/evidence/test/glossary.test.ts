import { describe, expect, it } from "vitest";
import { GLOSSARY, definitionSources, getSource, splitTerms } from "../src";

describe("glossary", () => {
  it("cites a known source for every definition", () => {
    for (const [term, entry] of Object.entries(GLOSSARY)) {
      expect(entry.definition.length, term).toBeGreaterThan(0);
      expect(() => getSource(entry.sourceId), term).not.toThrow();
    }
  });

  it("leaves out terms with no source found", () => {
    expect(GLOSSARY).not.toHaveProperty("TNF");
  });

  it("splits text around defined terms, ignoring case", () => {
    expect(splitTerms("A Biopsy confirms it.")).toEqual([
      "A ",
      { text: "Biopsy", term: "biopsy" },
      " confirms it.",
    ]);
  });

  it("does not match inside longer words", () => {
    expect(splitTerms("Flared and biopsying")).toEqual(["Flared and biopsying"]);
  });

  it("lists each source behind the definitions used in some text once", () => {
    expect(definitionSources(["A flare ends in remission.", "Another flare."])).toEqual(["niddk-definition"]);
    expect(definitionSources(["Nothing to define."])).toEqual([]);
  });
});
