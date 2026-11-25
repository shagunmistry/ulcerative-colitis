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
pnpm verify:links     # checks that web sources and further reading still respond
```

## Layout

| Path | What it holds |
|---|---|
| `apps/web` | Next.js site, including the data library at `/data` |
| `packages/sim` | The disease model |
| `packages/viz3d` | Colon anatomy logic and the 3D scene |
| `packages/evidence` | Sources, topics, trial figures, datasets, further reading and search |
| `pipelines` | Scripts that check or fetch data |
| `docs` | Design notes |

Planned, not yet built: `ml/` (Python training, linked to Hugging Face and Kaggle),
a research and trials hub (stage 2) and a model lab (stage 3). See `docs/superpowers`.

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
