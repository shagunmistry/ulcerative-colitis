# Contributing

Corrections, sources, code and feedback are welcome. Please follow the
[code of conduct](CODE_OF_CONDUCT.md). Never post personal health details: issues and
pull requests are public.

No GitHub account? See [Get involved](https://ulcerative-colitis.vercel.app/get-involved).

## Ways to report

- [Content error](https://github.com/shagunmistry/ulcerative-colitis/issues/new?template=content-error.yml)
- [Patient feedback](https://github.com/shagunmistry/ulcerative-colitis/issues/new?template=patient-feedback.yml)
- [Feature request](https://github.com/shagunmistry/ulcerative-colitis/issues/new?template=feature-request.yml)

## Local setup

Needs Node 24 and pnpm 10.

```sh
pnpm install
pnpm dev              # http://localhost:3000
pnpm test
pnpm typecheck
pnpm build
pnpm verify:evidence  # cited titles and figures against PubMed (needs network)
pnpm verify:links     # cited sources, further reading and dataset addresses (needs network)
```

## Add or update a topic

1. Add each source to `packages/evidence/src/sources.ts` (format below).
2. Add or edit the topic in `packages/evidence/src/topics.ts`, or for causes and other
   approaches in `content.ts`. Give it a `plain` summary, a `caveat`, the `science`
   lines and `sourceIds`.
3. Run `pnpm test` and `pnpm verify:evidence`.
4. In `packages/evidence/src/pages.ts`, update the page's `checkedOn`. If the change is
   one of substance on a reviewed page, set its `review` back to `unreviewed`.

## Citation format

A PubMed paper takes an id, PMID, year, journal and exact title:

```ts
s("short-id", "PMID", YEAR, "Journal abbreviation", "Exact title of the paper"),
```

A public health web page takes an id, address, year (or `undefined` if the page shows
none), publisher and title:

```ts
web("short-id", "https://...", undefined, "Publisher", "Page title"),
```

Topics refer to sources by `short-id`. Do not cite a page you have not read.

## Content review

Clinical review is recorded per page. See [docs/CLINICAL_REVIEW.md](docs/CLINICAL_REVIEW.md).
A pull request being merged does not make a page clinically reviewed.

## Pull request checklist

- [ ] `pnpm test`, `pnpm typecheck` and `pnpm build` pass
- [ ] Every new claim has a source, and `pnpm verify:evidence` passes if sources changed
- [ ] Nothing tells a reader to start, stop or change a treatment
- [ ] No new cookies or trackers, and nothing a visitor types leaves their browser
      (live search excepted, as the privacy page describes)
- [ ] Usable by keyboard, labelled, readable in both themes
- [ ] The privacy page is updated if what is collected changed
- [ ] No patient data, personal details, abstracts or figures from papers

## Medical claims

- Every claim cites a source in `packages/evidence/src/sources.ts`: a PubMed paper, or
  a public health page for basic facts.
- Put each quoted number in the item's `figures` (or the trial's `quoted`) and run
  `pnpm verify:evidence`. It confirms the number appears in the abstract. It cannot
  confirm that the sentence around it is a fair reading, so a reviewer must.
- Glossary definitions (`glossary.ts`) need a source that defines the term. Leave a
  term out if none can be found.
- Numbers taken from web pages are not checked automatically. Check them by hand.
- Each topic (`topics.ts`, `content.ts`) needs a plain summary in short sentences, a
  caveat, the science, and sources.
- Further reading (`links.ts`) is limited to public health bodies, professional
  societies, established patient charities and registries. No sellers or drug company
  promotion. Run `pnpm verify:links` after adding one.
- State limits next to findings. Do not present early or small studies as settled.
- Never compare drugs across separate trials.
- Update `LAST_CHECKED` when you re-check statements.

## Datasets

- Datasets live in `packages/evidence/src/datasets.ts`. Add one only if it holds
  ulcerative colitis or inflammatory bowel disease data from a public repository,
  research programme or peer-reviewed release, and has a reachable terms page, given as
  `termsUrl`. The one recorded exception is IBDMDB, for which we found no terms page: it
  has no `termsUrl`, and its licence and access are shown as not stated.
- Take licence, access and size from the host's own page. If it does not state one,
  write `Not stated` (access: `not-stated`). Never infer it. Leave out any dataset
  you cannot check.
- Note in `accessNote` any conditions or conflicting terms you find.
- A copy on Hugging Face or Kaggle must hold the data, and you must check it by hand.
  Mark it `original` only when the host or the paper names that copy as the release.
  Licence and access always come from the original. If a copy is partial or converted,
  say how in its `note`.
- Set `checkedOn` to the day you read the pages, and run `pnpm verify:links`.
- Link to data; never add dataset files or abstracts to this repository.

## The model

- Behaviour changes start with a failing test in `packages/sim/test`.
- Keep the model labelled illustrative until it is fitted and validated against data,
  with the method documented.
- Never add features that read as a diagnosis or a personal prediction.

## Licensing

By contributing you agree that your code is licensed under Apache-2.0 and your
written content under CC BY 4.0. Only submit work you have the right to share. Do not
paste abstracts or figures from papers, and never commit patient data.
