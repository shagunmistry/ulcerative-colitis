"use client";

import Link from "next/link";
import { useEffect, useReducer, useRef, useState } from "react";
import { HUB_PRESETS } from "../live/hub";
import type { PaperKind } from "../live/papers";
import { EMPTY, SERVICES, reduce, searcher, sourceLinks, type Query, type State, type Tab } from "../live/state";
import type { TrialStatus } from "../live/trials";
import { External } from "./External";

const TABS: [Tab, string][] = [
  ["trials", "Trials"],
  ["papers", "Papers"],
  ["hub", "Datasets and models"],
];

const STATUSES: [TrialStatus, string][] = [
  ["RECRUITING", "Recruiting"],
  ["NOT_YET_RECRUITING", "Not yet recruiting"],
  ["COMPLETED", "Completed"],
  ["ALL", "All"],
];

const KINDS: [PaperKind, string][] = [
  ["all", "All"],
  ["review", "Reviews"],
  ["trial", "Randomised trials"],
  ["guideline", "Guidelines"],
];

const COMMON = ["vedolizumab", "diet", "fecal microbiota transplantation"];
const PRESETS: Record<Tab, string[]> = { trials: COMMON, papers: COMMON, hub: HUB_PRESETS };

const link = "text-[var(--source)] underline underline-offset-4";
const note = "max-w-prose text-sm text-[var(--ink-soft)]";

/** Who receives the term, shown before anything is sent. */
export function Sends({ tab }: { tab: Tab }) {
  return (
    <p id="sends" className={note}>
      Searching sends your term and your IP address from your browser to{" "}
      {tab === "hub" ? (
        "Hugging Face"
      ) : (
        <>the US National Library of Medicine, which runs {SERVICES[tab]}</>
      )}
      . Our servers do not receive the term. Leave out names and other personal details.
    </p>
  );
}

function About({ tab }: { tab: Tab }) {
  if (tab === "trials")
    return (
      <p className={note}>
        Studies of ulcerative colitis, most recently updated first.{" "}
        <External href="https://clinicaltrials.gov/about-site/terms-conditions">
          ClinicalTrials.gov terms and conditions
        </External>
      </p>
    );
  if (tab === "papers")
    return (
      <p className={note}>
        Papers that PubMed has indexed under ulcerative colitis, newest first. Very new papers may not be indexed yet.{" "}
        <External href="https://www.ncbi.nlm.nih.gov/home/about/policies/">NCBI disclaimer and copyright notice</External>
      </p>
    );
  return (
    <p className={note}>
      Hugging Face matches names only, so this search cannot be limited to ulcerative colitis. Searches the 50 most
      downloaded of each kind, and lists the most downloaded first. For datasets we have checked, see the{" "}
      <Link href="/data" className={link}>
        data library
      </Link>
      .
    </p>
  );
}

function Choices<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: [T, string][];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="slug mb-2">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map(([option, label]) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => value !== option && onChange(option)}
            className="button aria-pressed:border-[var(--ink)] aria-pressed:bg-[var(--ink)] aria-pressed:text-[var(--paper)]"
          >
            {label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function message({ phase, query, results, total, next }: State) {
  if (!query) return "";
  const service = SERVICES[query.tab];
  if (phase === "loading") return `Searching ${service}.`;
  if (phase === "failed") return `${service} did not answer.`;
  if (phase === "offline") return "You are offline. Live search needs a connection.";
  if (phase === "short") return "Type at least two characters.";
  if (!results.length) return next ? "Nothing to show on this page." : `No results from ${service}.`;
  const count = results.length.toLocaleString("en-US");
  if (total !== undefined) return `Showing ${count} of ${total.toLocaleString("en-US")} results.`;
  return `Showing ${count} ${results.length === 1 ? "result" : "results"}.`;
}

function Labels({ tab, dataDate }: { tab: Tab; dataDate: State["dataDate"] }) {
  return (
    <div className="mt-6 max-w-prose space-y-1 text-sm">
      <div className="space-y-1 font-medium text-[var(--signal)]">
        <p>Listed by {SERVICES[tab]}. Not reviewed by us.</p>
        {tab === "trials" && <p>Talk to your care team before contacting a study.</p>}
        {tab === "hub" && <p>Results may be unrelated to ulcerative colitis. No results does not mean no data exists.</p>}
      </div>
      {tab === "trials" && (
        <p className="text-[var(--source)]">
          {dataDate ? (
            <>
              Data processed by ClinicalTrials.gov on <span className="timecode">{dataDate}</span>.
            </>
          ) : dataDate === null ? (
            "ClinicalTrials.gov did not give the date it processed this data."
          ) : (
            "Waiting for the date ClinicalTrials.gov processed this data."
          )}{" "}
          We show selected fields, write status and phase codes as words, and list each treatment and country once.
        </p>
      )}
    </div>
  );
}

/** Everything a search brings back. Text from the services is only ever rendered as text. */
export function LiveResults({ state, onMore }: { state: State; onMore: () => void }) {
  const { phase, query, results, next, dataDate } = state;
  const answered = !!query && (phase === "done" || results.length > 0);
  const elsewhere = !!query && (phase === "failed" || (phase === "done" && !results.length));
  return (
    <section aria-label="Results" className="mt-8 border-t border-[var(--rule)] pt-4 [overflow-wrap:anywhere]">
      <p role="status" className="text-sm font-medium">
        {message(state)}
      </p>
      {elsewhere && (
        <ul className="mt-2 space-y-1 text-sm">
          {sourceLinks(query).map((source) => (
            <li key={source.href}>
              <External href={source.href}>{source.label}</External>
            </li>
          ))}
        </ul>
      )}
      {answered && <Labels tab={query.tab} dataDate={dataDate} />}
      {results.length > 0 && (
        <ul className="mt-4 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
          {results.map((result) => (
            <li key={result.id} className="min-w-0 py-5">
              <h2 className="display text-xl">
                <External href={result.url}>{result.title}</External>
              </h2>
              <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-[10rem_minmax(0,1fr)]">
                {result.details.map((detail) => (
                  <div key={detail.label} className="contents">
                    <dt className="slug text-[var(--ink-soft)]">{detail.label}</dt>
                    <dd className="mb-2 max-w-prose sm:mb-0">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      )}
      {answered && next && (
        // Not `disabled` while loading, which would drop keyboard focus.
        <button type="button" data-more className="button mt-4" aria-disabled={phase === "loading"} onClick={onMore}>
          Show more
        </button>
      )}
    </section>
  );
}

export function LiveSearch() {
  const [tab, setTab] = useState<Tab>("trials");
  const [term, setTerm] = useState("");
  const [status, setStatus] = useState<TrialStatus>("RECRUITING");
  const [kind, setKind] = useState<PaperKind>("all");
  const [state, dispatch] = useReducer(reduce, EMPTY);
  const [live] = useState(() => searcher(dispatch));
  useEffect(() => () => live.clear(), [live]);

  // If `Show more` brings the last page, the button goes: move focus to the first new result.
  const results = useRef<HTMLDivElement>(null);
  const added = useRef<number>(undefined);
  useEffect(() => {
    if (added.current === undefined || state.phase === "loading") return;
    const first = results.current?.querySelectorAll<HTMLElement>("h2 a")[added.current];
    if (!state.next && document.activeElement === document.body) first?.focus();
    added.current = undefined;
  }, [state]);

  const search = (value: string) => {
    added.current = undefined;
    const query: Query = { tab, term: value, status, kind };
    void live.search(query);
  };

  /** Results belong to one tab and filter, so changing either drops them and any request. */
  const change =
    <T,>(set: (value: T) => void) =>
    (value: T) => {
      added.current = undefined;
      live.clear();
      set(value);
    };

  return (
    <div className="max-w-3xl space-y-5">
      <Choices legend="Search for" options={TABS} value={tab} onChange={change(setTab)} />
      <About tab={tab} />
      {tab === "trials" && (
        <Choices legend="Status" options={STATUSES} value={status} onChange={change(setStatus)} />
      )}
      {tab === "papers" && <Choices legend="Kind of paper" options={KINDS} value={kind} onChange={change(setKind)} />}
      <Sends tab={tab} />
      {/* `dialog` and the unnamed field keep the term out of the address, even before this script runs. */}
      <form
        role="search"
        method="dialog"
        onSubmit={(e) => {
          e.preventDefault();
          search(term);
        }}
      >
        <label htmlFor="live-term" className="slug">
          Search term
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          <input
            id="live-term"
            type="search"
            autoComplete="off"
            spellCheck={false}
            maxLength={100}
            aria-describedby="sends"
            placeholder={`For example: ${PRESETS[tab][0]}`}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="min-w-0 flex-1 basis-48 border border-[var(--rule)] bg-[var(--paper-deep)] px-4 py-3 text-lg"
          />
          <button type="submit" className="button !px-5">
            Search
          </button>
        </div>
      </form>
      <fieldset className="min-w-0">
        <legend className="slug mb-2">Common searches</legend>
        <div className="flex flex-wrap gap-2">
          {PRESETS[tab].map((preset) => (
            <button
              key={preset}
              type="button"
              className="button"
              onClick={() => {
                setTerm(preset);
                search(preset);
              }}
            >
              {preset}
            </button>
          ))}
        </div>
      </fieldset>
      <div ref={results}>
        <LiveResults
          state={state}
          onMore={() => {
            if (state.phase === "loading") return;
            added.current = state.results.length;
            void live.more(state);
          }}
        />
      </div>
    </div>
  );
}
