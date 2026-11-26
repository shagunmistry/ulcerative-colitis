import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Changelog from "../app/changelog/page";
import { parseChangelog } from "../changelog";
import { Footer } from "../components/Footer";

describe("changelog", () => {
  it("reads releases, groups and wrapped items", () => {
    const text = "# Changelog\n\nIntro.\n\n## 2026-12-01\n\n### Added\n\n- One thing\n  that wraps\n- Two\n\n## 2026-11-01\n\n- Three\n";
    expect(parseChangelog(text)).toEqual([
      { title: "2026-12-01", groups: [{ title: "Added", items: ["One thing that wraps", "Two"] }] },
      { title: "2026-11-01", groups: [{ title: undefined, items: ["Three"] }] },
    ]);
  });

  it("shows the project's file, with its links and code", () => {
    const html = renderToStaticMarkup(<Changelog />);
    expect(html).toContain("2026-11-26");
    expect(html).toContain('href="/journal"');
    expect(html).toContain("<code");
    expect(html).not.toMatch(/\]\(|`/);
  });

  it("is linked from the footer", () => {
    expect(renderToStaticMarkup(<Footer />)).toContain('href="/changelog"');
  });
});
