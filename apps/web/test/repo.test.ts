import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { DATASETS, TOPICS } from "@uc/evidence";
import { describe, expect, it } from "vitest";
import { reportUrl } from "../lib";

const root = join(__dirname, "../../..");
const read = (file: string) => readFileSync(join(root, file), "utf8");

describe("open-source files", () => {
  it.each([
    "LICENSE",
    "LICENSE-CONTENT",
    "CONTRIBUTING.md",
    "CODE_OF_CONDUCT.md",
    "docs/CLINICAL_REVIEW.md",
    ".github/pull_request_template.md",
    ".github/ISSUE_TEMPLATE/content-error.yml",
    ".github/ISSUE_TEMPLATE/patient-feedback.yml",
    ".github/ISSUE_TEMPLATE/feature-request.yml",
  ])("include %s", (file) => {
    expect(existsSync(join(root, file))).toBe(true);
  });

  it.each(["content-error", "patient-feedback", "feature-request"])("the %s form warns that issues are public", (name) => {
    expect(read(`.github/ISSUE_TEMPLATE/${name}.yml`)).toMatch(/public[\s\S]*personal health details/i);
  });

  it("offers the roles on the patient feedback form", () => {
    const form = read(".github/ISSUE_TEMPLATE/patient-feedback.yml");
    for (const role of ["I live with UC", "Caregiver", "Clinician", "Researcher"]) expect(form).toContain(role);
    expect(form).toContain("id: page_url");
  });

  it("names every dataset and links the roadmap in the README", () => {
    const readme = read("README.md");
    for (const name of ["LIMUC", "IBDMDB", "HyperKvasir", ...DATASETS.filter((d) => d.id.startsWith("gse")).map((d) => d.id.toUpperCase())]) {
      expect(readme).toContain(name);
    }
    expect(readme).toContain("/commons");
    expect(readme).toContain("img.shields.io");
  });

  it("sends topic reports to the content error form with the page filled in", () => {
    const url = new URL(reportUrl(TOPICS.find((t) => t.id === "fmt")!));
    expect(url.searchParams.get("template")).toBe("content-error.yml");
    expect(url.searchParams.get("page_url")).toBe("https://ulcerative-colitis.vercel.app/treatments/other#fmt");
    expect(read(".github/ISSUE_TEMPLATE/content-error.yml")).toContain("id: page_url");
  });
});
