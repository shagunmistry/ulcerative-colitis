import { openDB, type DBSchema } from "idb";
import { parseEntry, parseTerms, type Entry, type JournalData, type Terms } from "./schema";

export const DB_NAME = "uc-journal";
export const DB_VERSION = 1;

interface Schema extends DBSchema {
  entries: { key: string; value: Entry };
  meta: { key: "terms"; value: Terms };
}

/** The journal stored in this browser's IndexedDB. */
export async function openJournal(name = DB_NAME) {
  const db = await openDB<Schema>(name, DB_VERSION, {
    upgrade(db, oldVersion) {
      if (oldVersion < 1) {
        db.createObjectStore("entries", { keyPath: "id" });
        db.createObjectStore("meta");
      }
      // Migration stub: when the format changes, raise DB_VERSION and convert the
      // stored records here, inside `if (oldVersion < 2) { ... }`.
    },
    // Lets a newer version of the site in another tab upgrade the database.
    blocking: () => db.close(),
  });

  return {
    /** Oldest first. */
    async entries(): Promise<Entry[]> {
      const all = await db.getAll("entries");
      return all.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
    },
    async put(entry: Entry) {
      await db.put("entries", parseEntry(entry));
    },
    async remove(id: string) {
      await db.delete("entries", id);
    },
    terms: (): Promise<Terms | undefined> => db.get("meta", "terms"),
    async saveTerms(terms: Terms) {
      await db.put("meta", parseTerms(terms), "terms");
    },
    /** Swaps everything for the contents of a file, all or nothing. */
    async replaceAll({ entries, terms }: JournalData) {
      const tx = db.transaction(["entries", "meta"], "readwrite");
      await Promise.all([
        tx.objectStore("entries").clear(),
        ...entries.map((entry) => tx.objectStore("entries").put(entry)),
        tx.objectStore("meta").put(terms, "terms"),
        tx.done,
      ]);
    },
    async clear() {
      const tx = db.transaction(["entries", "meta"], "readwrite");
      await Promise.all([tx.objectStore("entries").clear(), tx.objectStore("meta").clear(), tx.done]);
    },
    close: () => db.close(),
  };
}

export type Journal = Awaited<ReturnType<typeof openJournal>>;
