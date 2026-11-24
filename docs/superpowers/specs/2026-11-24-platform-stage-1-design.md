# Platform stage 1: the front door

Status: approved 2026-11-24.

## Intent
One easy-to-navigate home for ulcerative colitis, serving patients, hobbyists and
scientists: understanding root causes, the effects of medicines and other approaches,
all scientifically grounded. Later stages add research, trials, and community model work.

## Stages
1. **Front door** (this document): landing page, navigation, layered topic pages,
   further reading, search, privacy and disclaimer.
2. **Research and trials:** searchable data from ClinicalTrials.gov and PubMed.
3. **Model lab:** datasets, notebooks and leaderboards through Hugging Face, Kaggle and GitHub.

Stages 2 and 3 each get their own design.

## Approaches
| | Organisation | Trade-off |
|---|---|---|
| A | Topic navigation, one reading level | Simplest; too technical for some, too thin for others |
| B | Separate paths per audience | Feels tailored; content duplicates and drifts |
| **C, chosen** | Topic navigation, each topic layered | One address per topic; each level must be written well |

## Goals
- A first-time visitor can tell what the site is and where to start without scrolling far.
- Any topic is at most two clicks from the landing page.
- Each topic reads in plain language first, with detail available on request.
- Each topic links to outside sources a reader can check.
- Works on a phone, by keyboard, and with reduced motion.

## Non-goals
- Accounts, saved data, symptom or medication trackers (the old site had trackers; not in this stage).
- Trial or paper search, model training, leaderboards.
- Changes to the simulation equations.

## Anti-goals
Stage 1 has failed if a page reads as personal medical advice, ranks drugs across
separate trials, shows a claim without a source, or presents the simulation as prediction.

## Navigation and pages
Top bar: `Understand · Treatments · Simulator · Search`, plus the theme switch.
"Research" and "Lab" appear only when their stages ship. On phones the items stay
visible without a hidden menu.

| Address | Page |
|---|---|
| `/` | Landing |
| `/understand` | What ulcerative colitis is, symptoms, diagnosis, causes |
| `/treatments` | Medicines and their trial results |
| `/treatments/other` | Supplements, microbes and diet |
| `/simulator` | The current simulator |
| `/simulator/model` | How the model works |
| `/search` | Search results |
| `/privacy`, `/disclaimer` | Linked from the footer |

Treatments has a visible two-item switch between Medicines and Other approaches.

Permanent redirects: `/causes` to `/understand`; `/alternatives` to
`/treatments/other`; `/model` to `/simulator/model`; old `/learn`, `/learn/about-uc`
and `/learn/living-with-uc` to `/understand`; `/learn/treatments` to `/treatments`;
`/terms` to `/disclaimer`; `/resources/emergency` to `/disclaimer`; other
`/resources/*` and `/tools/*` to `/`.

## Landing page
```
Understand ulcerative colitis
one-sentence description            [ Try the simulator ]
[ live 3D colon playing a flare and healing; labelled "Simulated" ]

Newly diagnosed          Compare the evidence        Work with the data
What it is and causes    Medicines, other options    Model, source code, datasets

How we handle evidence: sources, last-checked date, not yet clinician reviewed
```
The preview loads after the text, has a pause button, and shows a still frame under
reduced motion. "Work with the data" links to the model page, the GitHub repository
and the dataset links, since the lab does not exist yet.

## Layered topics
Each topic (a cause, a drug family, another approach, the basics) has:
1. **Plain summary**, always visible, including its main caveat. Short sentences;
   define any medical term on first use.
2. **The science**, collapsed: mechanisms, numbers, study sizes.
3. **Sources and further reading**, collapsed: cited papers, then outside links.

Use native `<details>` elements, so the text is in the page for search engines and
works without scripts. Each topic has its own anchor, and opening a link to it
scrolls there. Safety caveats are never collapsed. Trial bars stay visible on
Medicines with the do-not-compare warning above them.

## New content
- Basics: what it is, common symptoms, how it is diagnosed, when to seek urgent care.
- Plain-language and science layers for existing topics.
- Same rules as today (`CONTRIBUTING.md`): cite sources; quoted numbers go in
  `figures` and pass `pnpm verify:evidence`. Basics may cite NIDDK or NHS pages as
  well as papers, which means `Source` must support non-PubMed entries; the verifier
  checks those for a working address only, so their numbers need a manual check.

## Further reading
A typed list in `packages/evidence`: title, publisher, address, topics, kind
(patient information, guideline, trial registry, dataset), last-checked date.
`pnpm verify:links` reports addresses that fail. External links are visibly marked
as leaving the site. Inclusion rule: public health bodies, professional societies,
established patient charities, registries and dataset hosts. No sellers or drug
company promotion.

Starting set, all responding on 2026-11-24:
- NIDDK: https://www.niddk.nih.gov/health-information/digestive-diseases/ulcerative-colitis
- MedlinePlus: https://medlineplus.gov/ulcerativecolitis.html
- NHS: https://www.nhs.uk/conditions/ulcerative-colitis/
- Crohn's & Colitis UK: https://crohnsandcolitis.org.uk/info-support/information-about-crohns-and-colitis/all-information-about-crohns-and-colitis/understanding-crohns-and-colitis/ulcerative-colitis
- NICE NG130: https://www.nice.org.uk/guidance/ng130
- AGA living guideline: https://gastro.org/clinical-guidance/living-guideline-for-moderate-to-severe-ulcerative-colitis/
- NCCIH probiotics: https://www.nccih.nih.gov/health/probiotics-usefulness-and-safety
- NCCIH turmeric: https://www.nccih.nih.gov/health/turmeric
- ClinicalTrials.gov: https://clinicaltrials.gov/search?cond=Ulcerative%20Colitis
- LIMUC dataset: https://zenodo.org/records/5827695
- IBDMDB: https://www.ibdmdb.org/results

The Crohn's & Colitis Foundation page refused the automated check (403); add it only
after opening it by hand.

## Search
Runs in the browser over an index built from topic titles, summaries and further
reading. No outside service. The query is never put in the page address, so analytics
cannot record it.

## Privacy and disclaimer
Privacy states that there are no accounts or health data collection, and describes
Vercel Web Analytics only as far as Vercel's own documentation supports
(https://vercel.com/docs/analytics/privacy-policy). Contact is through GitHub issues,
with a warning not to post personal health details. The disclaimer says the site is
educational and unreviewed, the simulator is illustrative, and when to seek urgent care.

## Done when
- Tests, type check, build, `verify:evidence` and `verify:links` pass.
- Browser check at phone and desktop widths, both themes: no sideways scrolling, no
  new console errors, every navigation item and redirect works.
- Each topic shows its three layers and at least one source.

## Constraints
Existing stack and monorepo; theme of shagunmistry.com, including red for sources and
orange for caveats; no new paid services.

## Builder's calls (check these)
Search in stage 1 and its in-browser method; merging other approaches under
Treatments; redirect targets; GitHub issues as contact; wording and layout details.
