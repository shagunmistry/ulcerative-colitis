import { MODEL_VERSION, RATES, THERAPIES, DEFAULT_SCENARIO, DEFAULT_STRENGTH } from "@uc/sim";
import { DRAWING, SEGMENTS } from "@uc/viz3d";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import pkg from "../../../packages/sim/package.json";
import Model from "../app/simulator/model/page";
import SimulatorPage from "../app/simulator/page";
import { REDIRECTS } from "../redirects.mjs";
import { SIM_UI } from "../simulator-settings";

vi.mock("../components/Simulator", () => ({ Simulator: () => null }));

const html = renderToStaticMarkup(<Model />);
/** The value and source shown for one named parameter. */
const row = (name: string) => {
  const found = new RegExp(`<tr data-param="${name}"[^>]*>(.*?)</tr>`).exec(html);
  expect(found, `no row for ${name}`).not.toBeNull();
  return found![1]!;
};

const parameters: [string, number | string][] = [
  ...Object.entries(RATES),
  ...THERAPIES.flatMap((t): [string, number][] => [
    [`${t.id}.onsetDays`, t.onsetDays],
    ...Object.entries(t.effect).map(([k, v]): [string, number] => [`${t.id}.${k}`, v]),
  ]),
  ["DEFAULT_STRENGTH", DEFAULT_STRENGTH],
  ["scenario.days", DEFAULT_SCENARIO.days],
  ["scenario.susceptibility", DEFAULT_SCENARIO.susceptibility],
  ["scenario.triggerDay", DEFAULT_SCENARIO.triggers[0]!.day],
  ["scenario.triggerSize", DEFAULT_SCENARIO.triggers[0]!.size],
  ...Object.entries(DRAWING).map(([k, v]): [string, string] => [`drawing.${k}`, String(v)]),
  ...SEGMENTS.map((s): [string, number] => [`segment.${s.name}`, s.end]),
  ...Object.entries(SIM_UI).map(([k, v]): [string, number] => [`ui.${k}`, v]),
];

describe("model card", () => {
  it.each(parameters)("lists %s with its value and where it came from", (name, value) => {
    const cells = row(name);
    expect(cells).toContain(String(value));
    expect(cells).toMatch(/Chosen by hand|href=/);
  });

  it("says once, plainly, that no number comes from a study, and leaves no to-dos", () => {
    expect(html).toContain("None of the numbers on this page was taken from a published study or fitted to data.");
    expect(html).not.toContain("TODO(owner)");
  });

  it("cites the extent classification it names", () => {
    expect(html).toContain("https://pubmed.ncbi.nlm.nih.gov/16698746/");
  });

  it("covers state, limits, why it cannot predict, and its history", () => {
    for (const heading of [
      "What the model represents",
      "State variables",
      "Equations",
      "What is missing",
      "Why this is not a prediction tool",
      "Version and changes",
    ]) {
      expect(html).toContain(heading);
    }
    expect(html).toContain(MODEL_VERSION);
  });

  it("carries the same version as the model's package", () => {
    expect(MODEL_VERSION).toBe(pkg.version);
  });

  it("is linked beside the teaching-model label and reachable at the model-card address", () => {
    const simulator = renderToStaticMarkup(<SimulatorPage />);
    expect(simulator).toMatch(/teaching model.*href="\/simulator\/model"[^>]*>Model card/);
    expect(REDIRECTS).toContainEqual({ source: "/simulator/model-card", destination: "/simulator/model", permanent: true });
  });
});
