import { cleanTerm, getJson, stated, type Batch, type Fetch, type Result } from "./core";

const API = "https://clinicaltrials.gov/api/v2";

export type TrialStatus = "RECRUITING" | "NOT_YET_RECRUITING" | "COMPLETED" | "ALL";

interface Study {
  protocolSection?: {
    identificationModule?: { nctId?: string; briefTitle?: string };
    statusModule?: { overallStatus?: string; lastUpdatePostDateStruct?: { date?: string } };
    designModule?: { phases?: string[] };
    armsInterventionsModule?: { interventions?: { name?: string }[] };
    contactsLocationsModule?: { locations?: { country?: string }[] };
  };
}

const OPERATOR = /^(AND|OR|NOT)$/;
const KEYWORD = /^(ALL|AREA|COVERAGE|DISTANCE|EXPANSION|MAX|MIN|MISSING|RANGE|SEARCH|TILT)$/;
const isOperand = (word = "") => /[\p{L}\p{N}]/u.test(word) && !OPERATOR.test(word);

/**
 * ClinicalTrials.gov rejects a query with a stray operator or keyword, and reads them as
 * ordinary words in lower case. An operator is left as typed only where it can be one:
 * `NOT` before a word, and `AND` or `OR` between a word and a word or `NOT` word.
 */
const asQuery = (term: string) =>
  term
    // A comma beside an operator is rejected too.
    .split(/[ ,]+/)
    .filter(Boolean)
    .map((word, i, words) => {
      const excludes = (at: number) => words[at] === "NOT" && isOperand(words[at + 1]);
      const works =
        word === "NOT" ? excludes(i) : isOperand(words[i - 1]) && (isOperand(words[i + 1]) || excludes(i + 1));
      return (OPERATOR.test(word) && !works) || KEYWORD.test(word) ? word.toLowerCase() : word;
    })
    .join(" ");

/** `ACTIVE_NOT_RECRUITING` and `EARLY_PHASE1` as a reader would write them. */
function words(code: string) {
  if (code === "NA") return "Not applicable";
  if (code === "ACTIVE_NOT_RECRUITING") return "Active, not recruiting";
  const text = code.toLowerCase().replaceAll("_", " ").replace(/phase(\d)/, "phase $1");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const unique = (values: (string | undefined)[]) => [...new Set(values.filter(Boolean))];

function toResult(study: Study | null): Result[] {
  const p = study?.protocolSection;
  const id = p?.identificationModule?.nctId;
  if (!id || !/^NCT\d{8}$/.test(id)) return [];
  const status = p.statusModule?.overallStatus;
  const details: [string, string | undefined][] = [
    ["Status", status && words(status)],
    ["Phase", p.designModule?.phases?.map(words).join(", ")],
    ["Treatments tested", unique(p.armsInterventionsModule?.interventions?.map((i) => i.name) ?? []).join("; ")],
    ["Countries", unique(p.contactsLocationsModule?.locations?.map((l) => l.country) ?? []).join(", ")],
    ["Last updated", p.statusModule?.lastUpdatePostDateStruct?.date],
  ];
  return [
    {
      id,
      title: stated(p.identificationModule?.briefTitle),
      url: `https://clinicaltrials.gov/study/${id}`,
      details: details.map(([label, value]) => ({ label, value: stated(value) })),
    },
  ];
}

/** `total` comes with the first page only; later pages leave it out. */
export async function searchTrials(
  q: { term: string; status: TrialStatus; next?: string },
  signal: AbortSignal,
  f?: Fetch,
): Promise<Batch> {
  const term = asQuery(cleanTerm(q.term));
  const params = new URLSearchParams({
    "query.cond": "ulcerative colitis",
    ...(term && { "query.term": term }),
    ...(q.status !== "ALL" && { "filter.overallStatus": q.status }),
    sort: "LastUpdatePostDate:desc",
    pageSize: "10",
    countTotal: "true",
    ...(q.next && { pageToken: q.next }),
    fields: "NCTId,BriefTitle,OverallStatus,Phase,InterventionName,LocationCountry,LastUpdatePostDate",
  });
  const body = (await getJson(`${API}/studies?${params}`, signal, f)) as {
    studies?: (Study | null)[];
    totalCount?: number;
    nextPageToken?: string;
  } | null;
  if (!Array.isArray(body?.studies)) throw new Error("The service sent no list of studies");
  return { results: body.studies.flatMap(toResult), total: body.totalCount, next: body.nextPageToken };
}

/** The day ClinicalTrials.gov processed the data it is serving, as `YYYY-MM-DD`. */
export async function trialsDataDate(signal: AbortSignal, f?: Fetch): Promise<string | undefined> {
  const body = (await getJson(`${API}/version`, signal, f)) as { dataTimestamp?: string } | null;
  return body?.dataTimestamp?.slice(0, 10);
}
