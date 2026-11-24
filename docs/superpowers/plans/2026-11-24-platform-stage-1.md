# Platform Stage 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship the landing page, new navigation, layered topics, further reading, search, privacy and disclaimer.

**Architecture:** All written content and search logic live in `packages/evidence` as typed data with tests. `apps/web` renders it with server components; layers are native `<details>`.

**Tech Stack:** Existing: Next.js 16, TypeScript, Tailwind 3, React Three Fiber, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-24-platform-stage-1-design.md`

## Global Constraints
- No claim without a source. No drug ranking across trials. Simulation always labelled illustrative.
- Red (`--source`) for sources and links, orange (`--signal`) for caveats. Caveats are never collapsed.
- Nav: `Understand`, `Treatments`, `Simulator`, `Search`, theme switch; visible on phones.
- Search query never appears in the page address. No new paid services.

## Review Focus
- Search with empty, punctuation-only or regex-like input (`(`, `.*`): no results, no crash.
- Search using accents or British/American spelling (`faecal`/`fecal`, `diarrhoea`/`diarrhea`): finds the topic.
- A link to `#anchor` of any topic lands on that topic below the sticky header.
- An old address with a sub-path (`/tools/symptom-tracker`) redirects, not 404.
- A source without a PubMed id renders a working link and does not break `verify:evidence`.

---

### Task 1: Sources and further reading
**Files:** Modify `packages/evidence/src/sources.ts`, `src/index.ts`, `pipelines/verify-evidence.mjs`; create `src/links.ts`, `pipelines/verify-links.mjs`; test `test/links.test.ts`.

**Produces:** `Source { id; title; journal; year; pmid?: string; url?: string }`; ids `niddk-definition`, `niddk-symptoms`, `niddk-diagnosis`, `niddk-treatment`, `nhs-uc`. `Link { id; title; publisher; url; kind: "patient"|"guideline"|"registry"|"dataset"; topics: string[]; checkedOn }`, `LINKS`, `linksFor(topicId: string): Link[]`.

- [ ] Test: `sourceUrl(getSource("nhs-uc"))` is `https://www.nhs.uk/conditions/ulcerative-colitis/`; every source has exactly one of `pmid`/`url`; every link is `https`, unique, dated; `linksFor("fmt")` includes the registry; `linksFor("nope")` is `[]`. Run, expect failure.
- [ ] Implement with the spec's starting set. `verify:evidence` fetches only PubMed ids; `verify:links` requests every link and web source, exits 1 listing failures.
- [ ] Run tests, `pnpm verify:evidence`, `pnpm verify:links`.

### Task 2: Layered topics
**Files:** Create `packages/evidence/src/topics.ts`; modify `content.ts` (add `plain` to causes and approaches); test `test/topics.test.ts`.

**Consumes:** Task 1. **Produces:** `Topic { id; group: "basics"|"cause"|"medicine"|"other"; title; badge?: string; plain; caveat; science: string[]; sourceIds: string[] }`, `TOPICS`, `topicsIn(group)`, `topicHref(topic): string` (`/understand#id`, `/treatments#id`, `/treatments/other#id`), `URGENT { emergency: string[]; urgent: string[]; sourceId: "nhs-uc" }`.

- [ ] Test: ids unique; every topic has non-empty plain, caveat, science, and known sources; groups contain basics `what-it-is, symptoms, diagnosis, treatment-goals`, every cause, medicine ids `aminosalicylate, corticosteroid, cytokine, trafficking`, every approach; plain sentences average at most 22 words per topic; `URGENT` lists non-empty. Run, expect failure.
- [ ] Write content from the NIDDK and NHS pages and existing verified claims.
- [ ] Run tests.

### Task 3: Search
**Files:** Create `packages/evidence/src/search.ts`; test `test/search.test.ts`.

**Produces:** `search(query: string, limit = 20): Hit[]`, `Hit { title; href; snippet; kind: "topic"|"link" }`.

- [ ] Test: `search("")`, `search("(")`, `search(".*")` are `[]`; `search("fecal")[0].href` is `/treatments/other#fmt`; `search("diarrhea")` includes `/understand#symptoms`; `search("αvβ6")` includes `/understand#autoantibody`; `search("infliximab")` includes `/treatments#cytokine`; title matches rank first; external hits have `https` hrefs. Run, expect failure.
- [ ] Implement: normalise (lowercase, strip accents, `ae`/`oe` and `our` spelling folds), split on non-letters/digits, every term must match as substring; score title above body.
- [ ] Run tests.

### Task 4: Redirects
**Files:** Create `apps/web/redirects.mjs`, `apps/web/test/redirects.test.ts`; modify `next.config.mjs`, `package.json` (vitest).

**Produces:** `REDIRECTS: { source; destination; permanent: true }[]`.

- [ ] Test the exact spec map, including `/tools/:path*` and `/resources/:path*` to `/` with `/resources/emergency` ordered before the wildcard; no destination is itself a source. Run, expect failure.
- [ ] Implement. Run tests.

### Task 5: Pages and navigation
**Files:** Create `components/{Topic,FurtherReading,TreatmentsSwitch,LandingPreview,SearchBox,Footer}.tsx`, `app/understand`, `app/treatments/other`, `app/simulator`, `app/simulator/model`, `app/search`, `app/privacy`, `app/disclaimer`; rewrite `app/page.tsx`, `app/treatments/page.tsx`, `components/Header.tsx`, `app/layout.tsx`; delete `app/{causes,alternatives,model}`.

**Consumes:** Tasks 1 to 4.

- [ ] `Topic`: `<article id>` with scroll margin; plain and caveat visible; `<details>` "The science", `<details>` "Sources and further reading"; external links marked `(external)`.
- [ ] `LandingPreview`: loops a fixed scenario through `ColonScene`, loaded client-only; Pause/Play button; reduced motion shows still day 150; labelled "Simulated".
- [ ] Landing, pages, footer per spec; privacy text limited to the Vercel facts: page address, referrer, filtered query parameters, approximate location, device and browser; no third-party cookies; visitors identified by a request hash, session discarded after 24 hours.
- [ ] `pnpm test && pnpm typecheck && pnpm build`.

### Task 6: Browser check and docs
**Files:** Modify `README.md`, `CONTRIBUTING.md`; browser script in the scratchpad.

- [ ] At 1440 and 390 wide, both themes: every nav item and redirect, no sideways scroll, no new console errors, anchors land below header, search finds a topic and leaves the address unchanged, preview pauses and respects reduced motion.
- [ ] Update docs; run all verifications again.

Commits and pushing wait for the owner's go-ahead, since `main` deploys the live site.
