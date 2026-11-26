import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { classify, fixedLinks, missingDates, undatedPages } from "../../../pipelines/citations.mjs";

describe("citation check", () => {
  it.each([
    [{ status: 200 }, "ok"],
    [{ status: 404 }, "broken"],
    [{ status: 410 }, "broken"],
    [{ error: "ENOTFOUND" }, "broken"],
    [{ status: 403 }, "unsure"],
    [{ status: 429 }, "unsure"],
    [{ status: 503 }, "unsure"],
    [{ error: "TimeoutError" }, "unsure"],
  ])("treats %j as %s", (result, verdict) => {
    expect(classify(result)).toBe(verdict);
  });

  it("flags records with no usable checked date", () => {
    const records = [{ path: "/a", checkedOn: "2026-11-26" }, { path: "/b", checkedOn: "" }, { id: "c" }];
    expect(missingDates(records)).toEqual(["/b", "c"]);
  });

  it("flags a page that shows citations but is not in the dated page list", () => {
    const pages = [
      { path: "/understand", source: "<TopicList topics={t} />" },
      { path: "/new", source: "<Cite ids={ids} />" },
      { path: "/privacy", source: "<External href='x' />" },
      { path: "/disclaimer", source: "<UrgentCare />" },
    ];
    expect(undatedPages(pages, ["/understand"])).toEqual(["/new"]);
  });

  it("finds addresses written into pages, leaving out the project's own and examples", () => {
    const source = `href="https://vercel.com/docs" url: "https://example.org/x" "https://github.com/shagunmistry/ulcerative-colitis/blob/main/a" const u = \`https://x.test/\${id}\``;
    expect(fixedLinks(source)).toEqual(["https://vercel.com/docs"]);
  });

  it("runs from the root and on pull requests", () => {
    const root = join(__dirname, "../../..");
    expect(JSON.parse(readFileSync(join(root, "package.json"), "utf8")).scripts["check:citations"]).toContain("check-citations");
    const workflow = readFileSync(join(root, ".github/workflows/ci.yml"), "utf8");
    expect(workflow).toContain("pull_request");
    expect(workflow).toContain("check:citations");
  });
});
