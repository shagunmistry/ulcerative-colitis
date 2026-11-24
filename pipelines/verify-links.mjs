// Requests every external address the site links to and lists those that fail.
import { LINKS } from "../packages/evidence/src/links.ts";
import { SOURCES } from "../packages/evidence/src/sources.ts";

const urls = [...new Set([...LINKS, ...SOURCES].map((x) => x.url).filter(Boolean))];
const failures = [];
for (const url of urls) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(30_000),
      headers: { "user-agent": "Mozilla/5.0 (compatible; link-check)", accept: "text/html" },
    });
    await response.body?.cancel();
    if (!response.ok) failures.push(`${response.status} ${url}`);
  } catch (error) {
    failures.push(`${error.cause?.code ?? error.name} ${url}`);
  }
}
if (failures.length) {
  console.error(`${failures.length} of ${urls.length} addresses failed:\n${failures.join("\n")}`);
  process.exit(1);
}
console.log(`All ${urls.length} external addresses responded.`);
