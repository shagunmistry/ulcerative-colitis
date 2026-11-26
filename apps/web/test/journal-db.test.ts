import "fake-indexeddb/auto";
import { openDB } from "idb";
import { afterEach, describe, expect, it } from "vitest";
import { DB_VERSION, openJournal, type Journal } from "../journal/db";
import { toExport } from "../journal/files";
import { defaultTerms, parseExport, type Entry } from "../journal/schema";

let count = 0;
const opened: Journal[] = [];
const open = async (name = `journal-${++count}`) => {
  const journal = await openJournal(name);
  opened.push(journal);
  return journal;
};
afterEach(() => opened.splice(0).forEach((j) => j.close()));

const a: Entry = { id: "a", date: "2026-12-02", pain: 0, notes: "ünïcode ✓" };
const b: Entry = { id: "b", date: "2026-12-01", stool_frequency: 0, blood: "none" };

describe("journal storage", () => {
  it("starts empty with no saved terms", async () => {
    const journal = await open();
    expect(await journal.entries()).toEqual([]);
    expect(await journal.terms()).toBeUndefined();
  });

  it("lists entries oldest first, and replaces one saved again", async () => {
    const journal = await open();
    await journal.put(a);
    await journal.put(b);
    await journal.put({ ...a, pain: 4 });
    expect(await journal.entries()).toEqual([b, { ...a, pain: 4 }]);
  });

  it("refuses to save an invalid entry", async () => {
    const journal = await open();
    await expect(journal.put({ id: "x", date: "no" })).rejects.toThrow(/date/);
    expect(await journal.entries()).toEqual([]);
  });

  it("removes one entry", async () => {
    const journal = await open();
    await journal.put(a);
    await journal.put(b);
    await journal.remove("a");
    expect(await journal.entries()).toEqual([b]);
  });

  it("keeps data after closing", async () => {
    const first = await open("kept");
    await first.put(a);
    first.close();
    expect(await (await open("kept")).entries()).toEqual([a]);
  });

  it("wipes entries and terms", async () => {
    const journal = await open();
    await journal.put(a);
    await journal.saveTerms(defaultTerms("2026-12-01"));
    await journal.clear();
    expect(await journal.entries()).toEqual([]);
    expect(await journal.terms()).toBeUndefined();
  });

  it("gets identical entries and terms back after export, delete everything and import", async () => {
    const journal = await open();
    const terms = { ...defaultTerms("2026-12-01"), contact: "me@example.org" };
    await journal.put(a);
    await journal.put(b);
    await journal.saveTerms(terms);
    const exported = toExport(await journal.entries(), (await journal.terms())!);

    await journal.clear();
    await journal.replaceAll(parseExport(exported));

    expect(await journal.entries()).toEqual([b, a]);
    expect(await journal.terms()).toEqual(terms);
    expect(toExport(await journal.entries(), (await journal.terms())!)).toBe(exported);
  });

  it("replaces, rather than adds to, what was there on import", async () => {
    const journal = await open();
    await journal.put(a);
    await journal.replaceAll({ entries: [b], terms: defaultTerms("2026-12-01") });
    expect(await journal.entries()).toEqual([b]);
  });

  it("records its schema version", async () => {
    (await open("versioned")).close();
    const raw = await openDB("versioned");
    expect(raw.version).toBe(DB_VERSION);
    raw.close();
  });
});
