import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanTerm, getJson, latestOnly, type Fetch } from "../live/core";
import { searchPapers } from "../live/papers";
import { searchTrials, trialsDataDate } from "../live/trials";
import esearch from "./fixtures/esearch.json";
import esummary from "./fixtures/esummary.json";
import trials from "./fixtures/trials.json";

const signal = () => new AbortController().signal;

/** Answers each request with the next body, and records the addresses asked for. */
function fake(...bodies: unknown[]) {
  const urls: URL[] = [];
  const f: Fetch = async (input) => {
    urls.push(new URL(String(input)));
    return new Response(JSON.stringify(bodies[urls.length - 1]));
  };
  return { f, urls };
}

afterEach(() => vi.useRealTimers());

describe("cleanTerm", () => {
  it.each([
    ["a) OR (cancer", "a OR cancer"],
    ['"x"[ti]', "x ti"],
    ["  ", ""],
    ["{a}\\ <b> #1 “c” （d）", "a b 1 c d"],
    ["  diet \n\t stress ", "diet stress"],
    ["diet\u200Bstress", "diet stress"],
    ["\uFEFFdiet\u0000\u00AD", "diet"],
    ["\u200B\u2060", ""],
  ])("cleans %j", (i, o) => expect(cleanTerm(i)).toBe(o));

  it("caps the length at 100 characters", () => {
    expect(cleanTerm("a".repeat(300))).toBe("a".repeat(100));
    expect(cleanTerm(`${"a".repeat(99)} b`)).toBe("a".repeat(99));
  });
});

describe("getJson", () => {
  it("returns the parsed body", async () =>
    await expect(getJson("https://x", signal(), async () => new Response('{"a":1}'))).resolves.toEqual({ a: 1 }));

  it.each([429, 500])("rejects status %i", async (status) =>
    await expect(getJson("https://x", signal(), async () => new Response("{}", { status }))).rejects.toThrow());

  it("rejects a body that is not JSON", async () =>
    await expect(getJson("https://x", signal(), async () => new Response("<html>busy</html>"))).rejects.toThrow());

  it.each([
    ["that never answers", (() => new Promise<Response>(() => {})) as Fetch],
    ["whose body stalls", (async () => new Response(new ReadableStream())) as Fetch],
  ])("gives up after 15 seconds on a service %s", async (_, f) => {
    vi.useFakeTimers();
    let given: AbortSignal | undefined;
    let outcome = "waiting";
    getJson("https://x", signal(), (input, init) => {
      given = init?.signal ?? undefined;
      return f(input, init);
    }).then(
      () => (outcome = "answered"),
      () => (outcome = "rejected"),
    );
    await vi.advanceTimersByTimeAsync(14_999);
    expect(outcome).toBe("waiting");
    await vi.advanceTimersByTimeAsync(1);
    expect(outcome).toBe("rejected");
    expect(given?.aborted).toBe(true);
  });

  it("stops when the caller cancels", async () => {
    const caller = new AbortController();
    let given: AbortSignal | undefined;
    const pending = getJson("https://x", caller.signal, (_, init) => {
      given = init?.signal ?? undefined;
      return new Promise<Response>(() => {});
    });
    caller.abort();
    await expect(pending).rejects.toThrow();
    expect(given?.aborted).toBe(true);
  });

  it("sends nothing if already cancelled", async () => {
    const { f, urls } = fake({});
    await expect(getJson("https://x", AbortSignal.abort(), f)).rejects.toThrow();
    expect(urls).toEqual([]);
  });

  it("leaves no timer behind", async () => {
    vi.useFakeTimers();
    await getJson("https://x", signal(), async () => new Response("{}"));
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe("latestOnly", () => {
  it.each(["answers", "fails"])("discards an earlier task that %s after a newer one", async (ending) => {
    const run = latestOnly();
    let finish!: () => void;
    let first!: AbortSignal;
    const slow = run((s) => {
      first = s;
      return new Promise<string>((resolve, reject) => {
        finish = () => (ending === "answers" ? resolve("old") : reject(new Error("old")));
      });
    });
    const fast = run(async () => "new");
    expect(first.aborted).toBe(true);
    await expect(fast).resolves.toBe("new");
    finish();
    await expect(slow).resolves.toBeUndefined();
  });

  it("passes on the failure of the newest task", async () =>
    await expect(latestOnly()(async () => Promise.reject(new Error("down")))).rejects.toThrow("down"));
});

describe("searchTrials", () => {
  const study = (protocolSection: object) => ({ protocolSection });

  it("asks for ulcerative colitis trials, recently updated first", async () => {
    const { f, urls } = fake(trials);
    await searchTrials({ term: "a) OR (cancer", status: "RECRUITING" }, signal(), f);
    expect(urls).toHaveLength(1);
    expect(urls[0].origin + urls[0].pathname).toBe("https://clinicaltrials.gov/api/v2/studies");
    expect(Object.fromEntries(urls[0].searchParams)).toEqual({
      "query.cond": "ulcerative colitis",
      "query.term": "a OR cancer",
      "filter.overallStatus": "RECRUITING",
      sort: "LastUpdatePostDate:desc",
      pageSize: "10",
      countTotal: "true",
      fields: "NCTId,BriefTitle,OverallStatus,Phase,InterventionName,LocationCountry,LastUpdatePostDate",
    });
  });

  it("leaves out an empty term and the status filter for all, and passes the page token", async () => {
    const { f, urls } = fake(trials);
    await searchTrials({ term: " () ", status: "ALL", next: "abc" }, signal(), f);
    const q = urls[0].searchParams;
    expect(q.has("query.term")).toBe(false);
    expect(q.has("filter.overallStatus")).toBe(false);
    expect(q.get("pageToken")).toBe("abc");
  });

  // ClinicalTrials.gov answers 400 to an operator with nothing on one side of it.
  it.each([
    ["OR cancer", "or cancer"],
    ["cancer OR", "cancer or"],
    ["NOT", "not"],
    ["x AND AND y", "x and and y"],
    ["diet OR -", "diet or -"],
    ["AREA diet", "area diet"],
    ["OR, diet", "or diet"],
    ["diet,NOT", "diet not"],
    ["diet OR stress NOT smoking", "diet OR stress NOT smoking"],
    ["NOT smoking", "NOT smoking"],
    ["diet AND NOT 'smoking'", "diet AND NOT 'smoking'"],
    ["'diet' OR -smoking", "'diet' OR -smoking"],
    ["diet AND NOT smoking", "diet AND NOT smoking"],
    ["diet OR NOT smoking", "diet OR NOT smoking"],
    ["OR NOT smoking", "or NOT smoking"],
    ["NOT NOT smoking", "not NOT smoking"],
    ["diet AND NOT", "diet and not"],
    ["diet NOT AND smoking", "diet not and smoking"],
  ])("sends %j as %j", async (term, sent) => {
    const { f, urls } = fake(trials);
    await searchTrials({ term, status: "ALL" }, signal(), f);
    expect(urls[0].searchParams.get("query.term")).toBe(sent);
  });

  it("maps a saved response", async () => {
    const batch = await searchTrials({ term: "", status: "RECRUITING" }, signal(), fake(trials).f);
    expect(batch.total).toBe(trials.totalCount);
    expect(batch.next).toBe(trials.nextPageToken);
    expect(batch.results).toHaveLength(3);
    expect(batch.results[0]).toEqual({
      id: "NCT06636656",
      title: "A Study to Test Whether BI 3032950 Helps People With Ulcerative Colitis",
      url: "https://clinicaltrials.gov/study/NCT06636656",
      details: [
        { label: "Status", value: "Recruiting" },
        { label: "Phase", value: "Phase 2" },
        { label: "Treatments tested", value: "BI 3032950 intravenous (Part A); BI 3032950 subcutaneous (Part B)" },
        { label: "Countries", value: "United States, Belgium, Czechia" },
        { label: "Last updated", value: "2026-11-25" },
      ],
    });
    expect(batch.results[1].details[1].value).toBe("Not applicable");
  });

  it("words statuses and phases for readers", async () => {
    const body = {
      studies: [
        study({
          identificationModule: { nctId: "NCT00000001", briefTitle: "t" },
          statusModule: { overallStatus: "ACTIVE_NOT_RECRUITING" },
          designModule: { phases: ["EARLY_PHASE1", "PHASE2"] },
        }),
        study({
          identificationModule: { nctId: "NCT00000002", briefTitle: "t" },
          statusModule: { overallStatus: "NOT_YET_RECRUITING" },
        }),
      ],
    };
    const [a, b] = (await searchTrials({ term: "", status: "ALL" }, signal(), fake(body).f)).results;
    expect(a.details.slice(0, 2).map((d) => d.value)).toEqual(["Active, not recruiting", "Early phase 1, Phase 2"]);
    expect(b.details[0].value).toBe("Not yet recruiting");
  });

  it("shows Not stated for missing details and drops studies without a valid id", async () => {
    const body = {
      studies: [
        study({ identificationModule: { nctId: "NCT01234567", briefTitle: "Bare" } }),
        study({ identificationModule: { nctId: "NCT123", briefTitle: "Short id" } }),
        study({ identificationModule: { nctId: "NCT01234567/../x", briefTitle: "Odd id" } }),
        study({ identificationModule: { briefTitle: "No id" } }),
        {},
        null,
      ],
    };
    const batch = await searchTrials({ term: "", status: "ALL" }, signal(), fake(body).f);
    expect(batch.results.map((r) => r.title)).toEqual(["Bare"]);
    expect(batch.results[0].details).toEqual(
      ["Status", "Phase", "Treatments tested", "Countries", "Last updated"].map((label) => ({ label, value: "Not stated" })),
    );
    expect(batch.next).toBeUndefined();
    expect(batch.total).toBeUndefined();
  });

  it("returns no results for an empty list", async () =>
    await expect(searchTrials({ term: "x", status: "ALL" }, signal(), fake({ totalCount: 0, studies: [] }).f)).resolves.toEqual({
      results: [],
      total: 0,
      next: undefined,
    }));

  it.each([{}, { error: "busy" }, null])("rejects the body %j", async (body) =>
    await expect(searchTrials({ term: "x", status: "ALL" }, signal(), fake(body).f)).rejects.toThrow());

  it("reads the date the data was processed", async () => {
    const { f, urls } = fake({ apiVersion: "2.0.5", dataTimestamp: "2026-11-25T10:00:05" });
    await expect(trialsDataDate(signal(), f)).resolves.toBe("2026-11-25");
    expect(urls[0].href).toBe("https://clinicaltrials.gov/api/v2/version");
    await expect(trialsDataDate(signal(), fake({}).f)).resolves.toBeUndefined();
  });
});

describe("searchPapers", () => {
  const mesh = '"colitis, ulcerative"[MeSH Terms]';
  const found = (count: number, idlist: string[]) => ({ esearchresult: { count: String(count), idlist } });
  const summaries = (...records: { uid: string; [key: string]: unknown }[]) => ({
    result: { uids: records.map((r) => r.uid), ...Object.fromEntries(records.map((r) => [r.uid, r])) },
  });

  it("searches, then summarises the ids found", async () => {
    const { f, urls } = fake(esearch, esummary);
    await searchPapers({ term: "a) OR (cancer", kind: "all" }, signal(), f);
    expect(urls.map((u) => u.origin + u.pathname)).toEqual([
      "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi",
      "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi",
    ]);
    expect(Object.fromEntries(urls[0].searchParams)).toEqual({
      db: "pubmed",
      retmode: "json",
      retmax: "10",
      sort: "pub_date",
      tool: "ulcerative-colitis-web",
      term: `${mesh} AND (a OR cancer)`,
    });
    expect(Object.fromEntries(urls[1].searchParams)).toEqual({
      db: "pubmed",
      retmode: "json",
      tool: "ulcerative-colitis-web",
      id: esearch.esearchresult.idlist.join(","),
    });
  });

  it.each([
    ["all", "", mesh],
    ["review", "diet", `${mesh} AND (diet) AND review[pt]`],
    ["trial", "", `${mesh} AND randomized controlled trial[pt]`],
    ["guideline", "diet", `${mesh} AND (diet) AND (guideline[pt] OR practice guideline[pt])`],
  ] as const)("builds the %s query for %j", async (kind, term, expected) => {
    const { f, urls } = fake(found(0, []));
    await searchPapers({ term, kind }, signal(), f);
    expect(urls[0].searchParams.get("term")).toBe(expected);
  });

  it("maps saved responses", async () => {
    const batch = await searchPapers({ term: "vedolizumab", kind: "review" }, signal(), fake(esearch, esummary).f);
    expect(batch.total).toBe(Number(esearch.esearchresult.count));
    expect(batch.next).toBe("10");
    expect(batch.results[1]).toEqual({
      id: "42361097",
      title: "Advanced therapies in management of pediatric inflammatory bowel disease.",
      url: "https://pubmed.ncbi.nlm.nih.gov/42361097/",
      details: [
        { label: "Journal", value: "Current opinion in pediatrics" },
        { label: "Published", value: "2026 Oct 1" },
        { label: "Authors", value: "Williams J, Gurram B" },
      ],
    });
    expect(batch.results[0].details[2].value).toBe("Faggiani I, Tuttle C, Danese S and others");
  });

  it("keeps the order of the search", async () => {
    const f = fake(found(2, ["2", "1"]), summaries({ uid: "1", title: "one" }, { uid: "2", title: "two" })).f;
    const batch = await searchPapers({ term: "", kind: "all" }, signal(), f);
    expect(batch.results.map((r) => r.id)).toEqual(["2", "1"]);
  });

  it("shows Not stated for missing details and removes tags from titles", async () => {
    const f = fake(
      found(1, ["7"]),
      summaries({ uid: "7", title: "<i>C. difficile</i> in CD4<sup>+</sup> cells when p<0.05 and q>1" }),
    ).f;
    const [paper] = (await searchPapers({ term: "", kind: "all" }, signal(), f)).results;
    expect(paper.title).toBe("C. difficile in CD4+ cells when p<0.05 and q>1");
    expect(paper.details).toEqual(["Journal", "Published", "Authors"].map((label) => ({ label, value: "Not stated" })));
  });

  it.each([
    [25, undefined, "10"],
    [25, "10", "20"],
    [25, "20", undefined],
    [10, undefined, undefined],
    // PubMed refuses to start past record 9998.
    [50_000, "9980", "9990"],
    [50_000, "9990", undefined],
  ])("with %i found, after %j the next page is %j", async (count, next, expected) => {
    const { f, urls } = fake(found(count, ["1"]), summaries({ uid: "1" }));
    const batch = await searchPapers({ term: "", kind: "all", next }, signal(), f);
    expect(urls[0].searchParams.get("retstart")).toBe(next ?? null);
    expect(batch.next).toBe(expected);
  });

  it("makes one request when nothing is found", async () => {
    const { f, urls } = fake(found(0, []));
    await expect(searchPapers({ term: "zzz", kind: "all" }, signal(), f)).resolves.toEqual({ results: [], total: 0, next: undefined });
    expect(urls).toHaveLength(1);
  });

  it.each([
    ["a search error", [{ esearchresult: { ERROR: "Search Backend failed" } }]],
    ["a search error with a list", [{ esearchresult: { ERROR: "x", count: "0", idlist: [] } }]],
    ["a top-level search error", [{ error: "API rate limit exceeded" }]],
    ["an empty search body", [{}]],
    ["a top-level summary error", [found(1, ["1"]), { error: "API rate limit exceeded" }]],
    ["a summary error", [found(1, ["1"]), { esummaryresult: ["Invalid uid"] }]],
    ["a summary of nothing asked for", [found(1, ["1"]), summaries()]],
    ["only failed summaries", [found(1, ["1"]), summaries({ uid: "1", error: "cannot get document summary" })]],
  ])("rejects %s", async (_, bodies) =>
    await expect(searchPapers({ term: "x", kind: "all" }, signal(), fake(...bodies).f)).rejects.toThrow());
});
