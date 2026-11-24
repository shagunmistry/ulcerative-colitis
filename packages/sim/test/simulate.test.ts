import { describe, expect, it } from "vitest";
import { DEFAULT_SCENARIO, DEFAULT_STRENGTH, THERAPIES, simulate, type Scenario } from "../src";

const scenario = (patch: Partial<Scenario>): Scenario => ({ ...DEFAULT_SCENARIO, ...patch });
const flare = [{ day: 20, size: 0.7 }];
const last = (xs: number[]) => xs[xs.length - 1]!;

describe("simulate", () => {
  it("returns one sample per day, including day 0", () => {
    const r = simulate(scenario({ days: 100 }));
    expect(r.day).toHaveLength(101);
    expect(r.inflammation).toHaveLength(101);
    expect(r.day[100]).toBe(100);
  });

  it("keeps a colon with no trigger healthy", () => {
    const r = simulate(scenario({ susceptibility: 0.5, triggers: [] }));
    expect(Math.max(...r.inflammation)).toBeLessThan(0.05);
    expect(Math.min(...r.barrier)).toBeGreaterThan(0.95);
    expect(Math.max(...r.extent)).toBe(0);
  });

  it("lets a low-susceptibility colon recover from a trigger", () => {
    const r = simulate(scenario({ susceptibility: 0.1, triggers: flare }));
    expect(Math.max(...r.inflammation)).toBeGreaterThan(0.1);
    expect(last(r.inflammation)).toBeLessThan(0.05);
  });

  it("leaves a high-susceptibility colon stuck in inflammation after the same trigger", () => {
    const r = simulate(scenario({ susceptibility: 0.8, triggers: flare }));
    expect(last(r.inflammation)).toBeGreaterThan(0.4);
    expect(last(r.barrier)).toBeLessThan(0.7);
  });

  it.each(THERAPIES.map((t) => t.id))("%s lowers inflammation compared with no treatment", (id) => {
    const base = scenario({ susceptibility: 0.8, triggers: flare });
    const untreated = simulate(base);
    const treated = simulate({ ...base, treatments: [{ id, strength: 0.7, startDay: 90 }] });
    expect(last(treated.inflammation)).toBeLessThan(last(untreated.inflammation) - 0.02);
  });

  it("has no effect before the treatment starts", () => {
    const base = scenario({ susceptibility: 0.8, triggers: flare });
    const treated = simulate({ ...base, treatments: [{ id: "cytokine", strength: 1, startDay: 90 }] });
    expect(treated.inflammation.slice(0, 91)).toEqual(simulate(base).inflammation.slice(0, 91));
  });

  it("can relapse when a treatment is stopped before the lining has healed", () => {
    const base = scenario({ susceptibility: 0.8, triggers: flare });
    const r = simulate({ ...base, treatments: [{ id: "cytokine", strength: 0.9, startDay: 90, stopDay: 120 }] });
    expect(r.inflammation[120]).toBeLessThan(r.inflammation[90]!);
    expect(last(r.inflammation)).toBeGreaterThan(0.4);
  });

  it("reaches remission with strong sustained treatment", () => {
    const r = simulate(
      scenario({ susceptibility: 0.8, triggers: flare, treatments: [{ id: "cytokine", strength: 1, startDay: 60 }] }),
    );
    expect(last(r.inflammation)).toBeLessThan(0.1);
    expect(last(r.barrier)).toBeGreaterThan(0.85);
  });

  it("visibly heals the default colon when a cytokine blocker is added at its default strength", () => {
    const r = simulate(
      scenario({ treatments: [{ id: "cytokine", strength: DEFAULT_STRENGTH, startDay: 150 }] }),
    );
    expect(last(r.inflammation)).toBeLessThan(0.1);
    expect(last(r.extent)).toBeLessThan(r.extent[150]! / 2);
  });

  it("spreads upward from the rectum while inflamed, then retreats with healing", () => {
    const base = scenario({ susceptibility: 0.8, triggers: flare });
    const untreated = simulate(base);
    expect(untreated.extent[40]).toBeLessThan(last(untreated.extent));
    const healed = simulate({ ...base, treatments: [{ id: "cytokine", strength: 1, startDay: 150 }] });
    expect(last(healed.extent)).toBeLessThan(healed.extent[150]!);
  });

  it("stays finite and within 0..1 at extreme settings", () => {
    const r = simulate({
      days: 730,
      susceptibility: 1,
      triggers: [{ day: 0, size: 1 }, { day: 0, size: 1 }, { day: 400, size: 1 }],
      treatments: THERAPIES.map((t) => ({ id: t.id, strength: 1, startDay: 0 })),
    });
    for (const series of [r.barrier, r.microbes, r.inflammation, r.extent]) {
      for (const v of series) {
        expect(Number.isFinite(v)).toBe(true);
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(1);
      }
    }
  });

  it("clamps out-of-range inputs", () => {
    const wild = simulate(scenario({ susceptibility: 9, triggers: [{ day: 20, size: 50 }] }));
    const max = simulate(scenario({ susceptibility: 1, triggers: [{ day: 20, size: 1 }] }));
    expect(wild).toEqual(max);
  });

  it("describes every therapy and links it to at least one source", () => {
    for (const t of THERAPIES) {
      expect(t.name.length).toBeGreaterThan(0);
      expect(t.mechanism.length).toBeGreaterThan(40);
      expect(t.sourceIds.length).toBeGreaterThan(0);
    }
  });
});
