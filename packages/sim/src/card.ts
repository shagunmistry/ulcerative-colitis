import { RATES } from "./index";

export const MODEL_VERSION = "0.1.0";

export const MODEL_CHANGELOG = [
  {
    version: "0.1.0",
    date: "2026-11-24",
    changes: "First version: barrier, microbial exposure, inflammation and extent, with five treatment families.",
  },
];

/** What each constant in RATES does. Adding a constant without a note fails typecheck. */
export const RATE_NOTES: Record<keyof typeof RATES, string> = {
  leak: "How fast microbial exposure rises as the barrier is lost, per day.",
  clearance: "Share of microbial exposure cleared, per day.",
  activation: "How strongly microbial exposure drives inflammation, per day.",
  amplificationBase: "Strength of the self-sustaining immune loop at zero susceptibility, per day.",
  amplificationBySusceptibility: "Extra loop strength at full susceptibility, per day.",
  halfSaturation: "Inflammation level at which the loop works at half strength.",
  resolution: "Share of inflammation that resolves, per day.",
  repair: "Share of lost barrier repaired, per day.",
  repairLossBySusceptibility: "Share of repair lost at full susceptibility.",
  damage: "How strongly inflammation damages the barrier, per day.",
  triggerDays: "How many days a trigger lasts.",
  triggerStrength: "Microbial exposure added per day by a trigger of size 1.",
  spreadThreshold: "Inflammation level above which extent grows and below which it shrinks.",
  spread: "How fast extent grows up the colon above the threshold, per day.",
  retreat: "How fast extent shrinks below the threshold, per day.",
  washoutDays: "How many days a stopped treatment's effect takes to fall to about a third.",
  step: "Time step of the calculation, in days.",
};
