// What the live search page shows, kept apart from React so it can be tested.
// A search term stays in memory here: nothing logs or saves it.

import { cleanTerm, latestOnly, type Batch, type Fetch, type Result } from "./core";
import { searchHub } from "./hub";
import { paperQuery, searchPapers, type PaperKind } from "./papers";
import { searchTrials, trialQuery, trialsDataDate, type TrialStatus } from "./trials";

export type Tab = "trials" | "papers" | "hub";

export const SERVICES: Record<Tab, string> = {
  trials: "ClinicalTrials.gov",
  papers: "PubMed",
  hub: "Hugging Face",
};

/** A search as it was sent. Filters that do not belong to the tab are ignored. */
export interface Query {
  tab: Tab;
  term: string;
  status: TrialStatus;
  kind: PaperKind;
}

export interface State {
  phase: "idle" | "loading" | "done" | "failed" | "offline" | "short";
  /** The search behind the results, so that `Show more` repeats it whatever is typed since. */
  query?: Query;
  results: Result[];
  total?: number;
  next?: string;
  /** `null` when ClinicalTrials.gov did not give it. */
  dataDate?: string | null;
}

export type Action =
  | { type: "clear" }
  | { type: "search"; query: Query }
  | { type: "more" }
  | { type: "loaded"; batch: Batch }
  | { type: "failed" | "offline" | "short" }
  | { type: "date"; date: string | null };

export const EMPTY: State = { phase: "idle", results: [] };

export function reduce(state: State, action: Action): State {
  switch (action.type) {
    case "clear":
      return EMPTY;
    case "search":
      return { phase: "loading", query: action.query, results: [] };
    case "more":
      return { ...state, phase: "loading" };
    case "loaded": {
      const { batch } = action;
      // A listing that moved between pages would otherwise appear twice.
      const byId = new Map([...state.results, ...batch.results].map((r) => [r.id, r]));
      return {
        ...state,
        phase: "done",
        results: [...byId.values()],
        // ClinicalTrials.gov sends the total with the first page only.
        total: batch.total ?? state.total,
        next: batch.next,
      };
    }
    case "date":
      return { ...state, dataDate: action.date };
    default:
      return { ...state, phase: action.type };
  }
}

function fetchPage({ tab, term, status, kind }: Query, next: string | undefined, signal: AbortSignal, f?: Fetch) {
  if (tab === "trials") return searchTrials({ term, status, next }, signal, f);
  if (tab === "papers") return searchPapers({ term, kind, next }, signal, f);
  return searchHub({ term, next }, signal, f);
}

/** Runs searches one at a time: starting or clearing one cancels the one before. */
export function searcher(
  dispatch: (action: Action) => void,
  f?: Fetch,
  online: () => boolean = () => navigator.onLine,
) {
  const run = latestOnly();
  // Its own runner, so that a slow date neither delays results nor is cancelled by `Show more`.
  const runDate = latestOnly();
  const cancel = () => void run(async () => undefined);

  async function load(query: Query, next?: string) {
    try {
      const batch = await run((signal) => fetchPage(query, next, signal, f));
      if (batch) dispatch({ type: "loaded", batch });
    } catch {
      // The error is dropped: its message could repeat the term.
      dispatch({ type: online() ? "failed" : "offline" });
    }
  }

  function loadDate() {
    // `undefined` means cancelled; a missing date is `null`.
    runDate(async (signal) => (await trialsDataDate(signal, f)) ?? null).then(
      (date) => date !== undefined && dispatch({ type: "date", date }),
      () => dispatch({ type: "date", date: null }),
    );
  }

  return {
    async search(query: Query) {
      cancel();
      dispatch({ type: "search", query });
      if (query.tab === "hub" && query.term.trim().length < 2) return dispatch({ type: "short" });
      if (!online()) return dispatch({ type: "offline" });
      if (query.tab === "trials") loadDate();
      await load(query);
    },
    /** The next page of the search that produced `state`. */
    async more({ phase, query, next }: State) {
      if (phase === "loading" || !query || !next) return;
      dispatch({ type: "more" });
      if (!online()) return dispatch({ type: "offline" });
      await load(query, next);
    },
    clear() {
      cancel();
      void runDate(async () => undefined);
      dispatch({ type: "clear" });
    },
  };
}

const TRIAL_STATUS_CODES = { RECRUITING: "rec", NOT_YET_RECRUITING: "not", COMPLETED: "com" };

/** The same search on the service's own site. */
export function sourceLinks({ tab, term, status, kind }: Query): { href: string; label: string }[] {
  if (tab === "trials") {
    const words = trialQuery(term);
    const params = new URLSearchParams({
      cond: "ulcerative colitis",
      ...(words && { term: words }),
      ...(status !== "ALL" && { aggFilters: `status:${TRIAL_STATUS_CODES[status]}` }),
    });
    return [{ href: `https://clinicaltrials.gov/search?${params}`, label: "Run this search on ClinicalTrials.gov" }];
  }
  if (tab === "papers") {
    const params = new URLSearchParams({ term: paperQuery(cleanTerm(term), kind), sort: "pubdate" });
    return [{ href: `https://pubmed.ncbi.nlm.nih.gov/?${params}`, label: "Run this search on PubMed" }];
  }
  const params = new URLSearchParams({ search: term.trim() });
  return ["datasets", "models"].map((kind) => ({
    href: `https://huggingface.co/${kind}?${params}`,
    label: `Search ${kind} on Hugging Face`,
  }));
}
