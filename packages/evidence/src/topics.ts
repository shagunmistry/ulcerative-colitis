import { CAUSES, COMPLEMENTARY } from "./content";

export interface Topic {
  id: string;
  group: "basics" | "cause" | "medicine" | "other";
  title: string;
  /** how firm the evidence is, or a verdict */
  badge?: string;
  /** everyday language, always visible */
  plain: string;
  /** always visible */
  caveat: string;
  /** detail, collapsed by default */
  science: string[];
  sourceIds: string[];
}

/** When to get help, as listed by the NHS. */
export const URGENT = {
  emergency: [
    "severe tummy pain",
    "bleeding from your bottom that does not stop",
    "a lot of blood, or large clots, when you poo",
    "vomiting blood or poo, or vomit that looks like coffee grounds or soil",
  ],
  urgent: [
    "very bad or bloody diarrhoea",
    "a high temperature, or feeling hot, cold or shivery",
    "a fast heartbeat",
    "being unable to poo or pass wind",
    "symptoms that worry you",
  ],
  sourceId: "nhs-uc",
};

const BASICS: Topic[] = [
  {
    id: "what-it-is",
    group: "basics",
    title: "What it is",
    plain:
      "Ulcerative colitis is a long-term disease of the large bowel. The immune system causes swelling and sores on the inner lining. It often comes and goes.",
    caveat: "It differs between people. Your own care team knows what applies to you.",
    science: [
      "It is one of the inflammatory bowel diseases, alongside Crohn's disease and microscopic colitis.",
      "Inflammation affects the inner lining of the large intestine. How much of the bowel is involved shapes which treatments are suggested.",
      "It is most likely to appear between the ages of 15 and 30, though it can start at any age.",
      "Times with symptoms are called flares. Times without are called remission, which can last weeks or years.",
    ],
    sourceIds: ["niddk-definition", "niddk-symptoms", "nhs-uc"],
  },
  {
    id: "symptoms",
    group: "basics",
    title: "Symptoms",
    plain:
      "Common signs are diarrhoea, blood in the poo, tummy cramps and a sudden need to go. Some people feel very tired. Symptoms range from mild to severe.",
    caveat: "These symptoms have other causes too. See a doctor rather than diagnosing yourself.",
    science: [
      "Other bowel symptoms include passing mucus or pus, and feeling you need to go when the bowel may be empty (tenesmus).",
      "Severe or widespread disease more often brings fatigue, fever, nausea and weight loss.",
      "It can also affect joints, skin, eyes, the liver and bile ducts, and raise the risk of blood clots.",
      "Possible complications include anaemia, weaker bones and a higher risk of bowel cancer, which is why screening colonoscopies are offered.",
      "Anti-inflammatory painkillers such as ibuprofen can make symptoms worse. Ask a doctor before taking them.",
    ],
    sourceIds: ["niddk-symptoms", "niddk-definition", "niddk-treatment", "nhs-uc"],
  },
  {
    id: "diagnosis",
    group: "basics",
    title: "How it is diagnosed",
    plain:
      "A doctor asks about your health and does tests. A camera test looks inside the bowel and takes tiny tissue samples. This confirms what is going on.",
    caveat: "No result on this website can tell you whether you have it.",
    science: [
      "Blood tests look for anaemia and signs of infection.",
      "Stool tests look for other causes, such as infections, and for signs of bowel inflammation.",
      "Colonoscopy views the whole colon and rectum. Flexible sigmoidoscopy views the rectum and lower colon.",
      "Biopsies examined under a microscope confirm the diagnosis, rule out other conditions and show how severe and widespread it is.",
      "Scans such as ultrasound, CT or X-ray are sometimes used.",
    ],
    sourceIds: ["niddk-diagnosis", "nhs-uc"],
  },
  {
    id: "treatment-goals",
    group: "basics",
    title: "What treatment aims for",
    plain:
      "Treatment aims to calm a flare and then keep the disease quiet for as long as possible. Most people need medicine long term. Some need surgery.",
    caveat: "Do not stop prescribed medicine because you feel well, without talking to your care team.",
    science: [
      "The choice of medicine depends on how severe the disease is and how much bowel is affected.",
      "Severe flares are usually treated in hospital.",
      "Surgery removes the colon and rectum. Waste then leaves through an opening on the tummy (ileostomy) or an internal pouch made from the small bowel.",
      "Surgery may be advised for cancer or precancer, dangerous complications, or disease that medicines do not control.",
    ],
    sourceIds: ["niddk-treatment", "nhs-uc"],
  },
];

const MEDICINES: Topic[] = [
  {
    id: "aminosalicylate",
    group: "medicine",
    title: "5-ASA medicines",
    plain:
      "These calm inflammation in the bowel lining. They include mesalazine and sulfasalazine. They are often used for mild or moderate disease.",
    caveat: "They are not enough for everyone, particularly in more severe disease.",
    science: [
      "In pooled trials, 71% of people taking oral 5-ASA did not reach remission, compared with 83% on placebo.",
      "For keeping remission, about 37% relapsed within six to twelve months on 5-ASA, compared with 55% on placebo.",
    ],
    sourceIds: ["cochrane-5asa-induction", "cochrane-5asa-maintenance", "niddk-treatment", "nhs-uc"],
  },
  {
    id: "corticosteroid",
    group: "medicine",
    title: "Corticosteroids (steroids)",
    plain:
      "Steroids such as prednisolone damp down the immune system. They are used to treat flares. They are usually taken for a short time only.",
    caveat: "Long-term use can cause serious side effects, including weaker bones. They are not used to maintain remission.",
    science: [
      "They are used for moderate to severe disease, and for milder disease that has not responded to 5-ASA.",
      "Symptoms that only stay controlled with continuous steroids are one reason surgery may be discussed.",
    ],
    sourceIds: ["niddk-treatment", "niddk-definition", "nhs-uc"],
  },
  {
    id: "cytokine",
    group: "medicine",
    title: "Medicines that block immune messages",
    plain:
      "These block signals that keep inflammation switched on. Some are given by drip or injection, others as tablets. They are used for moderate to severe disease.",
    caveat: "They can raise the risk of infection. Risks differ between drugs, and none works for everyone.",
    science: [
      "Anti-TNF drugs include infliximab, adalimumab and golimumab. Anti-IL-23 drugs include mirikizumab, risankizumab and guselkumab. Ustekinumab blocks IL-12 and IL-23.",
      "Tofacitinib and upadacitinib are tablets that block JAK enzymes, which carry signals inside cells.",
      "In trials these drugs beat placebo. The size of the benefit cannot be compared across separate trials.",
    ],
    sourceIds: [
      "aga-2024",
      "niddk-treatment",
      "nhs-uc",
      "act-infliximab",
      "ultra2-adalimumab",
      "pursuit-golimumab",
      "unifi-ustekinumab",
      "lucent-mirikizumab",
      "inspire-risankizumab",
      "quasar-guselkumab",
      "octave-tofacitinib",
      "uachieve-upadacitinib",
    ],
  },
  {
    id: "trafficking",
    group: "medicine",
    title: "Medicines that keep immune cells out of the gut",
    plain:
      "These stop some immune cells from reaching the bowel. Vedolizumab is given by drip or injection. Ozanimod and etrasimod are tablets.",
    caveat: "Each has its own safety checks and side effects. Your care team will explain them.",
    science: [
      "Vedolizumab blocks the integrin that guides lymphocytes into gut tissue.",
      "Ozanimod and etrasimod act on S1P receptors, which control when lymphocytes leave lymph nodes.",
      "All three beat placebo in phase 3 trials.",
    ],
    sourceIds: ["gemini-vedolizumab", "truenorth-ozanimod", "elevate-etrasimod", "aga-2024"],
  },
];

export const TOPICS: Topic[] = [
  ...BASICS,
  ...CAUSES.map((c): Topic => ({
    id: c.id,
    group: "cause",
    title: c.title,
    badge: c.strength,
    plain: c.plain,
    caveat: c.caveat,
    science: [c.summary],
    sourceIds: c.sourceIds,
  })),
  ...MEDICINES,
  ...COMPLEMENTARY.map((c): Topic => ({
    id: c.id,
    group: "other",
    title: c.title,
    badge: c.verdict,
    plain: c.plain,
    caveat: c.caveat,
    science: [c.summary],
    sourceIds: c.sourceIds,
  })),
];

export const topicsIn = (group: Topic["group"]) => TOPICS.filter((t) => t.group === group);

const PAGES: Record<Topic["group"], string> = {
  basics: "/understand",
  cause: "/understand",
  medicine: "/treatments",
  other: "/treatments/other",
};

export const topicHref = (topic: Topic) => `${PAGES[topic.group]}#${topic.id}`;
