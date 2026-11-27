export interface Source {
  id: string;
  /** PubMed id, for papers */
  pmid?: string;
  /** address, for web pages */
  url?: string;
  title: string;
  journal: string;
  /** absent when a page shows no date */
  year?: number;
}

const s = (id: string, pmid: string, year: number, journal: string, title: string): Source => ({
  id,
  pmid,
  year,
  journal,
  title,
});

const web = (id: string, url: string, year: number | undefined, journal: string, title: string): Source => ({
  id,
  url,
  year,
  journal,
  title,
});

const NIDDK = "https://www.niddk.nih.gov/health-information/digestive-diseases/ulcerative-colitis";
const NIDDK_NAME = "National Institute of Diabetes and Digestive and Kidney Diseases";
const NIDDK_TESTS = "https://www.niddk.nih.gov/health-information/diagnostic-tests";
const MEDLINEPLUS = "https://medlineplus.gov";
const NLM = "MedlinePlus, National Library of Medicine";

export const SOURCES: Source[] = [
  // Public health pages
  web("niddk-definition", `${NIDDK}/definition-facts`, 2020, NIDDK_NAME, "Definition & Facts of Ulcerative Colitis"),
  web("niddk-symptoms", `${NIDDK}/symptoms-causes`, 2020, NIDDK_NAME, "Symptoms & Causes of Ulcerative Colitis"),
  web("niddk-diagnosis", `${NIDDK}/diagnosis`, 2020, NIDDK_NAME, "Diagnosis of Ulcerative Colitis"),
  web("niddk-treatment", `${NIDDK}/treatment`, 2020, NIDDK_NAME, "Treatment for Ulcerative Colitis"),
  // Definitions used in the glossary
  web("niddk-colonoscopy", `${NIDDK_TESTS}/colonoscopy`, 2023, NIDDK_NAME, "Colonoscopy"),
  web("niddk-sigmoidoscopy", `${NIDDK_TESTS}/flexible-sigmoidoscopy`, 2024, NIDDK_NAME, "Flexible Sigmoidoscopy"),
  web("mp-biopsy", `${MEDLINEPLUS}/biopsy.html`, 2025, NLM, "Biopsy"),
  web("mp-endoscopy", `${MEDLINEPLUS}/endoscopy.html`, 2024, NLM, "Endoscopy"),
  web("mp-immune", `${MEDLINEPLUS}/immunesystemanddisorders.html`, 2023, NLM, "Immune System and Disorders"),
  web("mp-immune-response", `${MEDLINEPLUS}/ency/article/000821.htm`, 2026, NLM, "Immune response"),
  web("mp-mesalamine", `${MEDLINEPLUS}/druginfo/meds/a688021.html`, 2024, NLM, "Mesalamine"),
  web("mp-jak3", `${MEDLINEPLUS}/genetics/gene/jak3/`, 2017, NLM, "JAK3 gene"),
  web("mesh-integrins", "https://www.ncbi.nlm.nih.gov/mesh/?term=integrins", undefined, "Medical Subject Headings, National Library of Medicine", "Integrins"),
  web("nccih-placebo", "https://www.nccih.nih.gov/health/placebo-effect", 2020, "National Center for Complementary and Integrative Health", "Placebo Effect"),
  web("nhs-uc", "https://www.nhs.uk/conditions/ulcerative-colitis/", 2026, "NHS", "Ulcerative colitis"),

  // Guidelines and overviews
  s("primer-2020", "32913180", 2020, "Nature Reviews Disease Primers", "Ulcerative colitis"),
  s("acg-2025", "40701556", 2025, "American Journal of Gastroenterology", "ACG Clinical Guideline Update: Ulcerative Colitis in Adults"),
  s("aga-2024", "39572132", 2024, "Gastroenterology", "AGA Living Clinical Practice Guideline on Pharmacological Management of Moderate-to-Severe Ulcerative Colitis"),
  s("aga-fmt-2024", "38395525", 2024, "Gastroenterology", "AGA Clinical Practice Guideline on Fecal Microbiota-Based Therapies for Select Gastrointestinal Diseases"),

  // Causes
  s("genetics-liu-2015", "26192919", 2015, "Nature Genetics", "Association analyses identify 38 susceptibility loci for inflammatory bowel disease and highlight shared genetic risk across populations"),
  s("mucus-2019", "30914450", 2019, "Gut", "Structural weakening of the colonic mucus barrier is an early event in ulcerative colitis pathogenesis"),
  s("butyrate-bacteria-2014", "24021287", 2014, "Gut", "A decrease of the butyrate-producing species Roseburia hominis and Faecalibacterium prausnitzii defines dysbiosis in patients with ulcerative colitis"),
  s("butyrate-energy-1980", "6106826", 1980, "The Lancet", "The colonic epithelium in ulcerative colitis: an energy-deficiency disease?"),
  s("avb6-2021", "33582126", 2021, "Gastroenterology", "Identification of an Anti-Integrin αvβ6 Autoantibody in Patients With Ulcerative Colitis"),
  s("avb6-predates-2023", "36634824", 2023, "Gastroenterology", "Anti-Integrin αvβ6 Autoantibodies Are a Novel Biomarker That Antedate Ulcerative Colitis"),
  s("il23-2019", "30563755", 2019, "Cytokine & Growth Factor Reviews", "IL-23 in inflammatory bowel diseases and colon cancer"),
  s("smoking-2006", "17120402", 2006, "Mayo Clinic Proceedings", "Smoking and inflammatory bowel disease: a meta-analysis"),
  s("environment-2019", "31014995", 2019, "Gastroenterology", "Environmental Risk Factors for Inflammatory Bowel Diseases: An Umbrella Review of Meta-analyses"),
  s("upf-2024", "37632227", 2024, "Nutrition Reviews", "The association of ultra-processed food consumption with adult inflammatory bowel disease risk: a systematic review and dose-response meta-analysis"),

  // Pivotal trials
  s("act-infliximab", "16339095", 2005, "New England Journal of Medicine", "Infliximab for induction and maintenance therapy for ulcerative colitis"),
  s("ultra2-adalimumab", "22062358", 2012, "Gastroenterology", "Adalimumab induces and maintains clinical remission in patients with moderate-to-severe ulcerative colitis"),
  s("pursuit-golimumab", "23735746", 2014, "Gastroenterology", "Subcutaneous golimumab induces clinical response and remission in patients with moderate-to-severe ulcerative colitis"),
  s("gemini-vedolizumab", "23964932", 2013, "New England Journal of Medicine", "Vedolizumab as induction and maintenance therapy for ulcerative colitis"),
  s("unifi-ustekinumab", "31553833", 2019, "New England Journal of Medicine", "Ustekinumab as Induction and Maintenance Therapy for Ulcerative Colitis"),
  s("lucent-mirikizumab", "37379135", 2023, "New England Journal of Medicine", "Mirikizumab as Induction and Maintenance Therapy for Ulcerative Colitis"),
  s("inspire-risankizumab", "39037800", 2024, "JAMA", "Risankizumab for Ulcerative Colitis: Two Randomized Clinical Trials"),
  s("quasar-guselkumab", "39706209", 2025, "The Lancet", "Guselkumab in patients with moderately to severely active ulcerative colitis (QUASAR)"),
  s("octave-tofacitinib", "28467869", 2017, "New England Journal of Medicine", "Tofacitinib as Induction and Maintenance Therapy for Ulcerative Colitis"),
  s("uachieve-upadacitinib", "35644166", 2022, "The Lancet", "Upadacitinib as induction and maintenance therapy for moderately to severely active ulcerative colitis"),
  s("truenorth-ozanimod", "34587385", 2021, "New England Journal of Medicine", "Ozanimod as Induction and Maintenance Therapy for Ulcerative Colitis"),
  s("elevate-etrasimod", "36871574", 2023, "The Lancet", "Etrasimod as induction and maintenance therapy for ulcerative colitis (ELEVATE)"),
  s("artemis-tulisokibart", "39321363", 2024, "New England Journal of Medicine", "Phase 2 Trial of Anti-TL1A Monoclonal Antibody Tulisokibart for Ulcerative Colitis"),

  // 5-ASA and complementary approaches
  s("cochrane-5asa-induction", "32786164", 2020, "Cochrane Database of Systematic Reviews", "Oral 5-aminosalicylic acid for induction of remission in ulcerative colitis"),
  s("cochrane-5asa-maintenance", "32856298", 2020, "Cochrane Database of Systematic Reviews", "Oral 5-aminosalicylic acid for maintenance of remission in ulcerative colitis"),
  s("curcumin-maintenance-2006", "17101300", 2006, "Clinical Gastroenterology and Hepatology", "Curcumin maintenance therapy for ulcerative colitis: randomized, multicenter, double-blind, placebo-controlled trial"),
  s("curcumin-induction-2015", "25724700", 2015, "Clinical Gastroenterology and Hepatology", "Curcumin in Combination With Mesalamine Induces Remission in Patients With Mild-to-Moderate Ulcerative Colitis"),
  s("cochrane-probiotics-induction", "32128795", 2020, "Cochrane Database of Systematic Reviews", "Probiotics for induction of remission in ulcerative colitis"),
  s("cochrane-probiotics-maintenance", "32128794", 2020, "Cochrane Database of Systematic Reviews", "Probiotics for maintenance of remission in ulcerative colitis"),
  s("montreal-classification", "16698746", 2006, "Gut", "The Montreal classification of inflammatory bowel disease: controversies, consensus, and implications"),
  s("nissle-2004", "15479682", 2004, "Gut", "Maintaining remission of ulcerative colitis with the probiotic Escherichia coli Nissle 1917 is as effective as with standard mesalazine"),
  s("fmt-paramsothy", "28214091", 2017, "The Lancet", "Multidonor intensive faecal microbiota transplantation for active ulcerative colitis"),
  s("diet-meta-2026", "40797000", 2026, "Digestive Diseases and Sciences", "Efficacy of Whole-Food Based Anti-inflammatory Dietary Interventions in the Management of Ulcerative Colitis"),
];

export function getSource(id: string): Source {
  const found = SOURCES.find((x) => x.id === id);
  if (!found) throw new Error(`Unknown source: ${id}`);
  return found;
}

export const sourceUrl = (source: Source) => source.url ?? `https://pubmed.ncbi.nlm.nih.gov/${source.pmid}/`;
