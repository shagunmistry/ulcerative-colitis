import { describe, expect, it } from "vitest";
import { PAGES, REVIEWERS, reviewState, reviewStatement, reviewSummary, type ContentPage, type Reviewer } from "../src";

const reviewer: Reviewer = {
  id: "example",
  name: "Example Reviewer",
  credentials: "MD",
  affiliation: "Example Hospital",
  url: "https://example.org",
  conflicts_of_interest: "None declared",
};

const page = (path: string, review: Partial<ContentPage["review"]> = {}): ContentPage => ({
  path,
  slug: path.slice(1),
  title: path,
  checkedOn: "2026-11-24",
  review: { status: "unreviewed", reviewer_id: null, reviewed_on: null, notes: null, ...review },
});

const done = { status: "reviewed", reviewer_id: "example", reviewed_on: "2026-12-01" } as const;

describe("review records", () => {
  it("names the reviewer and date of a reviewed page", () => {
    expect(reviewState(page("/a", done), [reviewer])).toEqual({ status: "reviewed", reviewer, date: "2026-12-01" });
  });

  it.each([
    ["an unknown reviewer", { ...done, reviewer_id: "nobody" }],
    ["no reviewer", { ...done, reviewer_id: null }],
    ["no date", { ...done, reviewed_on: null }],
  ])("never shows a page with %s as reviewed", (_, review) => {
    expect(reviewState(page("/a", review), [reviewer])).toEqual({ status: "unreviewed" });
  });

  it("counts reviewed pages and pages in review", () => {
    const pages = [page("/a", done), page("/b", { status: "in_review" }), page("/c")];
    expect(reviewSummary(pages, [reviewer])).toEqual({ total: 3, reviewed: 1, inReview: 1 });
  });

  it.each([
    [[page("/a"), page("/b")], "No clinician has reviewed this site yet."],
    [
      [page("/a", { status: "in_review" }), page("/b")],
      "No page has completed clinical review yet. Review is in progress.",
    ],
    [[page("/a", done), page("/b")], "A clinician has reviewed 1 of 2 content pages. The rest are not reviewed."],
    [[page("/a", done)], "Clinicians have reviewed every content page."],
  ])("states the site-wide position honestly", (pages, text) => {
    expect(reviewStatement(pages, [reviewer])).toBe(text);
  });
});

describe("the site's records", () => {
  it("gives every page a unique path and slug and a checked date", () => {
    expect(new Set(PAGES.map((p) => p.path)).size).toBe(PAGES.length);
    expect(new Set(PAGES.map((p) => p.slug)).size).toBe(PAGES.length);
    for (const p of PAGES) expect(p.checkedOn, p.path).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("gives every reviewer a unique id, credentials and a conflict statement", () => {
    expect(new Set(REVIEWERS.map((r) => r.id)).size).toBe(REVIEWERS.length);
    for (const r of REVIEWERS) {
      expect(r.name && r.credentials && r.conflicts_of_interest, r.id).toBeTruthy();
    }
  });

  it("backs every page marked reviewed with a listed reviewer and a date", () => {
    for (const p of PAGES) {
      if (p.review.status === "reviewed") expect(reviewState(p).status, p.path).toBe("reviewed");
    }
  });
});
