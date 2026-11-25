# Data library and live search

Status: approved 2026-11-25, including option 2 for Hugging Face and Kaggle.

## Intent
Part of the platform goal: research papers, machine learning datasets and other data
sources should be available from the site, with the best user experience for patients,
doctors, researchers and hobbyists.

## Approaches
| | What a visitor gets | Trade-off |
|---|---|---|
| **A, chosen** | A curated library of datasets, papers and registries | Reliable, no database; only as complete as we keep it |
| **B, chosen** | Live search of trials and papers on the site | Current and broad; depends on outside services |
| C, backlog | Our own index in a database | Richer search; adds syncing, hosting and possible cost |

Build A first and ship it, then B.

### Hugging Face and Kaggle
| Option | What a visitor gets | Trade-off |
|---|---|---|
| 1 | Library entries link to copies, with code to load them | Reliable; we maintain the links |
| **2, chosen** | 1 plus live Hugging Face search | Finds new datasets and models; unchecked and incomplete |
| 3 | 2 plus live Kaggle search | Widest; may need a server and stored token; noisy |

## Goals
- Any visitor can reach the data from every page in one click.
- A researcher can tell, before leaving the site, what a dataset holds, whether they
  may use it and how to get it.
- A visitor can find current trials and recent papers without learning another site's
  search syntax.
- Works on a phone, by keyboard and with reduced motion.

## Non-goals
- Our own database, saved searches, accounts or alerts.
- Hosting, copying or redistributing datasets. We link to them.
- Live Kaggle search, and publishing our own datasets or models (model lab).
- Notebooks, training or leaderboards (model lab).
- AI summaries or ratings of papers and trials.
- A wider redesign of existing pages.

## Anti-goals
This has failed if a search result reads as a recommendation, a trial listing reads as
an invitation we endorse, a licence or access rule is guessed, or a search term reaches
our servers or analytics.

## Navigation
Top bar: `Understand · Treatments · Simulator · Data · Search`. It must still fit one
row at 320px wide. The landing panel "Work with the data" links to both new pages.

| Address | Page | Ships in |
|---|---|---|
| `/data` | Library | A |
| `/data/search` | Live search: trials, papers, Hugging Face | B |

A visible two-item switch (Library, Live search) joins them, like the Treatments switch.

## Part A: library
Three sections on `/data`: **Datasets**, **Key papers**, **Registries and tools**, with
filter buttons for data type (images, gene expression, microbiome, clinical, other) and
access (open, registration, application).

Each dataset shows: title, publisher, one or two sentences on what it holds, data type,
size, licence, access, how to cite, last-checked date and an external link.

- New typed list `packages/evidence/src/datasets.ts`. The two dataset entries move there
  from `links.ts`; the landing page and site search read the new list.
- Licence, access and size come from the host's own page. If the page does not state
  one, show "Not stated". Never infer it.
- Inclusion: ulcerative colitis or inflammatory bowel disease data from a public
  repository, research programme or peer-reviewed release, with a reachable terms page.
- Starting set: LIMUC (Zenodo lists CC BY 4.0) and IBDMDB, then candidates to check by
  hand: HyperKvasir, and IBD gene expression series on GEO. Aim for at least six; ship
  fewer rather than include an unchecked one.
- Key papers are the PubMed entries already in `sources.ts`, grouped by the topics that
  cite them. No abstracts are copied.
- A machine-readable copy at `/data/datasets.json` for scripts.
- A dataset may list copies on Hugging Face or Kaggle ("Get it on"), each with
  copy-and-paste code to load it. Say whether the copy is the original release or one
  the authors did not name as the release. Licence and access always come from the original. Check each by hand.
- `pnpm verify:links` covers dataset addresses, including copies.
- `CONTRIBUTING.md` gains the dataset rules, so others can add entries by pull request.
- Site search finds datasets.

## Part B: live search
The visitor types a term, picks **Trials**, **Papers** or **Datasets and models**,
and presses Search. Trial and paper queries are limited to ulcerative colitis. Buttons
offer common searches. Nothing is sent before the visitor presses one.

| | Trials | Papers |
|---|---|---|
| Service | ClinicalTrials.gov API v2 | PubMed E-utilities (search, then summaries) |
| Filters | status (starts at Recruiting) | all, reviews, randomised trials, guidelines |
| Each result | title, status, phase, treatments tested, countries, last updated, link | title, journal, date, first authors, link |
| Order | recently updated first | newest first |

Ten results at a time, with "Show more" and the total count where the service gives one.

### Datasets and models (Hugging Face)
- Hugging Face search matches names only: "ulcerative" returned nothing on 2026-11-25.
  So this tab cannot be limited to the disease by query. Preset buttons use terms
  checked to return relevant results (starting candidates: colitis, LIMUC, Kvasir; not
  "IBD", which matches unrelated names). A typed term is sent as typed.
- The tab says that results may be unrelated to ulcerative colitis, and that an empty
  result does not mean no data exists. Link to the library.
- Each result: name, dataset or model, licence tag or "Not stated", downloads, last
  updated, link. Most downloaded first. No Hugging Face token.

- The browser calls the services directly. All three allowed cross-origin requests on
  2026-11-25. This keeps searches off our servers and needs no keys. Limits fall on each
  visitor: PubMed allows three requests a second without a key; Hugging Face reported
  500 per five minutes.
- Results are labelled in `--signal` orange: listed by the outside service, not reviewed
  by us. A trial note says to talk to your care team before contacting a study.
- Show the source, and for trials the date ClinicalTrials.gov processed the data
  (`/api/v2/version`). Link NCBI's disclaimer and copyright notice.
- Identify requests to PubMed with a generic tool name and no personal email address.
- Show result text as plain text only, never as HTML.
- Loading, no results, and "the service did not answer" each have their own message,
  with a link to run the search on the source site. One service failing does not affect
  the others.
- The term is never put in our page address or saved.
- Privacy page: live search sends the term and the visitor's request, including their IP
  address, to the US National Library of Medicine (trials, papers) or to Hugging Face
  (datasets and models). The search page says which before sending. `/search` stays
  local and keeps its promise.
- Offline, say that live search needs a connection.

## Done when
- Tests, type check, build, `verify:evidence` and `verify:links` pass.
- Mapping each service's responses is tested against saved samples, including missing
  fields.
- Browser check at 320px and desktop widths, both themes, keyboard only: no sideways
  scrolling or new console errors.
- With the network panel open, a live search makes no request carrying the term to our
  own address.

## Constraints
Existing stack and theme; no new paid services; no database or server secrets.

## Builder's calls (check these)
- "Data" as a fifth top-bar item.
- Browser calls the services directly, rather than through our server.
- Filters, result fields, page size and order.
- The JSON copy of the dataset list.
- Check the current terms of all three services before shipping B.
- Hugging Face tab: preset terms, order and result fields.

## Left to the builder
Component layout, wording of messages, and preset searches.
