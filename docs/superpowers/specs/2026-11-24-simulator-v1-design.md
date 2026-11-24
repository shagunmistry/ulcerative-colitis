# Simulator v1

Written after the build: the owner asked to start building without a separate design review.

## Intent
Help patients, hobbyists and scientists understand ulcerative colitis more deeply:
causes, how medicines act, and other approaches, grounded in published evidence.

## Approaches considered
1. Small hand-built differential-equation model in TypeScript, run in the browser. Chosen:
   instant, inspectable, honest about being illustrative.
2. Adapt a published mechanistic model. Deferred: no ready-to-use open one was confirmed.
3. Fit or train on patient data. Deferred to the model lab; needs data and validation.

## Non-goals
Diagnosis, personal prediction, drug comparison.

## Decided
One monorepo; Next.js; React Three Fiber; theme of shagunmistry.com; community
contribution through GitHub, Kaggle and Hugging Face.

## Next
Research and trials hub (ClinicalTrials.gov, PubMed, Supabase), then the model lab.
