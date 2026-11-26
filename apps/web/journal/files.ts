import { EXPORT_SPEC, type Entry, type Terms } from "./schema";

export function toExport(entries: Entry[], terms: Terms): string {
  return `${JSON.stringify({ spec: EXPORT_SPEC, terms, entries }, null, 2)}\n`;
}

const COLUMNS = ["date", "stool_frequency", "blood", "urgency", "pain", "fatigue", "medications", "notes"] as const;

function cell(value: string | number | undefined) {
  if (value === undefined) return "";
  // A spreadsheet would run text that starts like a formula.
  const text = typeof value === "string" && /^[=+\-@\t\r]/.test(value) ? `'${value}` : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

/** Entries only: the consent terms travel in the JSON export. */
export function toCsv(entries: Entry[]): string {
  return [COLUMNS.join(","), ...entries.map((e) => COLUMNS.map((c) => cell(e[c])).join(","))].join("\r\n");
}

/** Saves text as a file on this device. Nothing leaves the browser. */
export function download(name: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.append(link);
  link.click();
  link.remove();
  // Some browsers read the file after the click returns.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
