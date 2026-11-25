"use client";

import { useEffect, useState } from "react";

type Vote = "up" | "down";

const KEY = "uc-feedback";

function readVote(topicId: string): Vote | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const all: unknown = JSON.parse(raw);
    if (!all || typeof all !== "object") return null;
    const value = (all as Record<string, unknown>)[topicId];
    return value === "up" || value === "down" ? value : null;
  } catch {
    return null;
  }
}

function saveVote(topicId: string, vote: Vote | null) {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    const all: Record<string, Vote> =
      parsed && typeof parsed === "object" ? { ...(parsed as Record<string, Vote>) } : {};
    if (vote) {
      all[topicId] = vote;
    } else {
      delete all[topicId];
    }
    window.localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // Storage can fail in private browsing or when the quota is full.
  }
}

const button = "inline-flex h-9 w-9 items-center justify-center rounded-md border transition";

export function Feedback({ topicId }: { topicId: string }) {
  const [vote, setVote] = useState<Vote | null>(null);

  useEffect(() => {
    setVote(readVote(topicId));
  }, [topicId]);

  function toggle(next: Vote) {
    const value = vote === next ? null : next;
    setVote(value);
    saveVote(topicId, value);
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--rule)] pt-4">
      <span className="slug text-[var(--ink-soft)]">Was this clear?</span>
      <button
        type="button"
        aria-label="This topic was clear"
        aria-pressed={vote === "up"}
        onClick={() => toggle("up")}
        className={`${button} ${
          vote === "up"
            ? "border-[var(--sage)] bg-[var(--sage)] text-white"
            : "border-[var(--rule)] text-[var(--ink-soft)] hover:border-[var(--sage)] hover:text-[var(--sage)]"
        }`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 22V11l5-8a2 2 0 0 1 3 2v5h4.5a2 2 0 0 1 2 2.3l-1.2 7A2 2 0 0 1 18.3 22H7Z" />
          <path d="M3 11h4v11H3z" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="This topic was not clear"
        aria-pressed={vote === "down"}
        onClick={() => toggle("down")}
        className={`${button} ${
          vote === "down"
            ? "border-[var(--source)] bg-[var(--source)] text-white"
            : "border-[var(--rule)] text-[var(--ink-soft)] hover:border-[var(--source)] hover:text-[var(--source)]"
        }`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 2v11l-5 8a2 2 0 0 1-3-2v-5H4.5a2 2 0 0 1-2-2.3l1.2-7A2 2 0 0 1 5.7 2H17Z" />
          <path d="M21 2h-4v11h4z" />
        </svg>
      </button>
    </div>
  );
}
