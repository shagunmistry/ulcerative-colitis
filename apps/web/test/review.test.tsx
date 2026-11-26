import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { PAGES, REVIEWERS, getPage } from "@uc/evidence";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import Reviewers from "../app/reviewers/page";
import { ReviewBadge } from "../components/ReviewBadge";

const original = getPage("/understand").review;

/** Edits only the data, as a maintainer would. */
function recordReview() {
  REVIEWERS.push({
    id: "example",
    name: "Example Reviewer",
    credentials: "MD",
    affiliation: "Example Hospital",
    url: "https://example.org",
    conflicts_of_interest: "None declared",
  });
  getPage("/understand").review = { status: "reviewed", reviewer_id: "example", reviewed_on: "2026-12-01", notes: null };
}

afterEach(() => {
  REVIEWERS.length = 0;
  getPage("/understand").review = original;
});

describe("review badge", () => {
  it("says a page is not reviewed", () => {
    expect(renderToStaticMarkup(<ReviewBadge path="/understand" />)).toContain("Not yet clinically reviewed");
  });

  it("says when a review is in progress", () => {
    getPage("/understand").review = { ...original, status: "in_review" };
    expect(renderToStaticMarkup(<ReviewBadge path="/understand" />)).toContain("Review in progress");
  });

  it("names and links the reviewer once the data records a review", () => {
    recordReview();
    const html = renderToStaticMarkup(<ReviewBadge path="/understand" />);
    expect(html).toContain("Reviewed by Example Reviewer, MD on ");
    expect(html).toContain("2026-12-01");
    expect(html).toContain('href="/reviewers#example"');
  });
});

describe("reviewers page", () => {
  it("says nobody has reviewed anything yet", () => {
    const html = renderToStaticMarkup(<Reviewers />);
    expect(html).toContain("No clinician has reviewed this site yet.");
    expect(html).toContain(`0 of ${PAGES.length}`);
  });

  it("updates its count and list from the data alone", () => {
    recordReview();
    const html = renderToStaticMarkup(<Reviewers />);
    expect(html).toContain(`1 of ${PAGES.length}`);
    expect(html).toContain("Example Reviewer");
    expect(html).toContain("None declared");
  });
});

describe("content pages", () => {
  it.each(PAGES.map((p) => p.path))("%s shows its review status", (path) => {
    const file = join(__dirname, "../app", path, "page.tsx");
    expect(existsSync(file)).toBe(true);
    const source = readFileSync(file, "utf8");
    expect(source.includes(`content="${path}"`) || source.includes(`<ReviewBadge path="${path}"`)).toBe(true);
  });

  it("states review status from the data, not in fixed text", () => {
    for (const file of ["app/page.tsx", "app/disclaimer/page.tsx", "components/Page.tsx"]) {
      expect(readFileSync(join(__dirname, "..", file), "utf8"), file).not.toMatch(/reviewed (the|this) (content|site)|reviewed by a\s+clinician\./i);
    }
  });
});
