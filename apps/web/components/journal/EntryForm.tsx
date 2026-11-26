"use client";

import { useState } from "react";
import { BLOOD, NUMBERS, TEXT_LIMIT, type Entry } from "@/journal/schema";
import { BLOOD_LABELS, today, URGENCY_LABELS } from "./labels";

export const field = "mt-1 w-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-2";

type Values = Record<"date" | "stool_frequency" | "blood" | "urgency" | "pain" | "fatigue" | "medications" | "notes", string>;

const initial = (entry?: Entry): Values => ({
  date: entry?.date ?? today(),
  stool_frequency: entry?.stool_frequency?.toString() ?? "",
  blood: entry?.blood ?? "",
  urgency: entry?.urgency?.toString() ?? "",
  pain: entry?.pain?.toString() ?? "",
  fatigue: entry?.fatigue?.toString() ?? "",
  medications: entry?.medications ?? "",
  notes: entry?.notes ?? "",
});

/** Leaves out everything left blank. */
export function toEntry(id: string, v: Values): Entry {
  const entry: Record<string, string | number> = { id, date: v.date };
  for (const name of Object.keys(NUMBERS) as (keyof typeof NUMBERS)[]) {
    if (v[name] !== "") entry[name] = Number(v[name]);
  }
  for (const name of ["blood", "medications", "notes"] as const) if (v[name] !== "") entry[name] = v[name];
  return entry as unknown as Entry;
}

const range = (max: number) => Array.from({ length: max + 1 }, (_, i) => i);

export function EntryForm({
  editing,
  onSave,
  onCancel,
}: {
  editing?: Entry;
  onSave: (entry: Entry) => Promise<boolean>;
  onCancel: () => void;
}) {
  const [values, setValues] = useState(() => initial(editing));
  const bind = (name: keyof Values) => ({
    value: values[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [name]: e.target.value })),
  });

  const select = (name: keyof Values, label: string, options: [string | number, string][]) => (
    <label className="block text-sm">
      {label}
      <select className={field} {...bind(name)}>
        <option value="">Not recorded</option>
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );

  // The browser's own spelling services can send text away, so spell checking is off.
  const text = (name: "medications" | "notes", label: string) => (
    <label className="block text-sm sm:col-span-2">
      {label}
      <textarea className={field} rows={2} maxLength={TEXT_LIMIT} spellCheck={false} autoComplete="off" {...bind(name)} />
    </label>
  );

  return (
    <form
      autoComplete="off"
      className="grid gap-4 sm:grid-cols-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const saved = await onSave(toEntry(editing?.id ?? crypto.randomUUID(), values));
        if (saved) setValues(initial());
      }}
    >
      <label className="block text-sm">
        Date (required)
        <input type="date" required className={field} {...bind("date")} />
      </label>
      <label className="block text-sm">
        Bowel movements that day
        <input type="number" min={0} max={NUMBERS.stool_frequency} step={1} inputMode="numeric" className={field} {...bind("stool_frequency")} />
      </label>
      {select("blood", "Blood in stool", BLOOD.map((b) => [b, BLOOD_LABELS[b]]))}
      {select("urgency", "Urgency (0 to 3)", URGENCY_LABELS.map((label, i) => [i, `${i}: ${label}`]))}
      {select("pain", "Abdominal pain (0 none, 10 worst)", range(NUMBERS.pain).map((i) => [i, String(i)]))}
      {select("fatigue", "Fatigue (0 none, 10 worst)", range(NUMBERS.fatigue).map((i) => [i, String(i)]))}
      {text("medications", "Medicines taken")}
      {text("notes", "Notes")}
      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <button type="submit" className="button">
          {editing ? "Save changes" : "Add entry"}
        </button>
        {editing && (
          <button type="button" className="button" onClick={onCancel}>
            Cancel editing
          </button>
        )}
      </div>
    </form>
  );
}
