import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import Home from "../app/page";
import Privacy from "../app/privacy/page";
import Data from "../app/data/page";
import LiveSearchPage from "../app/data/search/page";
import { DataSwitch } from "../components/DataSwitch";
import { Header } from "../components/Header";
import { LiveResults, Sends } from "../components/LiveSearch";
import type { Fetch, Result } from "../live/core";
import { EMPTY, reduce, searcher, sourceLinks, type Query, type State, type Tab } from "../live/state";

vi.mock("next/navigation", () => ({ usePathname: () => "/data/search" }));

const decode = (html: string) =>
  html.replaceAll("&quot;", '"').replaceAll("&#x27;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");
const render = (node: React.ReactElement) => decode(renderToStaticMarkup(node));
const text = (html: string) => html.replace(/<[^>]+>/g, "");

const query = (over: Partial<Query> = {}): Query => ({
  tab: "trials",
  term: "diet",
  status: "RECRUITING",
  kind: "all",
  ...over,
});

describe("live search page", () => {
  const html = render(<LiveSearchPage />);

  it("starts with three choices, a Search button, the library link and no results", () => {
    const buttons = [...html.matchAll(/<button[^>]*>(.*?)<\/button>/g)].map((m) => text(m[1]!));
    expect(buttons.slice(0, 3)).toEqual(["Trials", "Papers", "Datasets and models"]);
    expect(buttons).toContain("Search");
    expect(html).toMatch(/<a[^>]*href="\/data"[^>]*>Library</);
    expect(html).not.toContain("Listed by");
    expect(html).not.toContain("<article");
    expect(html).toMatch(/<p role="status"[^>]*><\/p>/);
  });

  it("starts on trials that are recruiting, with the common searches", () => {
    const pressed = [...html.matchAll(/<button[^>]*aria-pressed="true"[^>]*>(.*?)<\/button>/g)].map((m) => m[1]);
    expect(pressed).toEqual(["Trials", "Recruiting"]);
    for (const preset of ["vedolizumab", "diet", "fecal microbiota transplantation"]) expect(html).toContain(`>${preset}<`);
  });

  it("says who receives the term before it is sent", () => {
    expect(html).toContain("US National Library of Medicine");
    expect(html).toContain("IP address");
    expect(render(<Sends tab="papers" />)).toContain("US National Library of Medicine");
    expect(render(<Sends tab="hub" />)).toContain("Hugging Face");
    expect(render(<Sends tab="hub" />)).not.toContain("National Library");
  });

  it("cannot put the term in the page address, even before its script runs", () => {
    const input = /<input[^>]*>/.exec(html)![0];
    expect(input).not.toContain("name=");
    expect(input).toContain('autoComplete="off"');
  });
});

describe("data navigation", () => {
  it.each([
    ["/data", "Library"],
    ["/data/search", "Live search"],
  ])("marks %s as current in the switch", (current, label) => {
    const html = render(<DataSwitch current={current} />);
    expect([...html.matchAll(/<a[^>]*href="([^"]+)"/g)].map((m) => m[1])).toEqual(["/data", "/data/search"]);
    expect(html).toMatch(new RegExp(`aria-current="page"[^>]*>${label}<`));
    expect(html.split("aria-current").length).toBe(2);
  });

  it("is on the library page and linked from the landing page", () => {
    expect(render(<Data />)).toContain('href="/data/search"');
    expect(render(<Home />)).toContain('href="/data/search"');
  });

  it("shows Data as current in the top bar", () => {
    const link = /<a[^>]*href="\/data"[^>]*>Data</.exec(render(<Header />))![0];
    expect(link).toContain("border-[var(--source)]");
  });

  it("is explained on the privacy page", () => {
    const html = text(render(<Privacy />));
    for (const words of ["Live search", "IP address", "US National Library of Medicine", "Hugging Face", "2026-11-26"])
      expect(html).toContain(words);
    expect(html).not.toContain("no forms that send data");
    // The links offered after an empty or failed search carry the term.
    expect(html).toContain("in the address, which stays in your browser history");
    for (const label of ["Run this search on", "on Hugging Face"]) expect(html).toContain(label);
  });
});

const result = (id: string, title = `Title ${id}`): Result => ({
  id,
  title,
  url: `https://example.org/${id}`,
  details: [{ label: "Status", value: "Recruiting" }],
});

const shown = (over: Partial<State> = {}): State => ({
  phase: "done",
  query: query(),
  results: [result("a")],
  ...over,
});

const view = (state: State) => render(<LiveResults state={state} onMore={() => {}} />);

const SERVICES: [Tab, string][] = [
  ["trials", "ClinicalTrials.gov"],
  ["papers", "PubMed"],
  ["hub", "Hugging Face"],
];
const CARE = "Talk to your care team before contacting a study.";
const UNRELATED = "Results may be unrelated to ulcerative colitis. No results does not mean no data exists.";

describe("shown results", () => {
  it.each(SERVICES)("labels %s results as unreviewed, in the signal colour", (tab, service) => {
    const html = view(shown({ query: query({ tab }) }));
    const label = html.indexOf(`Listed by ${service}. Not reviewed by us.`);
    expect(label).toBeGreaterThan(-1);
    expect(label).toBeLessThan(html.indexOf("Title a"));
    expect(html).toMatch(/text-\[var\(--signal\)\][^>]*>(<[^>]+>)*Listed by/);
    expect(html.includes(CARE)).toBe(tab === "trials");
    expect(html.includes(UNRELATED)).toBe(tab === "hub");
  });

  it("shows outside text as plain text", () => {
    const html = renderToStaticMarkup(
      <LiveResults state={shown({ results: [result("a", "<img src=x onerror=alert(1)>")] })} onMore={() => {}} />,
    );
    expect(html).toContain("&lt;img src=x");
    expect(html).not.toContain("<img");
  });

  it("states how trial listings are changed", () => {
    expect(text(view(shown()))).toContain(
      "We show selected fields, write status and phase codes as words, and list each treatment and country once. Missing details are shown as “Not stated”, and entries without a valid trial number are left out.",
    );
  });

  it.each(["loading", "failed", "offline", "done"] as const)(
    "puts the %s message by Show more, below the results and their labels",
    (phase) => {
      const html = view(shown({ phase, next: "x" }));
      const at = ["Listed by", "Title a", 'role="status"', "Show more"].map((part) => html.indexOf(part));
      expect(at).not.toContain(-1);
      expect(at).toEqual([...at].sort((a, b) => a - b));
      expect(html.split('role="status"').length).toBe(2);
      if (phase === "failed") {
        const source = html.indexOf(sourceLinks(query())[0]!.href);
        expect(source).toBeGreaterThan(at[2]!);
        expect(source).toBeLessThan(at[3]!);
      }
    },
  );

  it.each(["done", "failed"] as const)("puts the %s message first when there are no results", (phase) => {
    const html = view(shown({ phase, results: [] }));
    expect(html).toMatch(/^<section[^>]*><p role="status"/);
    if (phase === "done") expect(html.indexOf("Listed by")).toBeGreaterThan(html.indexOf(sourceLinks(query())[0]!.href));
  });

  it("shows Show more as unavailable while loading", () => {
    const button = (phase: State["phase"]) => /<button[^>]*>Show more/.exec(view(shown({ phase, next: "x" })))![0];
    expect(button("loading")).toContain('aria-disabled="true"');
    expect(button("loading")).toContain("aria-disabled:opacity-60");
    expect(button("done")).toContain('aria-disabled="false"');
  });

  it("gives the date ClinicalTrials.gov processed the data, or says it did not", () => {
    expect(text(view(shown({ dataDate: "2026-11-24" })))).toContain(
      "Data processed by ClinicalTrials.gov on 2026-11-24.",
    );
    expect(view(shown({ dataDate: null }))).toContain("did not give the date");
    expect(view(shown({ query: query({ tab: "papers" }) }))).not.toContain("processed");
  });

  it("counts results, with the total where there is one", () => {
    expect(view(shown({ total: 1935 }))).toContain("Showing 1 of 1,935 results.");
    expect(view(shown())).toContain("Showing 1 result.");
  });

  it("offers Show more only when there is another page", () => {
    expect(view(shown({ next: "x" }))).toContain("Show more");
    expect(view(shown())).not.toContain("Show more");
  });

  it("has its own message for each state, announced as a status", () => {
    const messages = (["loading", "done", "failed", "offline", "short"] as const).map((phase) => {
      const html = view(shown({ phase, results: [] }));
      return /<p role="status"[^>]*>([^<]+)<\/p>/.exec(html)![1];
    });
    expect(new Set(messages).size).toBe(5);
    expect(messages).toEqual([
      "Searching ClinicalTrials.gov.",
      "No results from ClinicalTrials.gov.",
      "ClinicalTrials.gov did not answer.",
      "You are offline. Live search needs a connection.",
      "Type at least two characters.",
    ]);
  });

  it.each(["done", "failed"] as const)("links to the same search on the source site when %s with nothing", (phase) => {
    const state = shown({ phase, results: [] });
    for (const link of sourceLinks(state.query!)) expect(view(state)).toContain(link.href);
  });

  it("keeps the results and Show more when a later page fails", () => {
    const html = view(shown({ phase: "failed", next: "x" }));
    expect(html).toContain("Title a");
    expect(html).toContain("Show more");
    expect(html).toContain("ClinicalTrials.gov did not answer.");
    expect(html).toContain(sourceLinks(query())[0]!.href);
  });
});

describe("links to the source site", () => {
  const url = (q: Partial<Query>) => new URL(sourceLinks(query(q))[0]!.href);

  it("repeats a trial search and its status", () => {
    const u = url({ term: "OR diet", status: "COMPLETED" });
    expect(u.origin + u.pathname).toBe("https://clinicaltrials.gov/search");
    expect(Object.fromEntries(u.searchParams)).toEqual({
      cond: "ulcerative colitis",
      term: "or diet",
      aggFilters: "status:com",
    });
    expect(url({ status: "RECRUITING" }).searchParams.get("aggFilters")).toBe("status:rec");
    expect(url({ status: "NOT_YET_RECRUITING" }).searchParams.get("aggFilters")).toBe("status:not");
    const all = url({ term: " ", status: "ALL" }).searchParams;
    expect([...all.keys()]).toEqual(["cond"]);
  });

  it("repeats a paper search and its kind", () => {
    const u = url({ tab: "papers", term: "diet", kind: "review" });
    expect(u.origin).toBe("https://pubmed.ncbi.nlm.nih.gov");
    expect(u.searchParams.get("term")).toBe('"colitis, ulcerative"[MeSH Terms] AND (diet) AND review[pt]');
  });

  it("repeats an excluding paper search as the site sends it", () => {
    const u = url({ tab: "papers", term: "NOT cancer", kind: "all" });
    expect(u.searchParams.get("term")).toBe('"colitis, ulcerative"[MeSH Terms] NOT (cancer)');
  });

  it("links both kinds on Hugging Face", () => {
    expect(sourceLinks(query({ tab: "hub", term: " Kvasir " })).map((l) => l.href)).toEqual([
      "https://huggingface.co/datasets?search=Kvasir",
      "https://huggingface.co/models?search=Kvasir",
    ]);
  });
});

/** A search with a recording stand-in for the network. */
function start(reply: (url: URL) => unknown = () => ({ studies: [] })) {
  let state = EMPTY;
  const urls: URL[] = [];
  const net = { online: true };
  const fetch = (async (address: string) => {
    const url = new URL(address);
    urls.push(url);
    const body = url.pathname.endsWith("/version") ? { dataTimestamp: "2026-11-24T09:00:00" } : await reply(url);
    return new Response(JSON.stringify(body));
  }) as Fetch;
  const live = searcher(
    (action) => (state = reduce(state, action)),
    fetch,
    () => net.online,
  );
  const searches = () => urls.filter((u) => !u.pathname.endsWith("/version"));
  return { live, net, urls, searches, state: () => state };
}

const trialsPage = (ids: number[], extra: object = {}) => ({
  studies: ids.map((n) => ({ protocolSection: { identificationModule: { nctId: `NCT0000000${n}`, briefTitle: `T${n}` } } })),
  ...extra,
});

/** Lets the date request, which no search waits for, finish. */
const settle = () => new Promise((resolve) => setTimeout(resolve, 5));

describe("searching", () => {
  afterEach(() => vi.restoreAllMocks());

  it("requests nothing until asked", () => {
    expect(start().urls).toEqual([]);
  });

  it("fetches trials with the data date", async () => {
    const t = start(() => trialsPage([1], { totalCount: 12, nextPageToken: "p2" }));
    await t.live.search(query());
    await settle();
    expect(t.state()).toMatchObject({ phase: "done", total: 12, next: "p2", dataDate: "2026-11-24" });
    expect(t.urls.filter((u) => u.pathname.endsWith("/version"))).toHaveLength(1);
  });

  it("says so when ClinicalTrials.gov sends no date", async () => {
    let state = EMPTY;
    const fetch = (async (url: string) =>
      new Response(JSON.stringify(url.endsWith("/version") ? {} : trialsPage([1])))) as Fetch;
    await searcher((a) => (state = reduce(state, a)), fetch, () => true).search(query());
    await settle();
    expect(state).toMatchObject({ phase: "done", dataDate: null });
  });

  it("treats an empty date as missing", async () => {
    let state = EMPTY;
    const fetch = (async (url: string) =>
      new Response(JSON.stringify(url.endsWith("/version") ? { dataTimestamp: "" } : trialsPage([1])))) as Fetch;
    await searcher((a) => (state = reduce(state, a)), fetch, () => true).search(query());
    await settle();
    expect(state.dataDate).toBeNull();
  });

  it("asks for a missing date again at Show more, and only then", async () => {
    let state = EMPTY;
    let versions = 0;
    const fetch = (async (url: string) => {
      if (!url.endsWith("/version"))
        return new Response(JSON.stringify(trialsPage([1], { nextPageToken: "p2" })));
      versions++;
      return versions === 1
        ? new Response("", { status: 500 })
        : new Response(JSON.stringify({ dataTimestamp: "2026-11-24T09:00:00" }));
    }) as Fetch;
    const live = searcher((a) => (state = reduce(state, a)), fetch, () => true);
    await live.search(query());
    await settle();
    expect(state.dataDate).toBeNull();
    await live.more(state);
    await settle();
    expect(state.dataDate).toBe("2026-11-24");
    await live.more(state);
    await settle();
    expect(versions).toBe(2);
  });

  it("does not fail the search when the data date cannot be fetched", async () => {
    let state = EMPTY;
    const fetch = (async (url: string) =>
      url.endsWith("/version")
        ? new Response("", { status: 500 })
        : new Response(JSON.stringify(trialsPage([1])))) as Fetch;
    await searcher((a) => (state = reduce(state, a)), fetch, () => true).search(query());
    await settle();
    expect(state).toMatchObject({ phase: "done", dataDate: null });
    expect(state.results).toHaveLength(1);
  });

  it("appends the next page of the same search, without repeats, and keeps the total", async () => {
    const t = start((url) =>
      url.searchParams.has("pageToken")
        ? trialsPage([2, 3])
        : trialsPage([1, 2], { totalCount: 3, nextPageToken: "p2" }),
    );
    await t.live.search(query({ term: "diet", status: "COMPLETED" }));
    await t.live.more(t.state());
    expect(t.state()).toMatchObject({ phase: "done", total: 3, next: undefined });
    expect(t.state().results.map((r) => r.title)).toEqual(["T1", "T2", "T3"]);
    const params = t.searches()[1]!.searchParams;
    expect([params.get("query.term"), params.get("filter.overallStatus"), params.get("pageToken")]).toEqual([
      "diet",
      "COMPLETED",
      "p2",
    ]);
  });

  it("keeps the results when the next page fails, and can try again", async () => {
    let broken = false;
    const t = start(() => (broken ? {} : trialsPage([1], { totalCount: 3, nextPageToken: "p2" })));
    await t.live.search(query());
    broken = true;
    await t.live.more(t.state());
    expect(t.state()).toMatchObject({ phase: "failed", total: 3, next: "p2" });
    expect(t.state().results).toHaveLength(1);
  });

  it("clears old results for a new search, and reports a failure without logging it", async () => {
    const spies = (["log", "info", "warn", "error", "debug"] as const).map((m) => vi.spyOn(console, m));
    let broken = false;
    const t = start(() => (broken ? {} : trialsPage([1], { totalCount: 1 })));
    await t.live.search(query());
    broken = true;
    await t.live.search(query({ term: "other" }));
    expect(t.state()).toMatchObject({ phase: "failed", results: [] });
    expect(t.state().total).toBeUndefined();
    for (const spy of spies) expect(spy).not.toHaveBeenCalled();
  });

  it("says it is offline without sending anything", async () => {
    const t = start();
    t.net.online = false;
    await t.live.search(query());
    expect(t.state().phase).toBe("offline");
    expect(t.urls).toEqual([]);
  });

  it("keeps results when offline at Show more", async () => {
    const t = start(() => trialsPage([1], { nextPageToken: "p2" }));
    await t.live.search(query());
    t.net.online = false;
    await t.live.more(t.state());
    expect(t.state()).toMatchObject({ phase: "offline", next: "p2" });
    expect(t.state().results).toHaveLength(1);
  });

  it("calls a failure offline when the connection has dropped", async () => {
    const t = start(() => {
      t.net.online = false;
      throw new TypeError("Failed to fetch");
    });
    await t.live.search(query());
    expect(t.state().phase).toBe("offline");
  });

  it("ignores a cancelled search that answers late", async () => {
    let answer!: (body: unknown) => void;
    const t = start(() => new Promise((resolve) => (answer = resolve)));
    const running = t.live.search(query());
    expect(t.state().phase).toBe("loading");
    t.live.clear();
    answer(trialsPage([1]));
    await running;
    await settle();
    expect(t.state()).toEqual(EMPTY);
  });

  it("shows only the newest of two searches", async () => {
    const answers: ((body: unknown) => void)[] = [];
    const t = start(() => new Promise((resolve) => answers.push(resolve)));
    const first = t.live.search(query({ term: "one" }));
    const second = t.live.search(query({ term: "two" }));
    await settle();
    answers[1]!(trialsPage([2]));
    answers[0]!(trialsPage([1]));
    await Promise.all([first, second]);
    expect(t.state().results.map((r) => r.title)).toEqual(["T2"]);
  });

  it("asks Hugging Face for nothing under two characters", async () => {
    const t = start();
    await t.live.search(query({ tab: "hub", term: " a " }));
    expect(t.state().phase).toBe("short");
    expect(t.urls).toEqual([]);
  });

  it("sends papers and datasets to their own services only", async () => {
    const papers = start(() => ({ esearchresult: { count: "0", idlist: [] } }));
    await papers.live.search(query({ tab: "papers" }));
    expect(papers.urls.map((u) => u.host)).toEqual(["eutils.ncbi.nlm.nih.gov"]);
    expect(papers.state()).toMatchObject({ phase: "done", results: [], total: 0 });
    const hub = start(() => []);
    await hub.live.search(query({ tab: "hub" }));
    expect(hub.urls.map((u) => u.host)).toEqual(["huggingface.co", "huggingface.co"]);
  });
});
