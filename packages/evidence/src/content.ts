/** The date a person or tool last compared these statements with their sources. */
export const LAST_CHECKED = "2026-11-24";

/** A figure that must appear in the cited abstract. `pnpm verify:evidence` checks it. */
export interface Figure {
  sourceId: string;
  text: string;
}

export interface Cause {
  id: string;
  title: string;
  /** how much weight the evidence carries */
  strength: "Well supported" | "Association" | "Early evidence";
  /** everyday language, shown first */
  plain: string;
  summary: string;
  caveat: string;
  sourceIds: string[];
  figures: Figure[];
}

export const CAUSES: Cause[] = [
  {
    id: "genes",
    title: "Inherited risk",
    strength: "Well supported",
    plain:
      "Your genes can raise your chance of getting ulcerative colitis. Many gene differences each add a little risk. They do not decide on their own who gets it.",
    summary:
      "Large genetic studies have found many regions of the genome linked to inflammatory bowel disease, many of them shared across populations. Several involve immune regulation.",
    caveat: "Genes shift the odds. Most people who carry risk variants never develop the disease.",
    sourceIds: ["genetics-liu-2015", "primer-2020"],
    figures: [],
  },
  {
    id: "mucus",
    title: "A weakened mucus barrier",
    strength: "Well supported",
    plain:
      "A slimy layer protects the lining of the bowel from germs. In ulcerative colitis this layer is weaker. Germs can then get closer to the lining.",
    summary:
      "A layer of mucus normally keeps gut bacteria away from the lining. In active disease its core structural parts, including the mucin MUC2, are reduced, even in segments that are not inflamed. In one study the inner layer was abnormally penetrable in 30% of patients tested.",
    caveat: "The study suggests the mucus defect contributes to disease; it does not show that it starts it.",
    sourceIds: ["mucus-2019"],
    figures: [{ sourceId: "mucus-2019", text: "30%" }],
  },
  {
    id: "butyrate",
    title: "Fewer butyrate-making bacteria",
    strength: "Association",
    plain:
      "Some gut bacteria make a fuel called butyrate. People with ulcerative colitis tend to have fewer of these bacteria.",
    summary:
      "Colon cells burn butyrate, a fatty acid made by gut bacteria, as a main fuel. People with ulcerative colitis have fewer of two butyrate-producing species, Roseburia hominis and Faecalibacterium prausnitzii.",
    caveat: "Inflammation itself changes which bacteria thrive, so cause and effect are hard to separate.",
    sourceIds: ["butyrate-bacteria-2014"],
    figures: [],
  },
  {
    id: "energy",
    title: "Cells that struggle to use their fuel",
    strength: "Early evidence",
    plain:
      "One small, old study suggested that cells lining the bowel struggle to use their fuel. This idea has not been settled.",
    summary:
      "A 1980 laboratory study found that colon cells from people with ulcerative colitis oxidised less butyrate, even when the disease was quiet, and proposed an energy shortage in the lining.",
    caveat: "Very small study: ten patients and seven controls. It is a hypothesis.",
    sourceIds: ["butyrate-energy-1980"],
    figures: [],
  },
  {
    id: "autoantibody",
    title: "Antibodies against the lining",
    strength: "Association",
    plain:
      "Antibodies are proteins the immune system makes to target things. Many people with ulcerative colitis make antibodies against their own bowel lining.",
    summary:
      "Antibodies against integrin αvβ6, a protein on colon lining cells, were found in 92.0% of patients with ulcerative colitis and 5.2% of controls. In stored military blood samples they appeared in some people up to 10 years before diagnosis.",
    caveat: "Whether these antibodies cause damage in people, or mark it, is still being worked out.",
    sourceIds: ["avb6-2021", "avb6-predates-2023"],
    figures: [
      { sourceId: "avb6-2021", text: "92.0%" },
      { sourceId: "avb6-2021", text: "5.2%" },
      { sourceId: "avb6-predates-2023", text: "10 years" },
    ],
  },
  {
    id: "immune",
    title: "Immune signals that sustain themselves",
    strength: "Well supported",
    plain:
      "Immune cells send each other chemical messages. In ulcerative colitis these messages keep inflammation going. Several medicines work by blocking them.",
    summary:
      "Once started, inflammation is kept going by chemical messages between immune cells, including TNF and interleukin-23. Drugs that block these signals beat placebo in large trials.",
    caveat: "Many people do not respond to any single drug, so no one signal explains everyone's disease.",
    sourceIds: ["il23-2019", "act-infliximab", "lucent-mirikizumab"],
    figures: [],
  },
  {
    id: "smoking",
    title: "The smoking paradox",
    strength: "Association",
    plain:
      "Smokers get ulcerative colitis less often, but people who quit get it more often. Smoking is still very harmful. Do not smoke to treat this disease.",
    summary:
      "Current smokers are less likely to develop ulcerative colitis (odds ratio 0.58), while former smokers are more likely to (odds ratio 1.79).",
    caveat: "This is not a reason to smoke. Smoking causes cancer, heart and lung disease, and worsens Crohn's disease risk.",
    sourceIds: ["smoking-2006"],
    figures: [
      { sourceId: "smoking-2006", text: "0.58" },
      { sourceId: "smoking-2006", text: "1.79" },
    ],
  },
  {
    id: "environment",
    title: "Antibiotics, drinks and diet",
    strength: "Association",
    plain:
      "Antibiotics and some foods and drinks have been linked to bowel disease. A link does not prove that one causes the other.",
    summary:
      "A review of meta-analyses linked antibiotic exposure to higher risk of inflammatory bowel disease, soft drinks to higher risk of ulcerative colitis, and tea to lower risk. For ultra-processed food, a 2024 analysis found a link with Crohn's disease but no statistically clear one with ulcerative colitis.",
    caveat: "These are observational links. They cannot show that changing one of them would prevent or treat disease.",
    sourceIds: ["environment-2019", "upf-2024"],
    figures: [{ sourceId: "upf-2024", text: "1.11" }],
  },
];

export interface Trial {
  drug: string;
  trial: string;
  target: string;
  measure: "Clinical remission" | "Clinical response";
  week: number;
  drugPercent: number;
  placeboPercent: number;
  /** exact strings expected in the abstract, drug arm then placebo arm */
  quoted: [string, string];
  investigational?: boolean;
  sourceId: string;
}

const t = (
  drug: string,
  trial: string,
  target: string,
  measure: Trial["measure"],
  week: number,
  quoted: [string, string],
  sourceId: string,
  investigational = false,
): Trial => ({
  drug,
  trial,
  target,
  measure,
  week,
  quoted,
  drugPercent: parseFloat(quoted[0]),
  placeboPercent: parseFloat(quoted[1]),
  sourceId,
  investigational,
});

/** The first (induction) phase of each trial. One dose per drug. */
export const TRIALS: Trial[] = [
  t("Infliximab", "ACT 1", "TNF", "Clinical response", 8, ["69 percent", "37 percent"], "act-infliximab"),
  t("Adalimumab", "ULTRA 2", "TNF", "Clinical remission", 8, ["16.5%", "9.3%"], "ultra2-adalimumab"),
  t("Golimumab", "PURSUIT-SC", "TNF", "Clinical response", 6, ["51.0%", "30.3%"], "pursuit-golimumab"),
  t("Vedolizumab", "GEMINI 1", "Gut-homing integrin α4β7", "Clinical response", 6, ["47.1%", "25.5%"], "gemini-vedolizumab"),
  t("Ustekinumab", "UNIFI", "IL-12 and IL-23", "Clinical remission", 8, ["15.5%", "5.3%"], "unifi-ustekinumab"),
  t("Mirikizumab", "LUCENT-1", "IL-23", "Clinical remission", 12, ["24.2%", "13.3%"], "lucent-mirikizumab"),
  t("Risankizumab", "INSPIRE", "IL-23", "Clinical remission", 12, ["20.3%", "6.2%"], "inspire-risankizumab"),
  t("Guselkumab", "QUASAR", "IL-23", "Clinical remission", 12, ["23%", "8%"], "quasar-guselkumab"),
  t("Tofacitinib", "OCTAVE Induction 1", "JAK", "Clinical remission", 8, ["18.5%", "8.2%"], "octave-tofacitinib"),
  t("Upadacitinib", "U-ACHIEVE", "JAK1", "Clinical remission", 8, ["26%", "5%"], "uachieve-upadacitinib"),
  t("Ozanimod", "True North", "S1P receptor", "Clinical remission", 10, ["18.4%", "6.0%"], "truenorth-ozanimod"),
  t("Etrasimod", "ELEVATE UC 52", "S1P receptor", "Clinical remission", 12, ["27%", "7%"], "elevate-etrasimod"),
  t("Tulisokibart", "ARTEMIS-UC (phase 2)", "TL1A", "Clinical remission", 12, ["26%", "1%"], "artemis-tulisokibart", true),
];

export interface Complementary {
  id: string;
  title: string;
  verdict: "Not recommended outside trials" | "Uncertain" | "Early positive signals";
  plain: string;
  summary: string;
  caveat: string;
  sourceIds: string[];
  figures: Figure[];
}

export const COMPLEMENTARY: Complementary[] = [
  {
    id: "curcumin",
    title: "Curcumin (from turmeric)",
    verdict: "Early positive signals",
    plain:
      "Curcumin comes from the spice turmeric. Two small studies found it helped when added to normal medicine.",
    summary:
      "Added to standard medicine, curcumin did better than placebo in two small trials. Relapse over six months was 4.65% against 20.51% in one; in another, 53.8% reached remission at four weeks against none on placebo.",
    caveat: "89 and 50 patients. Both added curcumin to prescribed medicine; neither tested it as a replacement.",
    sourceIds: ["curcumin-maintenance-2006", "curcumin-induction-2015"],
    figures: [
      { sourceId: "curcumin-maintenance-2006", text: "4.65%" },
      { sourceId: "curcumin-maintenance-2006", text: "20.51%" },
      { sourceId: "curcumin-induction-2015", text: "53.8%" },
    ],
  },
  {
    id: "probiotics",
    title: "Probiotics",
    verdict: "Uncertain",
    plain:
      "Probiotics are live microbes taken as supplements. They might help some people, but the evidence is weak.",
    summary:
      "A Cochrane review found probiotics may help induce remission compared with placebo (low-certainty evidence). Whether they help keep remission is unclear. One trial found the strain E. coli Nissle 1917 similar to mesalazine for preventing relapse.",
    caveat: "Strains differ, so a result for one product says little about another.",
    sourceIds: ["cochrane-probiotics-induction", "cochrane-probiotics-maintenance", "nissle-2004"],
    figures: [{ sourceId: "cochrane-probiotics-induction", text: "1.73" }],
  },
  {
    id: "fmt",
    title: "Faecal microbiota transplant",
    verdict: "Not recommended outside trials",
    plain:
      "This treatment moves stool from a healthy donor into the bowel. It aims to change the gut microbes. Experts advise using it only in research studies.",
    summary:
      "In one intensive-dosing trial, 27% of patients reached the goal at eight weeks against 8% on placebo. The American Gastroenterological Association still suggests against it for inflammatory bowel disease except in clinical trials.",
    caveat: "The trial was run in hospitals. Its result says nothing about do-it-yourself transplants.",
    sourceIds: ["fmt-paramsothy", "aga-fmt-2024"],
    figures: [
      { sourceId: "fmt-paramsothy", text: "27%" },
      { sourceId: "fmt-paramsothy", text: "8%" },
      { sourceId: "aga-fmt-2024", text: "except in the context of clinical trials" },
    ],
  },
  {
    id: "diet",
    title: "Anti-inflammatory diets",
    verdict: "Uncertain",
    plain:
      "Researchers have tested diets meant to calm inflammation. Results are mixed. Ask your care team before cutting out foods.",
    summary:
      "A meta-analysis of six randomised trials (359 patients) found better clinical response in active disease and lower faecal calprotectin, a marker of gut inflammation, but no significant effect on remission or relapse rates.",
    caveat: "Few, small and varied trials. The authors note that no consistent dietary guidance exists for the disease.",
    sourceIds: ["diet-meta-2026"],
    figures: [{ sourceId: "diet-meta-2026", text: "359" }],
  },
];

/** Quoted in the 5-ASA topic. */
export const MEDICINE_FIGURES: Figure[] = [
  { sourceId: "cochrane-5asa-induction", text: "Seventy-one per cent" },
  { sourceId: "cochrane-5asa-induction", text: "83%" },
  { sourceId: "cochrane-5asa-maintenance", text: "37%" },
  { sourceId: "cochrane-5asa-maintenance", text: "55%" },
];
