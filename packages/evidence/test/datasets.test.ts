import { describe, expect, it } from "vitest";
import { DATASETS, copyUrl, filterDatasets, linksFor, loadSnippet, type Copy } from "../src";

describe("datasets", () => {
  it("has complete, unique, dated entries", () => {
    expect(new Set(DATASETS.map((d) => d.id)).size).toBe(DATASETS.length);
    expect(DATASETS.map((d) => d.id)).toEqual(expect.arrayContaining(["limuc", "ibdmdb"]));
    for (const d of DATASETS) {
      for (const v of [d.title, d.publisher, d.summary, d.size, d.licence, d.citation]) expect(v.trim(), d.id).not.toBe("");
      expect(d.url, d.id).toMatch(/^https:\/\//);
      expect(d.termsUrl, d.id).toMatch(/^https:\/\//);
      expect(d.checkedOn, d.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(d.types.length, d.id).toBeGreaterThan(0);
    }
  });

  it("builds copy addresses and load code", () => {
    const hf: Copy = { host: "Hugging Face", id: "org/name", original: false, checkedOn: "2026-11-25" };
    expect(copyUrl(hf)).toBe("https://huggingface.co/datasets/org/name");
    expect(loadSnippet(hf)).toBe('from datasets import load_dataset\n\nds = load_dataset("org/name")');
    const kg: Copy = { ...hf, host: "Kaggle" };
    expect(copyUrl(kg)).toBe("https://www.kaggle.com/datasets/org/name");
    expect(loadSnippet(kg)).toBe('import kagglehub\n\npath = kagglehub.dataset_download("org/name")');
  });

  it("filters by type and access", () => {
    expect(filterDatasets(DATASETS, {})).toEqual(DATASETS);
    expect(filterDatasets(DATASETS, { type: "images" }).map((d) => d.id)).toContain("limuc");
    expect(filterDatasets(DATASETS, { type: "images" }).every((d) => d.types.includes("images"))).toBe(true);
    const open = filterDatasets(DATASETS, { access: "open" });
    expect(open.map((d) => d.id)).toContain("limuc");
    expect(open.every((d) => d.access === "open")).toBe(true);
  });

  it("keeps datasets in topic further reading", () => {
    expect(linksFor("butyrate").some((l) => l.id === "ibdmdb")).toBe(true);
  });
});
