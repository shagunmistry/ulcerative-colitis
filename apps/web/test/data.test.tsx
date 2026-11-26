import { DATASETS, LINKS, copyUrl, loadSnippet, type Dataset } from "@uc/evidence";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import Data from "../app/data/page";
import Home from "../app/page";
import { GET, dynamic } from "../app/data/datasets.json/route";
import { DatasetList } from "../components/DatasetList";
import { Header } from "../components/Header";

vi.mock("next/navigation", () => ({ usePathname: () => "/data" }));

/** Undoes React's escaping, so text can be compared with the data. */
const decode = (html: string) =>
  html.replaceAll("&quot;", '"').replaceAll("&#x27;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");

const render = (datasets: Dataset[]) => decode(renderToStaticMarkup(<DatasetList datasets={datasets} />));

const byId = (id: string) => DATASETS.find((d) => d.id === id)!;

describe("dataset list", () => {
  it("puts every dataset in the server HTML with its details", () => {
    const html = render(DATASETS);
    for (const d of DATASETS) {
      expect(html).toContain(`id="${d.id}"`);
      for (const text of [d.title, d.publisher, d.summary, d.size, d.licence, d.citation, d.checkedOn, d.url])
        expect(html, d.id).toContain(text);
    }
    for (const label of ["Licence", "How to cite", "Last checked"])
      expect(html.split(`>${label}<`).length - 1, label).toBe(DATASETS.length);
  });

  it("offers type and access filters as toggle buttons, starting at All", () => {
    const html = render(DATASETS);
    const buttons = [...html.matchAll(/<button[^>]*aria-pressed="(true|false)"[^>]*>([^<]+)<\/button>/g)];
    expect(buttons.map((b) => b[2])).toEqual([
      "All",
      "Images",
      "Gene expression",
      "Microbiome",
      "Clinical",
      "Other",
      "All",
      "Open",
      "Registration",
      "Application",
    ]);
    expect(buttons.filter((b) => b[1] === "true").map((b) => b[2])).toEqual(["All", "All"]);
  });

  it("says when nothing matches", () => {
    expect(render([])).toContain("No datasets match these filters.");
    expect(render(DATASETS)).not.toContain("No datasets match");
  });

  it("links to the terms, or says none are stated", () => {
    const stated = render([byId("limuc")]);
    expect(stated).toMatch(new RegExp(`<a href="${byId("limuc").termsUrl}"[^>]*>Terms<`));
    expect(stated).not.toContain("Terms: Not stated");
    const missing = render([byId("ibdmdb")]);
    expect(missing).toContain("Terms: Not stated");
    expect(missing).not.toMatch(/>Terms</);
  });

  it("shows unstated access in words", () => {
    expect(render([byId("ibdmdb")])).toMatch(/>Access<\/dt><dd[^>]*>Not stated</);
  });

  it("offers each copy with its load code, origin and differences", () => {
    const dataset = byId("limuc");
    const copy = dataset.copies[0]!;
    const html = render([dataset]);
    expect(html).toContain("Get it on");
    expect(html).toContain(copyUrl(copy));
    expect(html).toContain(loadSnippet(copy));
    expect(html).toMatch(/<pre[^>]*overflow-x-auto/);
    // A box that takes keyboard focus needs a role and a name.
    const pre = /<pre[^>]*>/.exec(html)![0];
    expect(pre).toContain('tabindex="0"');
    expect(pre).toContain('role="region"');
    expect(pre).toContain(`aria-label="Load code for ${copy.id} on ${copy.host}"`);
    expect(html).toContain("Not named by the authors as the release");
    expect(html).not.toContain("Original release");
    expect(html).toContain(copy.note);
    const original = render([{ ...dataset, copies: [{ ...copy, original: true }] }]);
    expect(original).toContain("Original release");
    expect(original).not.toContain("Not named by the authors as the release");
  });

  it("has no copy section for a dataset without copies", () => {
    expect(render([byId("ibdmdb")])).not.toContain("Get it on");
  });

  it("always shows access restrictions, between the licence and the copies", () => {
    const dataset = byId("hyperkvasir");
    const html = render([dataset]);
    const note = html.indexOf(dataset.accessNote!);
    expect(note).toBeGreaterThan(html.indexOf(dataset.licence));
    expect(note).toBeLessThan(html.indexOf("Get it on"));
    expect(html).not.toContain("<details");
    expect(html).not.toContain("hidden");
  });

  it("shows outside text as text, never as markup", () => {
    const html = renderToStaticMarkup(
      <DatasetList datasets={[{ ...byId("limuc"), summary: '<img src="x">' }]} />,
    );
    expect(html).not.toContain("<img");
  });
});

describe("data page", () => {
  const html = decode(renderToStaticMarkup(<Data />));

  it("has datasets, key papers, and registries and tools", () => {
    expect([...html.matchAll(/<h2[^>]*>([^<]+)<\/h2>/g)].map((m) => m[1])).toEqual([
      "Datasets",
      "Key papers",
      "Registries and tools",
    ]);
    for (const d of DATASETS) expect(html).toContain(`id="${d.id}"`);
    expect(html).toContain("https://pubmed.ncbi.nlm.nih.gov/");
    for (const link of LINKS) {
      if (link.kind === "registry") expect(html).toContain(link.url);
      else expect(html).not.toContain(link.url);
    }
  });

  it("links to the machine-readable copy", () => {
    expect(html).toContain('href="/data/datasets.json"');
  });
});

describe("ways to the data library", () => {
  it("is in the top bar, marked as the current page", () => {
    const html = renderToStaticMarkup(<Header />);
    const items = [...html.matchAll(/<li><a ([^>]*)>([^<]+)<\/a><\/li>/g)];
    expect(items.map((m) => m[2])).toEqual(["Understand", "Treatments", "Simulator", "Data", "About", "Search"]);
    const data = items[3]![1]!;
    expect(data).toContain('href="/data"');
    expect(data).toContain('aria-current="page"');
  });

  it("wraps the top bar rather than scrolling sideways", () => {
    const list = /<ul class="([^"]*)"/.exec(renderToStaticMarkup(<Header />))![1]!;
    expect(list.split(" ")).toContain("flex-wrap");
  });

  it("is linked from the landing page", () => {
    expect(renderToStaticMarkup(<Home />)).toMatch(/Work with the data<\/h2>.*href="\/data"/);
  });
});

describe("datasets.json", () => {
  it("serves the whole list, built ahead of time", async () => {
    expect(dynamic).toBe("force-static");
    expect(await GET().json()).toEqual({ datasets: DATASETS });
  });
});
