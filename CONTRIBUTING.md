# Contributing

## Medical claims

- Every claim cites a source in `packages/evidence/src/sources.ts` (PubMed).
- Put each quoted number in the item's `figures` (or the trial's `quoted`) and run
  `pnpm verify:evidence`. It confirms the number appears in the abstract. It cannot
  confirm that the sentence around it is a fair reading, so a reviewer must.
- State limits next to findings. Do not present early or small studies as settled.
- Never compare drugs across separate trials.
- Update `LAST_CHECKED` when you re-check statements.

## The model

- Behaviour changes start with a failing test in `packages/sim/test`.
- Keep the model labelled illustrative until it is fitted and validated against data,
  with the method documented.
- Never add features that read as a diagnosis or a personal prediction.

## Licensing

By contributing you agree that your code is licensed under Apache-2.0 and your
written content under CC BY 4.0. Only submit work you have the right to share. Do not
paste abstracts or figures from papers, and never commit patient data.
