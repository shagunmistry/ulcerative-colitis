// Fails on broken citation links and on content with no "last checked" date.
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DATASETS, copyUrl } from "../packages/evidence/src/datasets.ts";
import { LINKS } from "../packages/evidence/src/links.ts";
import { PAGES } from "../packages/evidence/src/pages.ts";
import { SOURCES } from "../packages/evidence/src/sources.ts";
import { classify, fixedLinks, missingDates, undatedPages } from "./citations.mjs";

const web = join(dirname(fileURLToPath(import.meta.url)), "../apps/web");
const files = ["app", "components"].flatMap((dir) =>
  readdirSync(join(web, dir), { recursive: true, encoding: "utf8" })
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => ({ file: join(dir, f), source: readFileSync(join(web, dir, f), "utf8") })),
);
const pages = files
  .filter((f) => f.file.startsWith("app/") && f.file.endsWith("page.tsx"))
  .map((f) => ({ path: f.file.slice("app".length, -"/page.tsx".length) || "/", source: f.source }));

const problems = [
  ...missingDates([...PAGES, ...LINKS, ...DATASETS]).map((name) => `no checked date: ${name}`),
  ...undatedPages(pages, PAGES.map((p) => p.path)).map((path) => `page cites sources but is not in pages.ts: ${path}`),
];

const urls = [
  ...new Set(
    [
      ...SOURCES.map((s) => s.url ?? `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`),
      ...LINKS.map((l) => l.url),
      ...DATASETS.flatMap((d) => [d.url, d.termsUrl, ...d.copies.map(copyUrl)]),
      ...files.flatMap((f) => fixedLinks(f.source)),
    ].filter(Boolean),
  ),
];

async function request(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(30_000),
      headers: { "user-agent": "Mozilla/5.0 (compatible; link-check)", accept: "text/html" },
    });
    await response.body?.cancel();
    return { status: response.status };
  } catch (error) {
    return { error: error.cause?.code ?? error.name };
  }
}

const unsure = [];
// One at a time, so that no host is hurried.
for (const url of urls) {
  let result = await request(url);
  if (classify(result) !== "ok") result = await request(url);
  const verdict = classify(result);
  const line = `${result.status ?? result.error} ${url}`;
  if (verdict === "broken") problems.push(`broken link: ${line}`);
  if (verdict === "unsure") unsure.push(line);
}

if (unsure.length) console.warn(`Could not confirm ${unsure.length} addresses; check by hand:\n${unsure.join("\n")}`);
if (problems.length) {
  console.error(`${problems.length} problems:\n${problems.join("\n")}`);
  process.exit(1);
}
console.log(`Checked ${urls.length} addresses and ${PAGES.length} content pages. No broken links or missing dates.`);
