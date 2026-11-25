// Live search runs in the visitor's browser and calls each service directly.
// A search term is never logged or stored, and error messages leave it out.

export interface Result {
  id: string;
  title: string;
  url: string;
  details: { label: string; value: string }[];
}

export interface Batch {
  results: Result[];
  total?: number;
  next?: string;
}

export type Fetch = typeof fetch;

const TIMEOUT_MS = 15_000;

/** Removes brackets, quotes and similar, so a term cannot rewrite the query around it. */
export const cleanTerm = (term: string) =>
  term
    .normalize("NFKC")
    // Control and invisible characters, such as a pasted zero-width space.
    .replace(/[\p{Cc}\p{Cf}]/gu, " ")
    .replace(/[()[\]{}<>"\\#“”„«»]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100)
    .trim();

/** A detail from outside text, or `Not stated` when the service gives none. */
export const stated = (value: unknown) => (typeof value === "string" && value.trim()) || "Not stated";

export async function getJson(url: string, signal: AbortSignal, f: Fetch = fetch): Promise<unknown> {
  signal.throwIfAborted();
  const stop = new AbortController();
  // Raced as well as passed to fetch, so waiting ends even if the request or its body ignores the signal.
  const stopped = new Promise<never>((_, reject) => stop.signal.addEventListener("abort", () => reject(stop.signal.reason)));
  const cancel = () => stop.abort(signal.reason);
  signal.addEventListener("abort", cancel);
  const timer = setTimeout(() => stop.abort(new Error("The service did not answer")), TIMEOUT_MS);
  const read = async (): Promise<unknown> => {
    // The address holds the term, so the browser is told not to keep a copy.
    const response = await f(url, { signal: stop.signal, cache: "no-store" });
    if (!response.ok) throw new Error(`The service answered ${response.status}`);
    return response.json();
  };
  try {
    return await Promise.race([read(), stopped]);
  } finally {
    clearTimeout(timer);
    signal.removeEventListener("abort", cancel);
  }
}

/** Each new task cancels the one before. A cancelled task resolves `undefined`, even if it fails. */
export function latestOnly() {
  let current: AbortController | undefined;
  return async <T>(task: (signal: AbortSignal) => Promise<T>): Promise<T | undefined> => {
    current?.abort();
    const { signal } = (current = new AbortController());
    try {
      const value = await task(signal);
      return signal.aborted ? undefined : value;
    } catch (error) {
      if (signal.aborted) return undefined;
      throw error;
    }
  };
}
