import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { events, once } from "../analytics";
import Privacy from "../app/privacy/page";
import Stats from "../app/stats/page";
import { hasStats, STATS_FIELDS } from "../stats";

const track = vi.hoisted(() => vi.fn());
vi.mock("@vercel/analytics", () => ({ track }));
beforeEach(() => track.mockClear());

const root = join(__dirname, "..");
const read = (file: string) => readFileSync(join(root, file), "utf8");
const sources = ["app", "components", "journal"].flatMap((dir) => {
  try {
    return readdirSync(join(root, dir), { recursive: true, encoding: "utf8" })
      .filter((f) => /\.tsx?$/.test(f))
      .map((f) => join(dir, f));
  } catch {
    return [];
  }
});

describe("custom events", () => {
  it.each([
    [() => events.simulatorRun("default"), ["simulator_run", { scenario: "default" }]],
    [() => events.datasetLinkClick("limuc"), ["dataset_link_click", { dataset: "limuc" }]],
    [() => events.helpfulVote("understand", "yes"), ["helpful_vote", { page: "understand", helpful: "yes" }]],
    [() => events.journalCreatedEntry(), ["journal_created_entry"]],
    [() => events.journalExport(), ["journal_export"]],
  ])("sends only the agreed fields", (send, expected) => {
    send();
    expect(track).toHaveBeenCalledExactlyOnceWith(...expected);
  });

  it("keeps within the two properties a Pro plan records", () => {
    events.helpfulVote("understand", "no");
    expect(Object.keys(track.mock.calls[0]![1]).length).toBeLessThanOrEqual(2);
  });

  it("is the only way the site sends events", () => {
    for (const file of sources) expect(read(file), file).not.toMatch(/\btrack\s*\(|from "@vercel\/analytics"(?!\/next)/);
  });

  it("can count something once per visit", () => {
    const run = vi.fn();
    const first = once(run);
    first();
    first();
    expect(run).toHaveBeenCalledOnce();
  });
});

describe("analytics scripts", () => {
  it("are mounted once, in the root layout", () => {
    for (const tag of ["<Analytics />", "<SpeedInsights />"]) {
      expect(sources.flatMap((f) => (read(f).includes(tag) ? [f] : []))).toEqual(["app/layout.tsx"]);
      expect(read("app/layout.tsx").split(tag)).toHaveLength(2);
    }
  });
});

describe("privacy page", () => {
  const html = renderToStaticMarkup(<Privacy />);

  it.each([
    "simulator_run",
    "dataset_link_click",
    "helpful_vote",
    "journal_created_entry",
    "journal_export",
  ])("discloses the %s event", (name) => {
    expect(html).toContain(name);
  });

  it("covers speed measurements, the processor, journal content and blocking", () => {
    expect(html).toContain("Speed Insights");
    expect(html).toContain("processed by Vercel");
    expect(html).toMatch(/never.*journal|journal.*never/i);
    expect(html).toContain("/_vercel/");
  });
});

describe("public numbers", () => {
  const filled = { as_of: "2026-12-01", monthly_visitors: 10, github_stars: 0, contributors: 1 };
  const blank = Object.fromEntries(STATS_FIELDS.map(([key]) => [key, `TODO(owner): ${key}`]));

  it("count as available only when every value is real", () => {
    expect(hasStats(filled)).toBe(true);
    expect(hasStats(blank)).toBe(false);
    expect(hasStats({ ...filled, contributors: "TODO(owner): contributors" })).toBe(false);
  });

  it("are computed for reviewed pages rather than typed in", () => {
    expect(renderToStaticMarkup(<Stats />)).toContain("Pages clinically reviewed");
    expect(read("data/stats.json")).not.toContain("reviewed_pages");
  });
});
