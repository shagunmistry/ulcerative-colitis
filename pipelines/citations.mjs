/** The judgements behind check-citations.mjs, kept apart so they can be tested. */

/** "broken" fails the check. "unsure" is reported only: many hosts turn robots away. */
export function classify({ status, error }) {
  if (status !== undefined && status < 400) return "ok";
  if (status === 404 || status === 410 || error === "ENOTFOUND") return "broken";
  return "unsure";
}

export const missingDates = (records) =>
  records.filter((r) => !/^\d{4}-\d{2}-\d{2}$/.test(r.checkedOn ?? "")).map((r) => r.path ?? r.id);

/** The disclaimer repeats the urgent-care list that is dated on /understand. */
const REPEATS_ONLY = ["/disclaimer"];

/** Pages that render citations but have no checked date, because they are not listed. */
export const undatedPages = (pages, listed) =>
  pages
    .filter((p) => /<(Cite|TopicList|UrgentCare)\b/.test(p.source))
    .map((p) => p.path)
    .filter((path) => !listed.includes(path) && !REPEATS_ONLY.includes(path));

/** Complete outside addresses written as plain strings. */
export const fixedLinks = (source) =>
  [...source.matchAll(/["'](https:\/\/[^"'\s`$]+)["']/g)]
    .map((m) => m[1])
    .filter((url) => !/^https:\/\/([^/]*\.)?(example\.(org|com)|github\.com\/shagunmistry\/ulcerative-colitis|ulcerative-colitis\.vercel\.app)/.test(url));
