import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Commons from "../app/commons/page";
import Home from "../app/page";
import { Footer } from "../components/Footer";

const html = renderToStaticMarkup(<Commons />).replaceAll("&#x27;", "'");

describe("commons page", () => {
  it.each(["The problem", "What we're building", "What exists today", "What's next", "How it's governed", "Get involved"])(
    "has the section %s",
    (heading) => {
      expect(html).toContain(`>${heading}</h2>`);
    },
  );

  it("links what exists and marks what does not as planned", () => {
    expect(html).toContain('href="/journal"');
    expect(html).toContain("spec/consent-terms");
    expect(html).toContain("Planned");
    expect(html).toContain("TODO(owner): quarterly milestones");
    expect(html).toContain("TODO(owner): patient advisory group");
    expect(html).toContain('href="/get-involved"');
  });

  it("is linked from the home page and the footer", () => {
    expect(renderToStaticMarkup(<Home />)).toContain('href="/commons"');
    expect(renderToStaticMarkup(<Footer />)).toContain('href="/commons"');
  });
});
