# Ulcerative Colitis

[![Code: Apache-2.0](https://img.shields.io/badge/code-Apache--2.0-blue.svg)](LICENSE)
[![Content: CC BY 4.0](https://img.shields.io/badge/content-CC%20BY%204.0-lightgrey.svg)](LICENSE-CONTENT)

A free, open, evidence-cited resource about ulcerative colitis, for people who live with
it, the people who care for them, clinicians and researchers. It explains the disease in
plain language, shows the evidence behind treatments, and keeps its sources, code and
review status in the open so that anyone can check, correct and build on them.

**Live site: <https://ulcerative-colitis.vercel.app>**

**Educational only. Not medical advice. The simulator is illustrative and unvalidated.**

<!-- TODO(owner): screenshot at docs/screenshot.png, then replace this line with ![Home page](docs/screenshot.png) -->
> Screenshot: `TODO(owner)`

## Features

- Plain-language topics, each with a caveat, the science and its sources
- Trial results for medicines, each against its own placebo
- A 3D teaching simulator with a [model card](https://ulcerative-colitis.vercel.app/simulator/model)
- A library of open datasets, and live search of trials, papers and Hugging Face
- [Clinical review status](https://ulcerative-colitis.vercel.app/reviewers) shown on every content page
- [My UC Journal](https://ulcerative-colitis.vercel.app/journal), a prototype that keeps entries on
  your device, with export, import, delete everything and your own
  [consent terms](spec/consent-terms/README.md) (v0.1 draft)
- [Data commons roadmap](https://ulcerative-colitis.vercel.app/commons),
  [get involved](https://ulcerative-colitis.vercel.app/get-involved) and a
  [changelog](https://ulcerative-colitis.vercel.app/changelog)
- Counts page views and a few actions without cookies or personal data; see the
  [privacy page](https://ulcerative-colitis.vercel.app/privacy)
- Works offline after the first visit; no accounts and no cookies

## Tech stack

TypeScript, Next.js (App Router), React, Tailwind CSS, React Three Fiber, Vitest, pnpm
workspaces with Turborepo, hosted on Vercel.

## Local setup

Needs Node 24 and pnpm 10.

```sh
pnpm install
pnpm dev              # http://localhost:3000
pnpm test
pnpm typecheck
pnpm build
pnpm verify:evidence  # checks cited titles and figures against PubMed (needs network)
npm run check:citations  # broken citation links and missing checked dates; runs on pull requests
pnpm verify:links     # checks that cited sources, further reading and dataset addresses respond (needs network)
```

`verify:links` does not check the fixed terms and privacy links written into the pages.

On Vercel, set the project's root directory to `apps/web`.

## Layout

| Path | What it holds |
|---|---|
| `apps/web` | Next.js site; live search clients are in `apps/web/live` |
| `packages/sim` | The disease model |
| `packages/viz3d` | Colon anatomy logic and the 3D scene |
| `packages/evidence` | Sources, topics, trial figures, datasets, review records, further reading and search |
| `pipelines` | Scripts that check or fetch data |
| `spec` | Open formats, starting with consent terms |
| `docs` | Design notes and the clinical review checklist |

## Data sources

We link to datasets and do not host or copy them. The details below were read on each
host's pages on 2026-11-25. **Check each dataset's own terms before you use it.** The
full records, with citations, are in
[`datasets.ts`](packages/evidence/src/datasets.ts) and at
[`/data/datasets.json`](https://ulcerative-colitis.vercel.app/data/datasets.json).

| Dataset | What it is | Licence as stated by the host |
|---|---|---|
| [LIMUC](https://zenodo.org/records/5827695) | Scored colonoscopy images | CC BY 4.0 |
| [IBDMDB](https://ibdmdb.org/results) | Inflammatory bowel disease multi-omics | Not stated; we found no terms page |
| [HyperKvasir](https://osf.io/mh9sj/) | Gut endoscopy images and videos | CC BY 4.0; the authors' code repository asks for written permission for commercial and competition use |
| GEO series [GSE109142](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE109142), [GSE73661](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE73661), [GSE92415](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE92415), [GSE206285](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE206285), [GSE75214](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE75214) | Gene expression | Not stated; NCBI places no restrictions of its own but submitters may claim rights |

### How live search handles data

Live search runs in the visitor's browser. Nothing is sent until they press Search, a
common search or Show more. The term then goes with their request, including their IP
address, to the US National Library of Medicine or to Hugging Face. Our code does not
save it or send it to our servers or analytics. Trial and paper searches are limited to
ulcerative colitis. Results are not reviewed by us.

## Roadmap

Where the project is going, a patient-governed IBD data commons, is set out at
[`/commons`](https://ulcerative-colitis.vercel.app/commons). Also planned: a model lab
(`ml/`, Python training linked to Hugging Face and Kaggle). See `docs/superpowers`.

## Settings

| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_FEEDBACK_FORM_URL` | Feedback form for people without GitHub. The link is hidden if unset. |
| `NEXT_PUBLIC_ADVISORY_FORM_URL` | Patient advisory group sign-up form. An email placeholder shows if unset. |

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md), the [code of conduct](CODE_OF_CONDUCT.md) and the
[clinical review checklist](docs/CLINICAL_REVIEW.md).

## Theme

Colours, type and the smoke layer follow shagunmistry.com. Two rules carry over:
`--source` (red) marks provenance, and `--signal` (orange) marks anything not to be
taken as fact, such as the simulation.

## License

- Code: [Apache-2.0](LICENSE)
- Written content: [CC BY 4.0](LICENSE-CONTENT)

See [NOTICE](NOTICE) for what falls under each.
