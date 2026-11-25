import { TOPICS } from "@uc/evidence";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Privacy from "../app/privacy/page";
import { Topic } from "../components/Topic";
import { reportUrl } from "../lib";

const topic = TOPICS.find((t) => t.id === "fmt")!;

describe("feedback", () => {
  it("opens a GitHub issue that names the topic", () => {
    const url = new URL(reportUrl(topic));
    expect(url.origin + url.pathname).toBe("https://github.com/shagunmistry/ulcerative-colitis/issues/new");
    expect(url.searchParams.get("title")).toBe("Feedback: Faecal microbiota transplant");
    expect(url.searchParams.get("body")).toContain("https://ulcerative-colitis.vercel.app/treatments/other#fmt");
    expect(url.searchParams.get("body")).toMatch(/public.*health/i);
  });

  it("offers that link on each topic instead of votes that nobody receives", () => {
    const html = renderToStaticMarkup(<Topic topic={topic} />);
    expect(html).toContain("Report a problem with this topic");
    expect(html).toContain("/issues/new?title=");
    expect(html).not.toContain("Was this clear?");
  });

  it("warns that reports are public", () => {
    expect(renderToStaticMarkup(<Topic topic={topic} />)).toContain("public, so leave out health details");
  });
});

describe("privacy page", () => {
  it("says copies of pages are saved on the device", () => {
    const html = renderToStaticMarkup(<Privacy />);
    expect(html).toContain("copies of pages");
    expect(html).toContain("offline");
  });
});
