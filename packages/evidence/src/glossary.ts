export interface Definition {
  /** one plain sentence, saying no more than the source does */
  definition: string;
  sourceId: string;
}

const d = (sourceId: string, definition: string): Definition => ({ sourceId, definition });

export const GLOSSARY: Record<string, Definition> = {
  anaemia: d("niddk-definition", "Having fewer red blood cells than normal."),
  biopsy: d("mp-biopsy", "A procedure that removes cells or tissue from the body to examine them."),
  colonoscopy: d("niddk-colonoscopy", "A test using a flexible tube with a camera to look inside the large bowel."),
  corticosteroid: d("niddk-treatment", "A type of steroid medicine, used for moderate to severe ulcerative colitis."),
  endoscopy: d("mp-endoscopy", "A procedure that lets a doctor look inside the body."),
  flare: d("niddk-definition", "A time when you have symptoms."),
  "immune system": d("mp-immune", "A network of cells, tissues and organs that defends the body."),
  inflammation: d("mp-immune-response", "The response that occurs when tissues are injured, for example by germs or toxins."),
  integrin: d("mesh-integrins", "One of a family of proteins that sit in the outer membrane of cells."),
  lymphocyte: d("mp-immune-response", "A type of white blood cell. There are B and T lymphocytes."),
  placebo: d("nccih-placebo", "An inactive substance that looks like the treatment being tested."),
  remission: d("niddk-definition", "A time when symptoms disappear."),
  sigmoidoscopy: d("niddk-sigmoidoscopy", "A test using a flexible tube with a camera to look inside the rectum and lower colon."),
  tenesmus: d("niddk-symptoms", "A constant urge to have a bowel movement, even though the bowel may be empty."),
  "5-ASA": d("mp-mesalamine", "Another name for mesalazine, an anti-inflammatory medicine."),
  JAK: d("mp-jak3", "Short for Janus kinase, a protein that helps pass signals inside cells."),
};

const TERMS = new Map(Object.keys(GLOSSARY).map((term) => [term.toLowerCase(), term]));

// Longest first, so a phrase wins over a word inside it.
const PATTERN = new RegExp(
  `\\b(${[...TERMS.keys()].sort((a, b) => b.length - a.length).join("|")})\\b`,
  "gi",
);

/** Splits text into plain strings and the defined terms found in it. */
export function splitTerms(text: string): (string | { text: string; term: string })[] {
  return text
    .split(PATTERN)
    .map((part, index) => (index % 2 === 1 ? { text: part, term: TERMS.get(part.toLowerCase())! } : part));
}

/** Sources behind every definition that appears in these texts. */
export const definitionSources = (texts: string[]) => [
  ...new Set(
    texts
      .flatMap(splitTerms)
      .flatMap((part) => (typeof part === "string" ? [] : [GLOSSARY[part.term]!.sourceId])),
  ),
];
