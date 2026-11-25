# Contributing

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
  research programme or peer-reviewed release, and has a reachable terms page.
- Take licence, access and size from the host's own page. If it does not state one,
  write `Not stated` (access: `not-stated`). Never infer it. Leave out any dataset
  you cannot check.
- Note in `accessNote` any conditions or conflicting terms you find.
- A copy on Hugging Face or Kaggle must hold the data, and you must check it by hand.
  Mark it `original` only when the host or the paper names that copy as the release.
  Licence and access always come from the original.
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
