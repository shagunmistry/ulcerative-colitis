/**
 * The journal's data format and its checks. The consent terms are published separately in
 * spec/consent-terms; tests hold the two to the same answers.
 */
export const TERMS_SPEC = "uc-consent-terms/0.1";
export const EXPORT_SPEC = "uc-journal-export/0.1";

export const USES = ["personal", "clinical_care", "academic_research", "commercial_research", "ai_training"] as const;
export type Use = (typeof USES)[number];

export const SHARING = ["must_share_results_back", "no_requirement", "not_allowed"] as const;
export type Sharing = (typeof SHARING)[number];

export interface Terms {
  spec: typeof TERMS_SPEC;
  created: string;
  allowed_uses: Use[];
  denied_uses: Use[];
  requires_contact_before_use: boolean;
  share_derivatives: Sharing;
  expires: string | null;
  withdrawal: "any_time";
  contact: string | null;
}

export const BLOOD = ["none", "streaks", "obvious", "mostly_blood"] as const;
export type Blood = (typeof BLOOD)[number];

/** Whole-number fields and their largest values. The smallest is always 0. */
export const NUMBERS = { stool_frequency: 100, urgency: 3, pain: 10, fatigue: 10 } as const;
type NumberField = keyof typeof NUMBERS;

export const TEXT_LIMIT = 5000;

export type Entry = { id: string; date: string; blood?: Blood; medications?: string; notes?: string } & Partial<
  Record<NumberField, number>
>;

export interface JournalData {
  entries: Entry[];
  terms: Terms;
}

/** An error whose message can be shown to the person using the journal. */
export class JournalError extends Error {}

const fail = (message: string): never => {
  throw new JournalError(message);
};

export function defaultTerms(created: string): Terms {
  return {
    spec: TERMS_SPEC,
    created,
    allowed_uses: ["personal"],
    denied_uses: USES.filter((use) => use !== "personal"),
    requires_contact_before_use: true,
    share_derivatives: "must_share_results_back",
    expires: null,
    withdrawal: "any_time",
    contact: null,
  };
}

function object(value: unknown, what: string, keys: readonly string[]): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) fail(`${what}: missing or not in the expected shape.`);
  const unknown = Object.keys(value as object).find((key) => !keys.includes(key));
  if (unknown !== undefined) fail(`${what}: unknown field “${unknown}”.`);
  return value as Record<string, unknown>;
}

export function isDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const time = Date.parse(`${value}T00:00:00Z`);
  // Rejects days that do not exist, such as 30 February.
  return !Number.isNaN(time) && new Date(time).toISOString().startsWith(value);
}

const TERMS_KEYS = [
  "spec",
  "created",
  "allowed_uses",
  "denied_uses",
  "requires_contact_before_use",
  "share_derivatives",
  "expires",
  "withdrawal",
  "contact",
] as const;

export function parseTerms(value: unknown): Terms {
  const what = "Consent terms";
  const t = object(value, what, TERMS_KEYS);
  const bad = (field: string) => fail(`${what}: ${field} is missing or not valid.`);
  const uses = (field: "allowed_uses" | "denied_uses") => {
    const list = t[field];
    if (!Array.isArray(list) || new Set(list).size !== list.length || !list.every((u) => USES.includes(u))) bad(field);
    return list as Use[];
  };
  if (t.spec !== TERMS_SPEC) fail(`${what}: expected spec ${TERMS_SPEC}.`);
  if (!isDate(t.created)) bad("created");
  const allowed = uses("allowed_uses");
  if (uses("denied_uses").some((use) => allowed.includes(use))) fail(`${what}: a use is both allowed and denied.`);
  if (typeof t.requires_contact_before_use !== "boolean") bad("requires_contact_before_use");
  if (!SHARING.includes(t.share_derivatives as Sharing)) bad("share_derivatives");
  if (t.expires !== null && !isDate(t.expires)) bad("expires");
  if (t.withdrawal !== "any_time") bad("withdrawal");
  if (t.contact !== null && (typeof t.contact !== "string" || t.contact.length < 1 || t.contact.length > 200)) bad("contact");
  return t as unknown as Terms;
}

const ENTRY_KEYS = ["id", "date", "blood", "medications", "notes", ...Object.keys(NUMBERS)];

export function parseEntry(value: unknown): Entry {
  const e = object(value, "The entry", ENTRY_KEYS);
  if (typeof e.id !== "string" || !/^[A-Za-z0-9-]{1,100}$/.test(e.id)) fail("id is missing or not valid.");
  if (!isDate(e.date)) fail("date is missing or not a real date (YYYY-MM-DD).");
  for (const [field, max] of Object.entries(NUMBERS)) {
    const n = e[field];
    if (n !== undefined && !(Number.isInteger(n) && (n as number) >= 0 && (n as number) <= max)) {
      fail(`${field} must be a whole number from 0 to ${max}.`);
    }
  }
  if (e.blood !== undefined && !BLOOD.includes(e.blood as Blood)) fail(`blood must be one of ${BLOOD.join(", ")}.`);
  for (const field of ["medications", "notes"]) {
    const text = e[field];
    if (text !== undefined && (typeof text !== "string" || text.length > TEXT_LIMIT)) {
      fail(`${field} must be text of at most ${TEXT_LIMIT} characters.`);
    }
  }
  return e as unknown as Entry;
}

export function parseExport(text: string): JournalData {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    fail("This file is not valid JSON.");
  }
  if (typeof value !== "object" || value === null || !("spec" in value)) fail("This file is not a journal export.");
  if ((value as { spec: unknown }).spec !== EXPORT_SPEC) fail(`This file is not a journal export of version ${EXPORT_SPEC}.`);
  const file = object(value, "The file", ["spec", "terms", "entries"]);
  const terms = parseTerms(file.terms);
  if (!Array.isArray(file.entries)) fail("The file has no list of entries.");
  const entries = (file.entries as unknown[]).map((entry, index) => {
    try {
      return parseEntry(entry);
    } catch (error) {
      if (error instanceof JournalError) fail(`Entry ${index + 1}: ${error.message}`);
      throw error;
    }
  });
  if (new Set(entries.map((e) => e.id)).size !== entries.length) fail("Two entries in the file have the same id.");
  return { entries, terms };
}
