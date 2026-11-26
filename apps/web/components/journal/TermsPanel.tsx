"use client";

import { useState } from "react";
import { SHARING, USES, type Sharing, type Terms, type Use } from "@/journal/schema";
import { field } from "./EntryForm";
import { SHARING_LABELS, today, USE_LABELS } from "./labels";

export function TermsPanel({ terms, onSave }: { terms: Terms; onSave: (terms: Terms) => Promise<boolean> }) {
  const [draft, setDraft] = useState(terms);
  const set = (patch: Partial<Terms>) => setDraft((t) => ({ ...t, ...patch }));
  const allow = (use: Use, on: boolean) => {
    const allowed = USES.filter((u) => (u === use ? on : draft.allowed_uses.includes(u)));
    set({ allowed_uses: allowed, denied_uses: USES.filter((u) => !allowed.includes(u)) });
  };

  return (
    <form
      autoComplete="off"
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSave({ ...draft, contact: draft.contact?.trim() || null, created: today() });
      }}
    >
      <fieldset>
        <legend className="slug">Who may use my data, and for what</legend>
        {USES.map((use) => (
          <label key={use} className="mt-2 flex items-center gap-3 text-sm">
            <input type="checkbox" checked={draft.allowed_uses.includes(use)} onChange={(e) => allow(use, e.target.checked)} />
            {USE_LABELS[use]}
          </label>
        ))}
        <p className="mt-2 text-sm text-[var(--ink-soft)]">Anything left unticked is not allowed.</p>
      </fieldset>
      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={draft.requires_contact_before_use}
          onChange={(e) => set({ requires_contact_before_use: e.target.checked })}
        />
        Ask me before any use beyond my own
      </label>
      <label className="block text-sm">
        Results made from my data
        <select className={field} value={draft.share_derivatives} onChange={(e) => set({ share_derivatives: e.target.value as Sharing })}>
          {SHARING.map((s) => (
            <option key={s} value={s}>
              {SHARING_LABELS[s]}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        These terms end on (optional)
        <input type="date" className={field} value={draft.expires ?? ""} onChange={(e) => set({ expires: e.target.value || null })} />
      </label>
      <label className="block text-sm">
        How to contact me (optional, saved in your export)
        <input
          type="text"
          maxLength={200}
          spellCheck={false}
          className={field}
          value={draft.contact ?? ""}
          onChange={(e) => set({ contact: e.target.value || null })}
        />
      </label>
      <p className="text-sm text-[var(--ink-soft)]">You can withdraw at any time.</p>
      <button type="submit" className="button">
        Save my terms
      </button>
    </form>
  );
}
