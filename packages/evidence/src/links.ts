// The extension lets `pnpm verify:links` run this file directly with Node.
import { DATASETS } from "./datasets.ts";

export interface Link {
  id: string;
  title: string;
  publisher: string;
  url: string;
  /** "dataset" entries come from datasets.ts */
  kind: "patient" | "guideline" | "registry" | "dataset";
  /** topic ids this page helps with */
  topics: string[];
  /** date the address last responded */
  checkedOn: string;
}

const CHECKED = "2026-11-24";
const BASICS = ["what-it-is", "symptoms", "diagnosis", "treatment-goals"];
const MEDICINES = ["aminosalicylate", "corticosteroid", "cytokine", "trafficking"];

const l = (id: string, kind: Link["kind"], publisher: string, title: string, url: string, topics: string[]): Link => ({
  id,
  kind,
  publisher,
  title,
  url,
  topics,
  checkedOn: CHECKED,
});

export const LINKS: Link[] = [
  l("niddk", "patient", "NIDDK", "Ulcerative colitis", "https://www.niddk.nih.gov/health-information/digestive-diseases/ulcerative-colitis", [...BASICS, "genes", "immune"]),
  l("medlineplus", "patient", "MedlinePlus", "Ulcerative colitis", "https://medlineplus.gov/ulcerativecolitis.html", [...BASICS, "environment"]),
  l("nhs", "patient", "NHS", "Ulcerative colitis", "https://www.nhs.uk/conditions/ulcerative-colitis/", [...BASICS, ...MEDICINES, "smoking", "diet"]),
  l("cc-uk", "patient", "Crohn's & Colitis UK", "Ulcerative colitis", "https://crohnsandcolitis.org.uk/info-support/information-about-crohns-and-colitis/all-information-about-crohns-and-colitis/understanding-crohns-and-colitis/ulcerative-colitis", [...BASICS, "diet"]),
  l("nice", "guideline", "NICE", "Ulcerative colitis: management (NG130)", "https://www.nice.org.uk/guidance/ng130", [...MEDICINES, "treatment-goals"]),
  l("aga", "guideline", "American Gastroenterological Association", "Living guideline for moderate-to-severe ulcerative colitis", "https://gastro.org/clinical-guidance/living-guideline-for-moderate-to-severe-ulcerative-colitis/", MEDICINES),
  l("nccih-probiotics", "patient", "NCCIH", "Probiotics: usefulness and safety", "https://www.nccih.nih.gov/health/probiotics-usefulness-and-safety", ["probiotics"]),
  l("nccih-turmeric", "patient", "NCCIH", "Turmeric: usefulness and safety", "https://www.nccih.nih.gov/health/turmeric", ["curcumin"]),
  l("clinicaltrials", "registry", "ClinicalTrials.gov", "Registered ulcerative colitis trials", "https://clinicaltrials.gov/search?cond=Ulcerative%20Colitis", [...MEDICINES, "curcumin", "probiotics", "fmt", "diet"]),
];

const DATASET_LINKS: Link[] = DATASETS.map(({ id, title, publisher, url, topics, checkedOn }) => ({
  id,
  kind: "dataset",
  title,
  publisher,
  url,
  topics,
  checkedOn,
}));

/** Further reading for a topic: outside pages, then datasets. */
export const linksFor = (topicId: string) =>
  [...LINKS, ...DATASET_LINKS].filter((link) => link.topics.includes(topicId));
