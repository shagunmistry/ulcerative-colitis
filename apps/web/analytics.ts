/**
 * Every custom event the site sends. No event carries anything a visitor typed, and none
 * has more than the two properties a Pro plan records. Keep /privacy in step with this.
 */
import { track } from "@vercel/analytics";

export const events = {
  simulatorRun: (scenario: "default") => track("simulator_run", { scenario }),
  datasetLinkClick: (dataset: string) => track("dataset_link_click", { dataset }),
  helpfulVote: (page: string, helpful: "yes" | "no") => track("helpful_vote", { page, helpful }),
  /** A count only: never pass anything from the entry. */
  journalCreatedEntry: () => track("journal_created_entry"),
  journalExport: () => track("journal_export"),
};

/** Wraps a function so that only its first call does anything. */
export function once(run: () => void) {
  let done = false;
  return () => {
    if (done) return;
    done = true;
    run();
  };
}
