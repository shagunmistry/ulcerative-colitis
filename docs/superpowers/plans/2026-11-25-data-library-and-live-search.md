# Data Library and Live Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A curated data library at `/data` (part A) and live search of trials, papers and Hugging Face at `/data/search` (part B).

**Architecture:** Datasets are a typed list in `packages/evidence`, rendered statically and exported as JSON. Live search is three small clients in `apps/web/live` that the browser calls directly, each mapping a service's response to one shared result shape.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, Tailwind 3, Vitest 5, pnpm workspaces. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-25-data-library-and-live-search-design.md`

## Global Constraints

- No new paid services, database, server secrets, tokens or npm dependencies.
- Licence, access and size come from the host's own page; otherwise exactly `Not stated`. Never infer.
- Never copy datasets or abstracts into the repo. Never commit patient data.
- A search term never goes in our page address, storage, our server or analytics.
- Outside text is rendered as plain text only. No `dangerouslySetInnerHTML`.
- Unreviewed outside results are labelled in `--signal`; provenance uses `--source`.
- No personal email address in any request.
- Works at 320px, by keyboard, in both themes, with reduced motion.
- Existing writing rules: no drug ranking, no recommendation wording, no personal prediction.
- Pushing `main` deploys production: do not push without the owner's go-ahead.
- Part A (Tasks 1 to 3) must be shippable before part B (Tasks 4 to 7) starts.

## Review Focus

- A term containing brackets, quotes, field tags or `OR`: results stay limited to ulcerative colitis and nothing breaks (Task 4).
- A slow earlier search answering after a newer one or after a tab switch: it is discarded (Task 4).
- A service answering with 429, an error body or non-JSON: the "did not answer" message, never "no results" (Task 4).
- Records with missing phase, date, authors, countries or licence: `Not stated`, no crash (Tasks 4 and 5).
- A service that never answers: gives up after 15 seconds (Task 4).

---

### Task 1: Dataset list

**Files:**
- Create: `packages/evidence/src/datasets.ts`, `packages/evidence/test/datasets.test.ts`
- Modify: `packages/evidence/src/index.ts`, `links.ts`, `search.ts`, `packages/evidence/test/search.test.ts`, `pipelines/verify-links.mjs`, `apps/web/components/SearchBox.tsx`, `apps/web/app/page.tsx`, `CONTRIBUTING.md`

**Interfaces (produces):**
```ts
export type DataType = "images" | "gene-expression" | "microbiome" | "clinical" | "other";
export type Access = "open" | "registration" | "application" | "not-stated";
export interface Copy { host: "Hugging Face" | "Kaggle"; id: string; original: boolean; checkedOn: string }
export interface Dataset {
  id: string; title: string; publisher: string; url: string; termsUrl: string;
  summary: string; types: DataType[]; size: string; licence: string; access: Access;
  accessNote?: string; citation: string; topics: string[]; copies: Copy[]; checkedOn: string;
}
export const NOT_STATED = "Not stated";
export const DATASETS: Dataset[];
export const copyUrl: (copy: Copy) => string;
export const loadSnippet: (copy: Copy) => string;
export function filterDatasets(list: Dataset[], by: { type?: DataType; access?: Access }): Dataset[];
```
`Hit.kind` becomes `"topic" | "link" | "dataset"`; dataset hits use `href: "/data#<id>"`.

- [ ] **Step 1: Write the failing tests** in `datasets.test.ts`

```ts
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
});
it("keeps datasets in topic further reading", () => {
  expect(linksFor("butyrate").some((l) => l.id === "ibdmdb")).toBe(true);
});
```
In `search.test.ts`: `search("LIMUC")[0]` has `kind: "dataset"`, `href: "/data#limuc"`; change the outside-link test to search `"NICE"`.

- [ ] **Step 2:** Run `pnpm --filter @uc/evidence test`. Expected: FAIL, `DATASETS` not exported.
- [ ] **Step 3: Check each dataset by hand.** Open the host's page for LIMUC and IBDMDB, then HyperKvasir and UC/IBD gene expression series on GEO (aim for six or more; omit any you cannot check). Record each field from that page. Candidate copies: `GorkemPolat/LIMUC` and `chehablab/LIMUC` on Hugging Face; HyperKvasir on Hugging Face and `kelkalot/the-hyper-kvasir-dataset` on Kaggle. Set `original: true` only when the host or paper names that copy as the release. Report to the owner what was omitted and why.
- [ ] **Step 4:** Implement `datasets.ts`; remove the two dataset entries from `links.ts`; make `linksFor(topicId)` return matching links plus matching datasets as `Link` objects of kind `"dataset"`; index datasets in `search.ts`; render any hit whose `href` starts with `/` as a `Link` in `SearchBox`; point the landing page list at `DATASETS`; add dataset `url`, `termsUrl` and `copyUrl` addresses to `verify-links.mjs`; add the dataset and copy rules to `CONTRIBUTING.md`. Try each load snippet once, or tell the owner which were not run.
- [ ] **Step 5:** Run `pnpm test && pnpm typecheck && pnpm verify:links`. Expected: all pass.
- [ ] **Step 6:** Commit `feat: add curated dataset list`.

### Task 2: Library page and JSON copy

**Files:**
- Create: `packages/evidence/src/papers.ts`, `apps/web/app/data/page.tsx`, `apps/web/app/data/datasets.json/route.ts`, `apps/web/components/DatasetList.tsx`, `apps/web/test/data.test.tsx`
- Modify: `packages/evidence/src/index.ts`, `packages/evidence/test/datasets.test.ts`

**Interfaces:**
- Consumes: Task 1 exports.
- Produces: `keyPapers(): { title: string; href?: string; sources: Source[] }[]`; `DatasetList({ datasets }: { datasets: Dataset[] })`; `GET /data/datasets.json` returning `{ datasets: Dataset[] }`.

- [ ] **Step 1: Write the failing tests**

```ts
it("lists every cited paper, and only papers", () => {
  const listed = keyPapers().flatMap((g) => g.sources);
  expect(listed.every((s) => s.pmid)).toBe(true);
  expect(new Set(listed.map((s) => s.id))).toEqual(new Set(SOURCES.filter((s) => s.pmid).map((s) => s.id)));
});
```
In `data.test.tsx` (render as `feedback.test.tsx` does): `DatasetList` output contains each title, `Licence`, `How to cite`, `Last checked`; a dataset with a copy shows `Get it on`, its snippet, and `Original release` or `Not named by the authors as the release`. The route's `GET()` JSON equals `{ datasets: DATASETS }`.

- [ ] **Step 2:** Run `pnpm test`. Expected: FAIL.
- [ ] **Step 3:** Implement. `keyPapers` groups by `TOPICS` order using `sourceIds`, then a final group titled `Other cited papers` for the rest. The page has three headed sections: `Datasets`, `Key papers`, `Registries and tools` (links of kind `"registry"`). Filters are two groups of toggle buttons with `aria-pressed` (type; access: All, Open, Registration, Application), with a message when nothing matches. All entries are in the server HTML. Each card has `id={dataset.id}` and scroll margin for the sticky header. Snippets sit in `<pre>` that scrolls inside the card, with a Copy button. `access: "not-stated"` shows `Not stated`. Route uses `export const dynamic = "force-static"`; page links to it.
- [ ] **Step 4:** Run `pnpm test && pnpm typecheck`. Expected: PASS.
- [ ] **Step 5:** Commit `feat: add data library page`.

### Task 3: Navigation, offline and part A check

**Files:** Modify `apps/web/components/Header.tsx`, `apps/web/app/page.tsx`, `apps/web/public/sw.js`, `README.md`; Test `apps/web/test/sw.test.ts`

- [ ] **Step 1:** Add a failing test: the service worker shell includes `/data` and `datasets.json` is not required for install.
- [ ] **Step 2:** Run `pnpm --filter @uc/web test`. Expected: FAIL.
- [ ] **Step 3:** Menu becomes `Understand, Treatments, Simulator, Data, Search`. Add `/data` to `SHELL`, bump `CACHE` to `uc-v3`. "Work with the data" links to `/data`. Update README layout text.
- [ ] **Step 4:** Run `pnpm test && pnpm typecheck && pnpm build && pnpm verify:evidence && pnpm verify:links`. Expected: all pass.
- [ ] **Step 5:** Browser check `/`, `/data`, `/search` at 320px and desktop, both themes, keyboard only: one-row nav, no sideways scroll, no new console errors, `/data#limuc` lands on the card.
- [ ] **Step 6:** Commit `feat: link data library from navigation`. Stop and offer to ship part A.

### Task 4: Live search core, trials and papers

**Files:**
- Create: `apps/web/live/core.ts`, `live/trials.ts`, `live/papers.ts`, `apps/web/test/live.test.ts`, `apps/web/test/fixtures/{trials,esearch,esummary}.json`

**Interfaces (produces):**
```ts
export interface Result { id: string; title: string; url: string; details: { label: string; value: string }[] }
export interface Batch { results: Result[]; total?: number; next?: string }
export type Fetch = typeof fetch;
export const cleanTerm: (term: string) => string;
export function getJson(url: string, signal: AbortSignal, f?: Fetch): Promise<unknown>; // rejects on !ok, non-JSON, 15 s timeout
export function latestOnly(): <T>(task: (signal: AbortSignal) => Promise<T>) => Promise<T | undefined>;
export type TrialStatus = "RECRUITING" | "NOT_YET_RECRUITING" | "COMPLETED" | "ALL";
export function searchTrials(q: { term: string; status: TrialStatus; next?: string }, signal: AbortSignal, f?: Fetch): Promise<Batch>;
export function trialsDataDate(signal: AbortSignal, f?: Fetch): Promise<string | undefined>;
export type PaperKind = "all" | "review" | "trial" | "guideline";
export function searchPapers(q: { term: string; kind: PaperKind; next?: string }, signal: AbortSignal, f?: Fetch): Promise<Batch>;
```
Exact requests:
- Trials: `https://clinicaltrials.gov/api/v2/studies` with `query.cond=ulcerative colitis`, `query.term` (omit if empty), `filter.overallStatus` (omit for ALL), `sort=LastUpdatePostDate:desc`, `pageSize=10`, `countTotal=true`, `pageToken`, `fields=NCTId,BriefTitle,OverallStatus,Phase,InterventionName,LocationCountry,LastUpdatePostDate`. Data date: `/api/v2/version` → `dataTimestamp`.
- Papers: `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi` with `db=pubmed&retmode=json&retmax=10&sort=pub_date&tool=ulcerative-colitis-web`, `retstart` from `next`, term `"colitis, ulcerative"[MeSH Terms] AND (<term>)` plus `AND review[pt]`, `AND randomized controlled trial[pt]` or `AND (guideline[pt] OR practice guideline[pt])`; omit the bracketed term if empty. Then `esummary.fcgi` for the ids; skip it when there are none.
- Detail labels. Trials: `Status`, `Phase`, `Treatments tested`, `Countries`, `Last updated`. Papers: `Journal`, `Published`, `Authors` (first three, then `and others`).

- [ ] **Step 1:** Save one real response per service as fixtures (public listing data only; trim locations to a few).
- [ ] **Step 2: Write the failing tests**

```ts
it.each([['a) OR (cancer', "a OR cancer"], ['"x"[ti]', "x ti"], ["  ", ""]])("cleans %j", (i, o) => expect(cleanTerm(i)).toBe(o));
it.each([429, 500])("rejects status %i", async (status) =>
  await expect(getJson("https://x", new AbortController().signal, async () => new Response("{}", { status }))).rejects.toThrow());
```
Also, with a fake `Fetch` recording URLs:
- non-JSON body rejects; a PubMed body with `esearchresult.ERROR` or top-level `error` rejects.
- a fetch that never settles rejects after 15 000 ms (fake timers).
- `latestOnly`: start a slow task, then a fast one; the slow one resolves `undefined` and its signal is aborted.
- trials: URL carries `query.cond`, repeated countries appear once, URL is `https://clinicaltrials.gov/study/<NCTId>`, `next` is the page token, a study with only an id and title shows `Not stated` for the other details, a study without a valid `NCT\d{8}` id is dropped.
- papers: term starts with the MeSH restriction even for `a) OR (cancer`; order follows the esearch ids; URL is `https://pubmed.ncbi.nlm.nih.gov/<pmid>/`; `next` is `"10"` when `count` exceeds 10 and absent at the end; zero ids makes one request and returns `total: 0`; missing authors show `Not stated`; tags such as `<i>` are removed from titles.

- [ ] **Step 3:** Run `pnpm --filter @uc/web test live`. Expected: FAIL.
- [ ] **Step 4:** Implement. `cleanTerm` replaces `()[]{}"\` and similar with spaces, collapses spaces and caps at 100 characters.
- [ ] **Step 5:** Run `pnpm test && pnpm typecheck`. Expected: PASS.
- [ ] **Step 6:** Commit `feat: add trial and paper search clients`.

### Task 5: Hugging Face client

**Files:** Create `apps/web/live/hub.ts`, `apps/web/test/hub.test.ts`, `test/fixtures/{hf-datasets,hf-models}.json`

**Interfaces:** Consumes `Batch`, `getJson`. Produces `HUB_PRESETS: string[]` and `searchHub(q: { term: string; next?: string }, signal: AbortSignal, f?: Fetch): Promise<Batch>`.

Requests `https://huggingface.co/api/datasets` and `/api/models` with `search=<term>&full=true&sort=downloads&direction=-1&limit=50`, no auth header. Merge, order by downloads, page by 10 with `next` as the offset; `total` is omitted. The typed term is only trimmed, then URL-encoded.

- [ ] **Step 1: Write the failing tests:** a term under two characters makes no request and returns no results; merged order is by downloads; dataset URL is `https://huggingface.co/datasets/<id>`, model URL `https://huggingface.co/<id>`; ids are unique across kinds (`dataset:<id>`, `model:<id>`); licence comes from `cardData.license` (string or array) or a `license:` tag, else `Not stated`; labels are `Type`, `Licence`, `Downloads`, `Last updated`; one request failing rejects the search.
- [ ] **Step 2:** Run `pnpm --filter @uc/web test hub`. Expected: FAIL.
- [ ] **Step 3:** Implement. Start `HUB_PRESETS` as `["LIMUC", "Kvasir", "IBDColEpi"]`; try each live and drop any returning nothing relevant.
- [ ] **Step 4:** Run the tests. Expected: PASS.
- [ ] **Step 5:** Commit `feat: add Hugging Face search client`.

### Task 6: Live search page

**Files:**
- Create: `apps/web/app/data/search/page.tsx`, `apps/web/components/LiveSearch.tsx`, `components/DataSwitch.tsx`, `apps/web/test/live-page.test.tsx`
- Modify: `apps/web/app/data/page.tsx`, `app/privacy/page.tsx`, `app/page.tsx`, `public/sw.js`, `test/sw.test.ts`

**Interfaces:** Consumes Tasks 4 and 5. `DataSwitch({ current }: { current: string })` follows `TreatmentsSwitch` (`Library`, `Live search`).

- [ ] **Step 1:** Check the current terms of ClinicalTrials.gov, NCBI and Hugging Face on their own sites. Apply required attribution or disclaimer links; if any forbids this use, stop and tell the owner.
- [ ] **Step 2: Write the failing tests:** initial markup has the three choices `Trials`, `Papers`, `Datasets and models`, a Search button, the library link and no results; the text names `US National Library of Medicine` for the default tab; the shell test includes `/data/search`.
- [ ] **Step 3:** Run `pnpm --filter @uc/web test`. Expected: FAIL.
- [ ] **Step 4:** Implement. Each tab has preset buttons (trials and papers: `vedolizumab`, `diet`, `fecal microbiota transplantation`; datasets and models: `HUB_PRESETS`) that run that search. A form submits on button or Enter; nothing is requested before that. The trial data date is fetched with the first trial search. Switching tabs or filters clears results and cancels the request. Status filter starts at `Recruiting`. "Show more" appends. Separate messages for loading, no results, did not answer (with a link to the same search on the source site) and offline (`navigator.onLine`), announced through `role="status"`. Above results, in `--signal`: `Listed by <service>. Not reviewed by us.` Trials add `Talk to your care team before contacting a study.` Datasets and models add `Results may be unrelated to ulcerative colitis. No results does not mean no data exists.` Papers link NCBI's disclaimer and copyright notice. Show before sending which organisation receives the term. Add the privacy paragraph from the spec and update its date. Link the page from "Work with the data". Add `/data/search` to the service worker shell.
- [ ] **Step 5:** Run `pnpm test && pnpm typecheck`. Expected: PASS.
- [ ] **Step 6:** Commit `feat: add live search page`.

### Task 7: Final check

- [ ] **Step 1:** Run `pnpm test && pnpm typecheck && pnpm build && pnpm verify:evidence && pnpm verify:links`. Expected: all pass.
- [ ] **Step 2:** In a browser at 320px and desktop, both themes, keyboard only: run each tab, filters, "Show more", a no-result term and an offline search. No sideways scroll or new console errors.
- [ ] **Step 3:** With the network panel open, confirm no request to our own address carries the term.
- [ ] **Step 4:** Update the README's page and stage notes, commit `docs: describe data pages`, and report results to the owner before any push.
