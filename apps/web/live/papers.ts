import { cleanTerm, getJson, stated, type Batch, type Fetch, type Result } from "./core";

const API = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const PAGE = 10;
/** PubMed refuses a search that starts past this record. */
const LAST_START = 9998;

export type PaperKind = "all" | "review" | "trial" | "guideline";

const KINDS: Record<PaperKind, string> = {
  all: "",
  review: " AND review[pt]",
  trial: " AND randomized controlled trial[pt]",
  guideline: " AND (guideline[pt] OR practice guideline[pt])",
};

interface Summary {
  error?: string;
  title?: string;
  fulljournalname?: string;
  source?: string;
  pubdate?: string;
  authors?: { name?: string }[];
}

interface Body {
  error?: string;
  esearchresult?: { ERROR?: string; count?: string; idlist?: string[] };
  esummaryresult?: unknown;
  result?: Record<string, Summary>;
}

/** PubMed titles can carry formatting tags. Other `<` and `>` signs are part of the text. */
const plain = (title?: string) => title?.replace(/<\/?(b|i|u|em|strong|sub|sup)\b[^<>]*>/gi, "");

function authors(list: Summary["authors"]) {
  const names = (list ?? []).map((a) => a.name).filter(Boolean);
  return names.slice(0, 3).join(", ") + (names.length > 3 ? " and others" : "");
}

function toResult(id: string, s: Summary): Result {
  return {
    id,
    title: stated(plain(s.title)),
    url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
    details: [
      { label: "Journal", value: stated(s.fulljournalname || s.source) },
      { label: "Published", value: stated(s.pubdate) },
      { label: "Authors", value: stated(authors(s.authors)) },
    ],
  };
}

const OPERATOR = /^(AND|OR|NOT)$/;
const isOperand = (word = "") => /[\p{L}\p{N}]/u.test(word) && !OPERATOR.test(word);

/**
 * PubMed silently drops an operator it cannot apply, so those are written in lower case, as
 * ordinary words. `AND` and `OR` need a word on each side, and `NOT` a word after it and a word
 * or `AND` before it. In `x AND NOT y` only the `NOT` is left as typed, because PubMed drops a
 * `NOT` that follows the operator `AND`.
 */
const asQuery = (term: string) => {
  // Words are at the even places and what separated them at the odd ones.
  const parts = term.split(/([ ,]+)/);
  return parts
    .map((part, i) => {
      if (!OPERATOR.test(part)) return part;
      const before = parts[i - 2];
      const works = isOperand(parts[i + 2]) && (isOperand(before) || (part === "NOT" && before === "AND"));
      return works ? part : part.toLowerCase();
    })
    .join("");
};

/** The query PubMed receives: an already cleaned term, kept within ulcerative colitis. */
export const paperQuery = (term: string, kind: PaperKind) => {
  // PubMed ignores a `NOT` that opens a bracket, so a leading one is applied to the disease itself.
  const [, rest, first] = /^[ ,]*NOT[ ,]+(([^ ,]+).*)$/.exec(term) ?? [];
  const excludes = isOperand(first);
  const words = excludes ? rest : term;
  const clause = words && ` ${excludes ? "NOT" : "AND"} (${asQuery(words)})`;
  return `"colitis, ulcerative"[MeSH Terms]${clause}${KINDS[kind]}`;
};

async function ask(script: string, params: Record<string, string>, signal: AbortSignal, f?: Fetch) {
  const query = new URLSearchParams({ db: "pubmed", retmode: "json", tool: "ulcerative-colitis-web", ...params });
  const body = (await getJson(`${API}/${script}.fcgi?${query}`, signal, f)) as Body | null;
  // PubMed can report an error in a response with status 200.
  if (!body || body.error || body.esearchresult?.ERROR) throw new Error("PubMed reported an error");
  return body;
}

export async function searchPapers(
  q: { term: string; kind: PaperKind; next?: string },
  signal: AbortSignal,
  f?: Fetch,
): Promise<Batch> {
  const term = cleanTerm(q.term);
  const found = (
    await ask(
      "esearch",
      {
        retmax: String(PAGE),
        sort: "pub_date",
        ...(q.next && { retstart: q.next }),
        term: paperQuery(term, q.kind),
      },
      signal,
      f,
    )
  ).esearchresult;
  if (!Array.isArray(found?.idlist) || found.count === undefined) throw new Error("PubMed sent no list of results");
  const total = Number(found.count);
  const start = Number(q.next ?? 0) + PAGE;
  const next = start < total && start <= LAST_START ? String(start) : undefined;
  // Ids go into addresses, so anything but a number is dropped.
  const ids = found.idlist.filter((id) => /^\d+$/.test(id));
  if (!found.idlist.length) return { results: [], total, next };
  if (!ids.length) throw new Error("PubMed sent no usable ids");
  const { result } = await ask("esummary", { id: ids.join(",") }, signal, f);
  const results = ids.flatMap((id) => {
    const summary = result?.[id];
    return summary && !summary.error ? [toResult(id, summary)] : [];
  });
  if (!results.length) throw new Error("PubMed sent no summaries");
  return { results, total, next };
}
