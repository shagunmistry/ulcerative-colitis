# Clinical review

This site is educational. Review does not turn it into medical advice. It tells readers
that a named clinician has checked a page, and when.

## Who can review

Clinicians who care for people with inflammatory bowel disease, such as
gastroenterologists, IBD nurse specialists, pharmacists and dietitians. State your
credentials and where they can be confirmed.

## Declare conflicts of interest first

List anything in the last three years that connects you to a treatment, test or product
the page discusses: payments, consulting, speaking fees, research funding, shares or
patents. If there is nothing, say "None declared". It is published beside your name.

## Checklist

Review one page at a time.

### Accuracy
- [ ] Each statement matches the source cited for it.
- [ ] Quoted figures carry their context: which people, which dose, what time point.
- [ ] Nothing important is missing in a way that changes the meaning.
- [ ] Guidance reflects current practice, or says plainly where it varies.

### Strength-of-evidence labels
- [ ] Each label is fair for the evidence cited.
- [ ] Early, small or animal studies are not presented as settled.
- [ ] Results from separate trials are not compared as if they were one trial.

### Urgent-care section (where the page shows it)
- [ ] The listed warning signs are correct and complete for the cited advice.
- [ ] The difference between emergency and same-day care is clear.
- [ ] It is easy to find.

### Wording that could cause harm
- [ ] Nothing tells or nudges a reader to start, stop or change a treatment.
- [ ] Nothing invites self-diagnosis or false reassurance.
- [ ] Unproven approaches are not made to sound like substitutes for treatment.
- [ ] The simulator is not presented as a prediction.
- [ ] Plain-language summaries say the same thing as the detail below them.

## Report your findings

Open a [content error issue](https://github.com/shagunmistry/ulcerative-colitis/issues/new?template=content-error.yml)
for each problem, with a source for the correction. Do not include patient details.

## Recording a completed review

A maintainer does this once the problems found are fixed and the reviewer agrees to be
named.

1. Add the reviewer to `packages/evidence/src/reviewers.ts`.
2. In `packages/evidence/src/pages.ts`, set that page's `review` to `status: "reviewed"`
   with `reviewer_id` and `reviewed_on` (YYYY-MM-DD).
3. Run `pnpm test`.

The page badge, the [review page](https://ulcerative-colitis.vercel.app/reviewers) and the
About page update from those two files. While a review is under way, use
`status: "in_review"`. If a reviewed page later changes in substance, set it back to
`unreviewed`.
