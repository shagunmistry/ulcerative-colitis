import { describe, expect, it } from "vitest";
import { involvement, montrealExtent, mucosaState, segmentAt, tissueColor } from "../src/anatomy";

describe("segmentAt", () => {
  it("runs from rectum to cecum", () => {
    expect(segmentAt(0).name).toBe("Rectum");
    expect(segmentAt(0.45).name).toBe("Descending colon");
    expect(segmentAt(1).name).toBe("Cecum");
  });
});

describe("involvement", () => {
  it("is zero everywhere in a quiet colon", () => {
    expect(involvement(0, 0.8, 0.01)).toBe(0);
  });

  it("involves the rectum whenever there is inflammation, even before it spreads", () => {
    expect(involvement(0.01, 0, 0.5)).toBeGreaterThan(0.4);
  });

  it("is continuous from the rectum up to the extent and fades out above it", () => {
    expect(involvement(0.2, 0.4, 0.6)).toBeCloseTo(0.6);
    expect(involvement(0.9, 0.4, 0.6)).toBe(0);
  });
});

describe("montrealExtent", () => {
  it.each([
    [0, 0.01, "No active inflammation"],
    [0.05, 0.5, "E1, proctitis"],
    [0.4, 0.5, "E2, left-sided colitis"],
    [0.8, 0.5, "E3, extensive colitis"],
  ])("extent %s at inflammation %s reads as %s", (extent, inflammation, label) => {
    expect(montrealExtent(extent, inflammation)).toBe(label);
  });
});

describe("tissueColor", () => {
  it("gets less green (redder) as intensity rises, and clamps", () => {
    expect(tissueColor(1)[1]).toBeLessThan(tissueColor(0)[1]);
    expect(tissueColor(5)).toEqual(tissueColor(1));
  });
});

describe("mucosaState", () => {
  it("shows an intact lining when healthy", () => {
    expect(mucosaState({ barrier: 1, microbes: 0, inflammation: 0 })).toEqual({
      mucusThickness: 1,
      gaps: 0,
      bacteriaInside: 0,
      immuneCells: 4,
    });
  });

  it("thins mucus, opens gaps and recruits immune cells when inflamed", () => {
    const s = mucosaState({ barrier: 0.5, microbes: 0.1, inflammation: 0.6 });
    expect(s.mucusThickness).toBeLessThan(0.5);
    expect(s.gaps).toBeGreaterThan(0);
    expect(s.bacteriaInside).toBeGreaterThan(0);
    expect(s.immuneCells).toBeGreaterThan(20);
  });
});
