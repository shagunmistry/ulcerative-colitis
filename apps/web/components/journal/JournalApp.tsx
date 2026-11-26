"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { events } from "@/analytics";
import { openJournal, type Journal } from "@/journal/db";
import { download, toCsv, toExport } from "@/journal/files";
import { defaultTerms, JournalError, parseExport, type Entry, type Terms } from "@/journal/schema";
import { EntryForm } from "./EntryForm";
import { describe, today } from "./labels";
import { TermsPanel } from "./TermsPanel";
import { Trends } from "./Trends";

/** Far larger than any journal typed by hand. */
const MAX_FILE_BYTES = 5_000_000;

const h2 = "display mb-4 text-2xl";

export function JournalApp() {
  const journal = useRef<Journal>(null);
  const [data, setData] = useState<{ entries: Entry[]; terms: Terms; version: number }>();
  const [editing, setEditing] = useState<Entry>();
  const [message, setMessage] = useState("");
  const [problem, setProblem] = useState("");

  const load = useCallback(async () => {
    const store = journal.current!;
    const [entries, terms] = await Promise.all([store.entries(), store.terms()]);
    // The version resets the forms whenever stored data is read again.
    setData((old) => ({ entries, terms: terms ?? defaultTerms(today()), version: (old?.version ?? 0) + 1 }));
  }, []);

  useEffect(() => {
    let closed = false;
    openJournal()
      .then(async (store) => {
        if (closed) return store.close();
        journal.current = store;
        await load();
      })
      .catch(() =>
        setProblem("This browser would not open its storage, so the journal cannot run here. Private windows can cause this."),
      );
    return () => {
      closed = true;
      journal.current?.close();
    };
  }, [load]);

  /** Runs a change, then reports what happened. Returns whether it worked. */
  async function change(action: (store: Journal) => Promise<unknown>, done: string) {
    setMessage("");
    setProblem("");
    try {
      await action(journal.current!);
      await load();
      setMessage(done);
      return true;
    } catch (error) {
      setProblem(error instanceof JournalError ? error.message : "That did not work, and nothing was changed.");
      return false;
    }
  }

  if (!data) {
    return problem ? <p role="alert">{problem}</p> : <p>Opening your journal…</p>;
  }
  const { entries, terms, version } = data;

  async function save(entry: Entry) {
    const isNew = !editing;
    const saved = await change((store) => store.put(entry), isNew ? "Entry added." : "Changes saved.");
    if (saved) {
      setEditing(undefined);
      if (isNew) events.journalCreatedEntry();
    }
    return saved;
  }

  function exportFile(kind: "json" | "csv") {
    if (kind === "json") download(`uc-journal-${today()}.json`, toExport(entries, terms), "application/json");
    else download(`uc-journal-${today()}.csv`, toCsv(entries), "text/csv");
    events.journalExport();
    setProblem("");
    setMessage("File saved to your downloads. It is not encrypted, so keep it somewhere safe.");
  }

  async function importFile(input: HTMLInputElement) {
    const file = input.files?.[0];
    // Lets the same file be chosen again.
    input.value = "";
    if (!file) return;
    setMessage("");
    setProblem("");
    try {
      if (file.size > MAX_FILE_BYTES) throw new JournalError("This file is too large to be a journal export.");
      const imported = parseExport(await file.text());
      if (entries.length > 0 && !window.confirm(`Importing replaces the ${entries.length} entries and the terms on this device. Continue?`)) {
        return;
      }
      setEditing(undefined);
      await change((store) => store.replaceAll(imported), `Imported ${imported.entries.length} entries and your terms.`);
    } catch (error) {
      setProblem(error instanceof JournalError ? `${error.message} Nothing was changed.` : "The file could not be read. Nothing was changed.");
    }
  }

  return (
    <div className="space-y-8">
      <section className="panel p-5" id="entry-form">
        <h2 className={h2}>{editing ? `Edit the entry for ${editing.date}` : "New entry"}</h2>
        <p className="mb-4 text-sm text-[var(--ink-soft)]">Only the date is required.</p>
        <EntryForm key={`${editing?.id ?? "new"}-${version}`} editing={editing} onSave={save} onCancel={() => setEditing(undefined)} />
      </section>

      <section className="panel p-5">
        <h2 className={h2}>Trends</h2>
        <Trends entries={entries} />
      </section>

      <section className="panel p-5">
        <h2 className={h2}>
          Your entries (<span className="timecode">{entries.length}</span>)
        </h2>
        {entries.length === 0 ? (
          <p className="text-sm text-[var(--ink-soft)]">No entries yet.</p>
        ) : (
          <ol className="divide-y divide-[var(--rule)]">
            {[...entries].reverse().map((entry) => (
              <li key={entry.id} className="py-4">
                <h3 className="timecode">{entry.date}</h3>
                <dl className="mt-1 text-sm [overflow-wrap:anywhere]">
                  {describe(entry).map(([label, value]) => (
                    <div key={label}>
                      <dt className="inline text-[var(--ink-soft)]">{label}: </dt>
                      <dd className="inline whitespace-pre-wrap">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-2 flex gap-3">
                  <button
                    type="button"
                    className="button"
                    onClick={() => {
                      setEditing(entry);
                      document.getElementById("entry-form")?.scrollIntoView();
                    }}
                  >
                    Edit<span className="sr-only"> entry for {entry.date}</span>
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={() => {
                      if (!window.confirm(`Delete the entry for ${entry.date}?`)) return;
                      if (editing?.id === entry.id) setEditing(undefined);
                      void change((store) => store.remove(entry.id), "Entry deleted.");
                    }}
                  >
                    Delete<span className="sr-only"> entry for {entry.date}</span>
                  </button>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="panel p-5">
        <h2 className={h2}>My data terms</h2>
        <p className="mb-4 max-w-prose text-sm text-[var(--ink-soft)]">
          These go into your export, so your wishes travel with your data. This is a{" "}
          <a
            href="https://github.com/shagunmistry/ulcerative-colitis/tree/main/spec/consent-terms"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--source)] underline underline-offset-4"
          >
            draft format (external)
          </a>
          , not yet legally binding.
        </p>
        <TermsPanel key={version} terms={terms} onSave={(next) => change((store) => store.saveTerms(next), "Terms saved.")} />
      </section>

      <section className="panel p-5">
        <h2 className={h2}>Your data</h2>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="button" onClick={() => exportFile("json")}>
            Export entries and terms (JSON)
          </button>
          <button type="button" className="button" onClick={() => exportFile("csv")}>
            Export entries only (CSV)
          </button>
        </div>
        <label className="mt-5 block text-sm">
          Import a JSON file you exported earlier
          <input
            type="file"
            accept="application/json,.json"
            className="mt-1 block w-full text-sm"
            onChange={(e) => void importFile(e.target)}
          />
        </label>
        <button
          type="button"
          className="button mt-5 !border-[var(--signal)] text-[var(--signal)]"
          onClick={() => {
            if (!window.confirm("Delete every entry and your terms from this device? This cannot be undone.")) return;
            setEditing(undefined);
            void change((store) => store.clear(), "Everything has been deleted from this device.");
          }}
        >
          Delete everything
        </button>
      </section>

      {/* Stays in view, since the buttons that cause these messages sit far apart. */}
      <div className="pointer-events-none sticky bottom-3 z-30 space-y-2">
        <div aria-live="polite">{message && <p className="panel p-3 text-sm">{message}</p>}</div>
        {problem && (
          <p role="alert" className="panel border-l-2 !border-l-[var(--signal)] p-3 text-sm text-[var(--signal)]">
            {problem}
          </p>
        )}
      </div>
    </div>
  );
}
