import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PAGES } from "@uc/evidence";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Helpful, NotHelpful } from "../components/Helpful";
import { Page } from "../components/Page";
import { feedbackIssueUrl, formUrl } from "../lib";

describe("was this helpful", () => {
  it("asks on every content page", () => {
    expect(renderToStaticMarkup(<Page title="t" intro="i" content="/understand">x</Page>)).toContain("Was this helpful?");
    expect(renderToStaticMarkup(<Page title="t" intro="i">x</Page>)).not.toContain("Was this helpful?");
    // The simulator has its own layout.
    expect(readFileSync(join(__dirname, "../app/simulator/page.tsx"), "utf8")).toContain('<Helpful path="/simulator"');
    expect(PAGES.length).toBeGreaterThan(0);
  });

  it("offers two labelled buttons and nothing else until answered", () => {
    const html = renderToStaticMarkup(<Helpful path="/understand" />);
    expect(html).toMatch(/<button[^>]*>Yes<\/button>.*<button[^>]*>No<\/button>/);
    expect(html).not.toContain("issues/new");
  });

  it("stores nothing", () => {
    const source = readFileSync(join(__dirname, "../components/Helpful.tsx"), "utf8");
    expect(source).not.toMatch(/localStorage|sessionStorage|indexedDB|cookie/);
  });

  it("points unhappy readers to the feedback form with the page filled in", () => {
    const url = new URL(feedbackIssueUrl("/treatments"));
    expect(url.searchParams.get("template")).toBe("patient-feedback.yml");
    expect(url.searchParams.get("page_url")).toBe("https://ulcerative-colitis.vercel.app/treatments");
    expect(renderToStaticMarkup(<NotHelpful path="/treatments" />)).toContain("template=patient-feedback.yml");
  });

  it("shows the form for people without GitHub only when one is configured", () => {
    expect(renderToStaticMarkup(<NotHelpful path="/data" />)).not.toContain("without GitHub");
    const html = renderToStaticMarkup(<NotHelpful path="/data" form="https://forms.example.org/f" />);
    expect(html).toContain("without GitHub");
    expect(html).toContain('href="https://forms.example.org/f"');
  });

  it.each([undefined, "", "TODO(owner): external form URL", "javascript:alert(1)", "http://example.org"])(
    "ignores %j as a form address",
    (value) => {
      expect(formUrl(value)).toBeUndefined();
    },
  );
});
