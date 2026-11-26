import { readFileSync } from "node:fs";
import { join } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import { describe, expect, it } from "vitest";
import { toCsv, toExport } from "../journal/files";
import {
  defaultTerms,
  JournalError,
  parseEntry,
  parseExport,
  parseTerms,
  USES,
  type Entry,
  type Terms,
} from "../journal/schema";

const spec = join(__dirname, "../../../spec/consent-terms/v0.1/schema.json");
const matchesSpec = new Ajv2020({ allErrors: true }).compile(JSON.parse(readFileSync(spec, "utf8")));

const terms: Terms = defaultTerms("2026-12-01");
const full: Entry = {
  id: "a1",
  date: "2026-12-01",
  stool_frequency: 4,
  blood: "streaks",
  urgency: 2,
  pain: 3,
  fatigue: 5,
  medications: "as listed",
  notes: 'line one\nline "two"',
};
const file = (patch: object = {}) => JSON.stringify({ spec: "uc-journal-export/0.1", terms, entries: [full], ...patch });

describe("consent terms", () => {
  it("allow only personal use until the person chooses otherwise", () => {
    expect(terms.allowed_uses).toEqual(["personal"]);
    expect(terms.denied_uses).toEqual(USES.filter((u) => u !== "personal"));
    expect(terms).toMatchObject({ requires_contact_before_use: true, expires: null, contact: null, withdrawal: "any_time" });
  });

  const cases: [string, unknown, boolean][] = [
    ["the defaults", terms, true],
    ["every use allowed", { ...terms, allowed_uses: [...USES], denied_uses: [] }, true],
    ["an expiry and contact", { ...terms, expires: "2027-12-01", contact: "me@example.org" }, true],
    ["an unknown use", { ...terms, allowed_uses: ["marketing"] }, false],
    ["a use listed twice", { ...terms, allowed_uses: ["personal", "personal"] }, false],
    ["a use both allowed and denied", { ...terms, denied_uses: ["personal"] }, false],
    ["a missing field", { ...terms, withdrawal: undefined }, false],
    ["an extra field", { ...terms, sell: true }, false],
    ["another version", { ...terms, spec: "uc-consent-terms/9" }, false],
    ["a malformed date", { ...terms, created: "1 Dec" }, false],
    ["an unknown sharing rule", { ...terms, share_derivatives: "whatever" }, false],
  ];

  it.each(cases)("treat %s the same way in the app and in the published schema", (_, value, valid) => {
    const plain = JSON.parse(JSON.stringify(value));
    expect(matchesSpec(plain)).toBe(valid);
    if (valid) expect(parseTerms(plain)).toEqual(plain);
    else expect(() => parseTerms(plain)).toThrow(JournalError);
  });
});

describe("entries", () => {
  it("need only an id and a date", () => {
    expect(parseEntry({ id: "a", date: "2026-12-01" })).toEqual({ id: "a", date: "2026-12-01" });
  });

  it.each([
    ["no date", { id: "a" }, /date/],
    ["an impossible date", { id: "a", date: "2026-02-30" }, /date/],
    ["a fractional stool count", { ...full, stool_frequency: 1.5 }, /stool_frequency/],
    ["a negative stool count", { ...full, stool_frequency: -1 }, /stool_frequency/],
    ["urgency above 3", { ...full, urgency: 4 }, /urgency/],
    ["pain above 10", { ...full, pain: 11 }, /pain/],
    ["fatigue as text", { ...full, fatigue: "5" }, /fatigue/],
    ["an unknown blood value", { ...full, blood: "lots" }, /blood/],
    ["notes that are not text", { ...full, notes: 5 }, /notes/],
    ["an unknown field", { ...full, diagnosis: "x" }, /diagnosis/],
    ["a list instead of an entry", [], /entry/i],
  ])("reject %s", (_, value, message) => {
    expect(() => parseEntry(value)).toThrow(message);
  });
});

describe("export files", () => {
  it("bundle the entries with the consent terms", () => {
    expect(JSON.parse(toExport([full], terms))).toEqual({ spec: "uc-journal-export/0.1", terms, entries: [full] });
  });

  it("read back exactly what was written", () => {
    expect(parseExport(toExport([full], terms))).toEqual({ entries: [full], terms });
  });

  it.each([
    ["text that is not JSON", "not json", /not valid JSON/],
    ["some other JSON", "[1,2]", /not a journal export/],
    ["another version", file({ spec: "uc-journal-export/2" }), /uc-journal-export\/0\.1/],
    ["bad terms", file({ terms: { ...terms, allowed_uses: ["x"] } }), /Consent terms/],
    ["no entry list", file({ entries: {} }), /entries/],
    ["a bad entry, saying which", file({ entries: [full, { id: "b", date: "x" }] }), /Entry 2/],
    ["two entries with one id", file({ entries: [full, full] }), /same id/],
    ["extra data", file({ extra: 1 }), /extra/],
  ])("refuse %s", (_, text, message) => {
    expect(() => parseExport(text)).toThrow(message);
  });
});

describe("spreadsheet copy", () => {
  it("quotes text and leaves empty fields empty", () => {
    const [header, row] = toCsv([{ id: "a", date: "2026-12-01", notes: 'say "hi", twice' }]).split("\r\n");
    expect(header).toBe("date,stool_frequency,blood,urgency,pain,fatigue,medications,notes");
    expect(row).toBe('2026-12-01,,,,,,,"say ""hi"", twice"');
  });

  it.each(["=1+1", "+1", "-1", "@x", "\t=1"])("stops %j running as a formula", (notes) => {
    expect(toCsv([{ id: "a", date: "2026-12-01", notes }])).toContain(`'${notes}`);
  });
});
