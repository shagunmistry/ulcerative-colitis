import { describe, expect, it } from "vitest";
import type { Fetch } from "../live/core";
import { HUB_PRESETS, searchHub } from "../live/hub";
import datasets from "./fixtures/hf-datasets.json";
import models from "./fixtures/hf-models.json";

const signal = () => new AbortController().signal;

/** Answers the dataset and model requests, and records what was asked for. */
function fake(forDatasets: unknown, forModels: unknown) {
  const urls: URL[] = [];
  const inits: (RequestInit | undefined)[] = [];
  const f: Fetch = async (input, init) => {
    const url = new URL(String(input));
    urls.push(url);
    inits.push(init);
    return new Response(JSON.stringify(url.pathname === "/api/datasets" ? forDatasets : forModels));
  };
  return { f, urls, inits };
}

const search = (forDatasets: unknown, forModels: unknown, next?: string) =>
  searchHub({ term: "kvasir", next }, signal(), fake(forDatasets, forModels).f);

const repos = (prefix: string, ...downloads: number[]) => downloads.map((n) => ({ id: `a/${prefix}${n}`, downloads: n }));

describe("searchHub", () => {
  it("offers preset terms", () => expect(HUB_PRESETS).toEqual(["LIMUC", "Kvasir", "IBDColEpi"]));

  it.each(["", "  ", "a", " a ", "\n b\t"])("makes no request for %j", async (term) => {
    const { f, urls } = fake([], []);
    await expect(searchHub({ term }, signal(), f)).resolves.toEqual({ results: [] });
    expect(urls).toEqual([]);
  });

  it("asks for datasets and models without any credentials", async () => {
    const { f, urls, inits } = fake([], []);
    await searchHub({ term: "ab" }, signal(), f);
    expect(urls.map((u) => u.origin + u.pathname).sort()).toEqual([
      "https://huggingface.co/api/datasets",
      "https://huggingface.co/api/models",
    ]);
    for (const url of urls)
      expect(Object.fromEntries(url.searchParams)).toEqual({
        search: "ab",
        full: "true",
        sort: "downloads",
        direction: "-1",
        limit: "50",
      });
    for (const init of inits) expect(Object.keys(init ?? {})).toEqual(["signal", "cache"]);
  });

  it("only trims the term, then encodes it", async () => {
    const { f, urls } = fake([], []);
    await searchHub({ term: "  a (b) &limit=1#\"c\"  " }, signal(), f);
    for (const url of urls) {
      expect(url.searchParams.get("search")).toBe('a (b) &limit=1#"c"');
      expect(url.searchParams.getAll("limit")).toEqual(["50"]);
      expect(url.hash).toBe("");
    }
  });

  it("maps saved responses", async () => {
    const batch = await search(datasets, models);
    expect(batch.total).toBeUndefined();
    expect(batch.next).toBeUndefined();
    expect(batch.results.map((r) => r.id)).toEqual([
      "dataset:SimulaMet/Kvasir-VQA-x1",
      "dataset:berkaytrhn/kvasir-seg",
      "dataset:San-D/Kvasir_V2",
      "model:goodcasper/kvasir_rtdetrv2_epoch500",
      "model:goodcasper/kvasir_capsule_only_bbox_4090",
      "model:goodcasper/kvasir_capsule_only_bbox_itri_official_split",
    ]);
    expect(batch.results[0]).toEqual({
      id: "dataset:SimulaMet/Kvasir-VQA-x1",
      title: "SimulaMet/Kvasir-VQA-x1",
      url: "https://huggingface.co/datasets/SimulaMet/Kvasir-VQA-x1",
      details: [
        { label: "Type", value: "Dataset" },
        { label: "Licence", value: "cc-by-nc-4.0" },
        { label: "Downloads", value: "21,674" },
        { label: "Last updated", value: "2025-08-27" },
      ],
    });
    expect(batch.results[3]).toMatchObject({
      url: "https://huggingface.co/goodcasper/kvasir_rtdetrv2_epoch500",
      details: [{ value: "Model" }, { value: "Not stated" }, { value: "835" }, { value: "2025-06-10" }],
    });
    expect(batch.results[4].details[1].value).toBe("apache-2.0");
  });

  it("orders both kinds together by downloads", async () => {
    const batch = await search(repos("d", 5, 30, 1), repos("m", 40, 10));
    expect(batch.results.map((r) => r.title)).toEqual(["a/m40", "a/d30", "a/m10", "a/d5", "a/d1"]);
  });

  it("keeps a dataset and a model of the same name apart", async () => {
    const batch = await search([{ id: "a/x" }], [{ id: "a/x" }]);
    expect(batch.results.map((r) => [r.id, r.url])).toEqual([
      ["dataset:a/x", "https://huggingface.co/datasets/a/x"],
      ["model:a/x", "https://huggingface.co/a/x"],
    ]);
  });

  it.each([
    [{ cardData: { license: "mit" }, tags: ["license:other"] }, "mit"],
    [{ cardData: { license: ["mit", "cc-by-4.0"] } }, "mit, cc-by-4.0"],
    [{ cardData: { license: [] }, tags: ["x", "license:mit"] }, "mit"],
    [{ cardData: { license: " " }, tags: ["license:mit", "license:apache-2.0"] }, "mit, apache-2.0"],
    [{ cardData: { license: [null, 4] } }, "Not stated"],
    [{ cardData: null, tags: null }, "Not stated"],
    [{ cardData: { license: { name: "mit" } }, tags: ["license:", "mit", 3] }, "Not stated"],
    [{}, "Not stated"],
  ])("reads the licence of %j", async (fields, licence) => {
    const batch = await search([{ id: "a/x", ...fields }], []);
    expect(batch.results[0].details[1]).toEqual({ label: "Licence", value: licence });
  });

  it("shows Not stated for missing details", async () => {
    const [result] = (await search([{ id: "squad", downloads: "9", lastModified: "soon" }], [])).results;
    expect(result.url).toBe("https://huggingface.co/datasets/squad");
    expect(result.details).toEqual([
      { label: "Type", value: "Dataset" },
      { label: "Licence", value: "Not stated" },
      { label: "Downloads", value: "Not stated" },
      { label: "Last updated", value: "Not stated" },
    ]);
  });

  it("shows no downloads as 0", async () =>
    expect((await search([{ id: "a/x", downloads: 0 }], [])).results[0].details[2].value).toBe("0"));

  it("drops entries without a well-formed repository id", async () => {
    const bad = ["", "a/", "/a", "a/b/c", "../x", "a/..", ".", "a/b?c=1", "a/b#c", "a b", "a%2F..", "https://x.test", "a\\b", "a/b\n", 7];
    const batch = await search([null, {}, "x", ...bad.map((id) => ({ id })), { id: "A-1/b_2.c" }], []);
    expect(batch.results.map((r) => r.id)).toEqual(["dataset:A-1/b_2.c"]);
  });

  it("pages by ten", async () => {
    const d = repos("d", ...Array.from({ length: 15 }, (_, i) => 100 - 2 * i));
    const m = repos("m", ...Array.from({ length: 10 }, (_, i) => 99 - 2 * i));
    const first = await search(d, m);
    expect(first.results).toHaveLength(10);
    expect(first.next).toBe("10");
    const second = await search(d, m, first.next);
    expect(second.results[0].title).toBe("a/d90");
    expect(second.next).toBe("20");
    const third = await search(d, m, second.next);
    expect(third.results).toHaveLength(5);
    expect(third.next).toBeUndefined();
  });

  it("offers no further page after exactly ten", async () =>
    expect((await search(repos("d", 1, 2, 3, 4, 5), repos("m", 1, 2, 3, 4, 5))).next).toBeUndefined());

  it("returns no results when both lists are empty", async () =>
    await expect(search([], [])).resolves.toEqual({ results: [], next: undefined }));

  describe.each(["datasets", "models"])("when the %s request fails", (kind) => {
    const failing = (answer: () => Promise<Response>): Fetch => async (input) =>
      new URL(String(input)).pathname === `/api/${kind}` ? answer() : new Response('[{"id":"a/x"}]');

    it.each([
      ["with status 429", async () => new Response("[]", { status: 429 })],
      ["with status 500", async () => new Response("[]", { status: 500 })],
      ["with a body that is not JSON", async () => new Response("<html>busy</html>")],
      ["without an answer", async () => Promise.reject(new TypeError("offline"))],
      ["with an error object", async () => new Response('{"error":"busy"}')],
      ["with null", async () => new Response("null")],
      ["with nothing usable", async () => new Response('[{"error":"busy"}]')],
    ])("%s, rejects the search", async (_, answer) =>
      await expect(searchHub({ term: "kvasir" }, signal(), failing(answer))).rejects.toThrow());
  });
});
