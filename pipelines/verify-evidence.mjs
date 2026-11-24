// Fetches each cited PubMed record and checks that the title matches and that
// every quoted figure appears in the abstract. Needs Node 24+ (runs the .ts files directly).
import { SOURCES } from "../packages/evidence/src/sources.ts";
import { CAUSES, COMPLEMENTARY, MEDICINE_FIGURES, TRIALS } from "../packages/evidence/src/content.ts";

const API = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&id=";

const decode = (s) =>
  s
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/·/g, ".")
    .replace(/\s+/g, " ");

const norm = (s) => decode(s).toLowerCase().replace(/[^a-z0-9αβ]+/g, "");

// Web pages are checked by verify-links.mjs; their numbers need a manual check.
const papers = SOURCES.filter((s) => s.pmid);
const response = await fetch(API + papers.map((s) => s.pmid).join(","));
if (!response.ok) throw new Error(`PubMed returned ${response.status}`);
const articles = (await response.text()).split("<PubmedArticle>").slice(1);

const records = new Map(
  articles.map((xml) => [
    xml.match(/<PMID[^>]*>(\d+)<\/PMID>/)[1],
    {
      title: decode(xml.match(/<ArticleTitle[^>]*>([\s\S]*?)<\/ArticleTitle>/)?.[1] ?? ""),
      abstract: decode([...xml.matchAll(/<AbstractText[^>]*>([\s\S]*?)<\/AbstractText>/g)].map((m) => m[1]).join(" ")),
    },
  ]),
);

const problems = [];
for (const s of papers) {
  const record = records.get(s.pmid);
  if (!record) problems.push(`${s.id}: PMID ${s.pmid} not returned`);
  else if (!norm(record.title).startsWith(norm(s.title).slice(0, 40)))
    problems.push(`${s.id}: title mismatch. PubMed says "${record.title}"`);
}

// Digits must not be glued to other digits, so "5%" does not match inside "15%".
const contains = (abstract, figure) =>
  new RegExp(`(?<![\\d.])${figure.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(abstract);

const figures = [
  ...MEDICINE_FIGURES,
  ...[...CAUSES, ...COMPLEMENTARY].flatMap((c) => c.figures),
  ...TRIALS.flatMap((t) => t.quoted.map((text) => ({ sourceId: t.sourceId, text }))),
];
for (const f of figures) {
  const source = papers.find((s) => s.id === f.sourceId);
  if (!source) {
    problems.push(`${f.sourceId}: quoted figure "${f.text}" cites a web page, so it cannot be checked`);
    continue;
  }
  if (!contains(records.get(source.pmid)?.abstract ?? "", f.text))
    problems.push(`${f.sourceId}: "${f.text}" not found in abstract`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`Checked ${papers.length} PubMed sources and ${figures.length} figures against PubMed: all match.`);
