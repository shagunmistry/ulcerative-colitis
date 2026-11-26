"use client";

import { getPage } from "@uc/evidence";
import { useState } from "react";
import { events } from "@/analytics";
import { feedbackIssueUrl, formUrl } from "@/lib";
import { External } from "./External";

export function NotHelpful({ path, form }: { path: string; form?: string }) {
  return (
    <ul className="mt-3 space-y-1 text-sm">
      <li>
        <External href={feedbackIssueUrl(path)}>Say what was confusing or missing on GitHub</External>. Issues are
        public, so leave out health details.
      </li>
      {form && (
        <li>
          <External href={form}>Send feedback without GitHub</External>
        </li>
      )}
    </ul>
  );
}

/** Counts one answer per visit to the page. Nothing is saved. */
export function Helpful({ path }: { path: string }) {
  const [answer, setAnswer] = useState<"yes" | "no">();

  function vote(value: "yes" | "no") {
    if (answer) return;
    setAnswer(value);
    events.helpfulVote(getPage(path).slug, value);
  }

  const button = "button w-20 aria-pressed:border-[var(--ink)] aria-pressed:bg-[var(--ink)] aria-pressed:text-[var(--paper)]";
  return (
    <section aria-label="Feedback on this page" className="mt-12 border-t border-[var(--rule)] pt-6 print:hidden">
      <div className="flex flex-wrap items-center gap-3">
        <p>Was this helpful?</p>
        {(["yes", "no"] as const).map((value) => (
          <button
            key={value}
            type="button"
            className={button}
            aria-pressed={answer === value}
            // Stays focusable after answering, so keyboard users keep their place.
            aria-disabled={answer !== undefined}
            onClick={() => vote(value)}
          >
            {value === "yes" ? "Yes" : "No"}
          </button>
        ))}
      </div>
      <div role="status">
        {answer && <p className="mt-3 text-sm">Thank you. Your answer was counted.</p>}
        {answer === "no" && <NotHelpful path={path} form={formUrl(process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL)} />}
      </div>
    </section>
  );
}
