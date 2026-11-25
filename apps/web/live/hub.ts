import { getJson, stated, type Batch, type Fetch, type Result } from "./core";

const SITE = "https://huggingface.co";
const PAGE = 10;

/** Hugging Face matches names only, so these are names checked to return relevant results. */
export const HUB_PRESETS = ["LIMUC", "Kvasir", "IBDColEpi"];

type Kind = "dataset" | "model";

interface Repo {
  id?: unknown;
  downloads?: unknown;
  lastModified?: unknown;
  tags?: unknown;
  cardData?: { license?: unknown } | null;
}

/** `name` or `owner/name`. Each part starts and ends with a letter, digit or underscore, so none is `.` or `..`. */
const REPO_ID = /^\w(?:[\w.-]*\w)?(?:\/\w(?:[\w.-]*\w)?)?$/;

const strings = (value: unknown) =>
  (Array.isArray(value) ? value : [value]).filter((v): v is string => typeof v === "string" && !!v.trim());

/** The licence the repository declares, never one worked out from anything else. */
function licence({ cardData, tags }: Repo) {
  const card = strings(cardData?.license);
  const tagged = strings(tags).flatMap((t) => (t.startsWith("license:") ? strings(t.slice("license:".length)) : []));
  return stated((card.length ? card : tagged).join(", "));
}

function toResult(kind: Kind, id: string, repo: Repo): Result {
  const { downloads, lastModified } = repo;
  const date = typeof lastModified === "string" ? /^\d{4}-\d{2}-\d{2}/.exec(lastModified)?.[0] : undefined;
  return {
    id: `${kind}:${id}`,
    title: id,
    url: `${SITE}/${kind === "dataset" ? "datasets/" : ""}${id}`,
    details: [
      { label: "Type", value: kind === "dataset" ? "Dataset" : "Model" },
      { label: "Licence", value: licence(repo) },
      { label: "Downloads", value: typeof downloads === "number" ? downloads.toLocaleString("en-US") : "Not stated" },
      { label: "Last updated", value: stated(date) },
    ],
  };
}

async function list(kind: Kind, term: string, signal: AbortSignal, f?: Fetch) {
  const query = new URLSearchParams({ search: term, full: "true", sort: "downloads", direction: "-1", limit: "50" });
  const body = await getJson(`${SITE}/api/${kind}s?${query}`, signal, f);
  if (!Array.isArray(body)) throw new Error("Hugging Face sent no list of results");
  const found = (body as (Repo | null)[]).flatMap((repo) => {
    const id = repo?.id;
    if (!repo || typeof id !== "string" || !REPO_ID.test(id)) return [];
    return [{ downloads: Number(repo.downloads) || 0, result: toResult(kind, id, repo) }];
  });
  if (body.length && !found.length) throw new Error("Hugging Face sent no usable results");
  return found;
}

/** Datasets and models together, most downloaded first. `next` is the position of the next page. */
export async function searchHub(q: { term: string; next?: string }, signal: AbortSignal, f?: Fetch): Promise<Batch> {
  const term = q.term.trim();
  if (term.length < 2) return { results: [] };
  const lists = await Promise.all([list("dataset", term, signal, f), list("model", term, signal, f)]);
  const all = lists.flat().sort((a, b) => b.downloads - a.downloads);
  const start = Number(q.next ?? 0);
  const end = start + PAGE;
  return {
    results: all.slice(start, end).map((found) => found.result),
    next: end < all.length ? String(end) : undefined,
  };
}
