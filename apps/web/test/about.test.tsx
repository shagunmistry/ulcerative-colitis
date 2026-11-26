import { getPage, REVIEWERS } from "@uc/evidence";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import About, { metadata } from "../app/about/page";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { isSet, OWNER } from "../owner";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme: undefined, setTheme: () => {} }) }));

const blank = { ...OWNER };
const original = getPage("/data").review;
afterEach(() => {
  Object.assign(OWNER, blank);
  REVIEWERS.length = 0;
  getPage("/data").review = original;
});

describe("about page", () => {
  it("is linked from the main menu and the footer", () => {
    expect(renderToStaticMarkup(<Header />)).toContain('href="/about"');
    expect(renderToStaticMarkup(<Footer />)).toContain('href="/about"');
  });

  it("names the builder, with their photo and contact links", () => {
    const html = renderToStaticMarkup(<About />);
    expect(html).toContain("Shagun Mistry");
    expect(html).toContain('src="/about/owner.jpg"');
    expect(html).toContain('href="mailto:ulcerative-colitis.grudge839@passmail.net"');
    expect(html).toContain('href="https://github.com/shagunmistry"');
    expect(html).toContain('href="https://www.linkedin.com/in/shagun-mistry/"');
    expect(html).not.toMatch(/TODO\(owner\): (name|bio|photo|contact|GitHub|LinkedIn)/);
  });

  it("marks every detail that only the owner can supply", () => {
    for (const value of Object.values(OWNER)) {
      if (!isSet(value)) expect(renderToStaticMarkup(<About />)).toContain(value);
    }
  });

  it("links a contact address only once there is a real one", () => {
    Object.assign(OWNER, {
      email: "TODO(owner): contact email",
      linkedin: "TODO(owner): LinkedIn URL",
    });
    expect(renderToStaticMarkup(<About />)).not.toMatch(/href="(mailto:|TODO)/);
    Object.assign(OWNER, { email: "hello@example.org", linkedin: "https://www.linkedin.com/in/example" });
    const html = renderToStaticMarkup(<About />);
    expect(html).toContain('href="mailto:hello@example.org"');
    expect(html).toContain('href="https://www.linkedin.com/in/example"');
  });

  it("takes the review status from the review data", () => {
    expect(renderToStaticMarkup(<About />)).toContain("No clinician has reviewed this site yet.");
    REVIEWERS.push({
      id: "example",
      name: "Example Reviewer",
      credentials: "MD",
      affiliation: "Example Hospital",
      url: "https://example.org",
      conflicts_of_interest: "None declared",
    });
    getPage("/data").review = { status: "reviewed", reviewer_id: "example", reviewed_on: "2026-12-01", notes: null };
    expect(renderToStaticMarkup(<About />)).toContain("A clinician has reviewed 1 of");
  });

  it("describes itself to search engines and link previews", () => {
    expect(metadata.description).toBeTruthy();
    expect(metadata.openGraph).toMatchObject({ title: "About", description: metadata.description });
  });
});
