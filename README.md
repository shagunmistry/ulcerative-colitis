# Ulcerative Colitis

A home for understanding ulcerative colitis, for patients, hobbyists and scientists:
plain-language topics with the science and sources behind them, further reading, a data
library, search, and a 3D simulator.

**Educational only. Not medical advice. The simulator is illustrative and unvalidated.**

## Run it

Needs Node 24 and pnpm 10.

```sh
pnpm install
pnpm dev              # http://localhost:3000
pnpm test
pnpm typecheck
pnpm build
pnpm verify:evidence  # checks cited titles and figures against PubMed (needs network)
pnpm verify:links     # checks that cited sources, further reading and dataset addresses respond (needs network)
```

`verify:links` does not check the fixed terms and privacy links written into the pages.

## Data pages

| Address | What it does |
|---|---|
| `/data` | Library of checked datasets, with licence, access, citation and copies elsewhere; key papers; registries |
| `/data/datasets.json` | The same dataset list, for scripts |
| `/data/search` | Live search of ClinicalTrials.gov (trials), PubMed (papers) and Hugging Face (datasets and models) |

How data is handled:

- We link to datasets and do not host or copy them. A detail the host does not give is
  shown as `Not stated`. See [CONTRIBUTING](CONTRIBUTING.md#datasets) to add one.
- Live search runs in the visitor's browser. Nothing is sent until they press Search,
  a common search or Show more. The term then goes with their request, including their
  IP address, to the US National Library of Medicine or to Hugging Face. Our code does
  not save it or send it to our servers or analytics. No API keys are needed.
- Trial and paper searches are limited to ulcerative colitis. Hugging Face matches
  names only, so its results cannot be. Results are not reviewed by us.
- Live search needs a connection; the pages themselves also work offline once saved.

## Layout

| Path | What it holds |
|---|---|
| `apps/web` | Next.js site; live search clients are in `apps/web/live` |
| `packages/sim` | The disease model |
| `packages/viz3d` | Colon anatomy logic and the 3D scene |
| `packages/evidence` | Sources, topics, trial figures, datasets, further reading and search |
| `pipelines` | Scripts that check or fetch data |
| `docs` | Design notes |

The data library and live search make up stage 2, research and trials. Planned, not
yet built: a model lab (stage 3), including `ml/` (Python training, linked to Hugging
Face and Kaggle). See `docs/superpowers`.

## Deploying

On Vercel, set the project's root directory to `apps/web`.

## Theme

Colours, type and the smoke layer follow shagunmistry.com. Two rules carry over:
`--source` (red) marks provenance, and `--signal` (orange) marks anything not to be
taken as fact, such as the simulation.

## License

- Code: [Apache-2.0](LICENSE)
- Written content: [CC BY 4.0](LICENSE-CONTENT)

See [NOTICE](NOTICE) for what falls under each.
