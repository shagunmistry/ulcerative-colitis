import { PAGES, type ContentPage } from "./pages";
import { REVIEWERS, type Reviewer } from "./reviewers";

export type ReviewStatus = "unreviewed" | "in_review" | "reviewed";

export interface Review {
  status: ReviewStatus;
  /** key into REVIEWERS */
  reviewer_id: string | null;
  /** YYYY-MM-DD */
  reviewed_on: string | null;
  notes: string | null;
}

export type ReviewState =
  | { status: "unreviewed" }
  | { status: "in_review" }
  | { status: "reviewed"; reviewer: Reviewer; date: string };

export function getPage(path: string, pages: ContentPage[] = PAGES): ContentPage {
  const page = pages.find((p) => p.path === path);
  if (!page) throw new Error(`Unknown content page: ${path}`);
  return page;
}

/** What may be claimed about a page. Anything incomplete counts as unreviewed. */
export function reviewState(page: ContentPage, reviewers: Reviewer[] = REVIEWERS): ReviewState {
  const { status, reviewer_id, reviewed_on } = page.review;
  if (status === "in_review") return { status };
  const reviewer = reviewers.find((r) => r.id === reviewer_id);
  if (status === "reviewed" && reviewer && reviewed_on) return { status, reviewer, date: reviewed_on };
  return { status: "unreviewed" };
}

export function reviewSummary(pages: ContentPage[] = PAGES, reviewers: Reviewer[] = REVIEWERS) {
  const states = pages.map((p) => reviewState(p, reviewers).status);
  return {
    total: pages.length,
    reviewed: states.filter((s) => s === "reviewed").length,
    inReview: states.filter((s) => s === "in_review").length,
  };
}

/** The site-wide position, in one or two sentences. */
export function reviewStatement(pages: ContentPage[] = PAGES, reviewers: Reviewer[] = REVIEWERS): string {
  const { total, reviewed, inReview } = reviewSummary(pages, reviewers);
  if (reviewed === 0) {
    return inReview
      ? "No page has completed clinical review yet. Review is in progress."
      : "No clinician has reviewed this site yet.";
  }
  if (reviewed < total) return `A clinician has reviewed ${reviewed} of ${total} content pages. The rest are not reviewed.`;
  return "Clinicians have reviewed every content page.";
}
