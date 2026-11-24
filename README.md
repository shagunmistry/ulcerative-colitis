# Ulcerative Colitis

A home for understanding ulcerative colitis, for patients, hobbyists and scientists:
a 3D simulator, and sourced summaries of causes, medicines and other approaches.

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
```

## Layout

| Path | What it holds |
|---|---|
| `apps/web` | Next.js site |
| `packages/sim` | The disease model |
| `packages/viz3d` | Colon anatomy logic and the 3D scene |
| `packages/evidence` | Sources, trial figures and written claims |
| `pipelines` | Scripts that check or fetch data |
| `docs` | Design notes |

Planned, not yet built: `ml/` (Python training, linked to Hugging Face and Kaggle),
and a research and trials hub.

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
