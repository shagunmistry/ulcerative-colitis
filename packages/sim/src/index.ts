/**
 * A deliberately small teaching model of ulcerative colitis.
 *
 * It is ILLUSTRATIVE: the equations encode a qualitative story from the literature
 * (barrier loss, microbial exposure, self-sustaining immune activation), but the
 * rate constants are chosen to produce readable behaviour. They are not fitted to
 * patient data and nothing here predicts anyone's disease or response to treatment.
 *
 * State, all on a 0..1 scale:
 *   B  barrier integrity (mucus and epithelium)
 *   M  microbial exposure of the tissue
 *   I  immune inflammation
 *   E  extent: how far up the colon from the rectum
 */

export type TherapyId = "aminosalicylate" | "corticosteroid" | "cytokine" | "trafficking" | "microbial";

export interface Treatment {
  id: TherapyId;
  /** 0..1, an abstract effect size, not a dose */
  strength: number;
  startDay: number;
  stopDay?: number;
}

export interface Trigger {
  day: number;
  /** 0..1 */
  size: number;
}

export interface Scenario {
  days: number;
  /** 0..1: genetic and environmental tendency for inflammation to sustain itself */
  susceptibility: number;
  triggers: Trigger[];
  treatments: Treatment[];
}

export interface SimulationResult {
  day: number[];
  barrier: number[];
  microbes: number[];
  inflammation: number[];
  extent: number[];
}

/** Multipliers a therapy applies to the model's rates at full effect. 1 = unchanged. */
interface Effect {
  amplification?: number;
  activation?: number;
  resolution?: number;
  repair?: number;
  leak?: number;
}

export interface Therapy {
  id: TherapyId;
  name: string;
  examples: string;
  mechanism: string;
  /** days for roughly two thirds of the effect to build up */
  onsetDays: number;
  effect: Effect;
  sourceIds: string[];
}

export const THERAPIES: Therapy[] = [
  {
    id: "aminosalicylate",
    name: "5-ASA",
    examples: "mesalamine, sulfasalazine",
    mechanism:
      "Acts mainly on the lining itself. In this model it mildly damps inflammation and helps the barrier repair.",
    onsetDays: 14,
    effect: { amplification: 0.75, repair: 1.5 },
    sourceIds: ["cochrane-5asa-induction", "cochrane-5asa-maintenance"],
  },
  {
    id: "corticosteroid",
    name: "Corticosteroids",
    examples: "prednisone, budesonide",
    mechanism:
      "Broad, fast immune suppression, used short term because of side effects. In this model it acts within days but slightly slows repair.",
    onsetDays: 3,
    effect: { amplification: 0.2, resolution: 1.4, repair: 0.7 },
    sourceIds: ["acg-2025"],
  },
  {
    id: "cytokine",
    name: "Cytokine signal blockers",
    examples: "anti-TNF, anti-IL-23, JAK inhibitors",
    mechanism:
      "Block the chemical messages immune cells use to keep each other switched on. In this model they weaken the self-sustaining loop.",
    onsetDays: 10,
    effect: { amplification: 0.15, activation: 0.5 },
    sourceIds: ["aga-2024", "act-infliximab", "lucent-mirikizumab", "octave-tofacitinib"],
  },
  {
    id: "trafficking",
    name: "Immune cell traffic blockers",
    examples: "vedolizumab, ozanimod, etrasimod",
    mechanism:
      "Keep circulating lymphocytes from reaching the gut. In this model they shrink the self-sustaining loop, building up more slowly.",
    onsetDays: 30,
    effect: { amplification: 0.3 },
    sourceIds: ["gemini-vedolizumab", "truenorth-ozanimod", "elevate-etrasimod"],
  },
  {
    id: "microbial",
    name: "Microbiome-directed approaches",
    examples: "probiotics, faecal microbiota transplant",
    mechanism:
      "Aim to change which microbes meet the lining. Human evidence is weak or early; the effect shown here is a hypothesis, not a measured result.",
    onsetDays: 30,
    effect: { leak: 0.5, repair: 1.3, resolution: 1.2 },
    sourceIds: ["cochrane-probiotics-induction", "aga-fmt-2024", "fmt-paramsothy"],
  },
];

/** Starting strength when a treatment is switched on. Chosen for legibility only. */
export const DEFAULT_STRENGTH = 0.85;

export const DEFAULT_SCENARIO: Scenario = {
  days: 365,
  susceptibility: 0.7,
  triggers: [{ day: 20, size: 0.7 }],
  treatments: [],
};

export const RATES = {
  leak: 0.1,
  clearance: 0.5,
  activation: 0.3,
  amplificationBase: 0.04,
  amplificationBySusceptibility: 0.24,
  halfSaturation: 0.3,
  resolution: 0.12,
  repair: 0.1,
  repairLossBySusceptibility: 0.4,
  damage: 0.08,
  triggerDays: 10,
  triggerStrength: 0.25,
  spreadThreshold: 0.15,
  spread: 0.025,
  retreat: 0.3,
  washoutDays: 14,
  step: 0.1,
} as const;

const clamp = (x: number) => Math.min(1, Math.max(0, x));

/** Fraction (0..strength) of a treatment's full effect present at time t. */
function exposure(t: number, tr: Treatment, onsetDays: number): number {
  if (t < tr.startDay) return 0;
  const stop = tr.stopDay ?? Infinity;
  const buildUp = 1 - Math.exp(-(Math.min(t, stop) - tr.startDay) / onsetDays);
  const washout = t > stop ? Math.exp(-(t - stop) / RATES.washoutDays) : 1;
  return clamp(tr.strength) * buildUp * washout;
}

function modifiers(t: number, treatments: Treatment[]): Required<Effect> {
  const m = { amplification: 1, activation: 1, resolution: 1, repair: 1, leak: 1 };
  for (const tr of treatments) {
    const therapy = THERAPIES.find((x) => x.id === tr.id)!;
    const e = exposure(t, tr, therapy.onsetDays);
    for (const [key, full] of Object.entries(therapy.effect) as [keyof Effect, number][]) {
      m[key] *= 1 + (full - 1) * e;
    }
  }
  return m;
}

export function simulate(scenario: Scenario): SimulationResult {
  const days = Math.max(0, Math.round(scenario.days));
  const s = clamp(scenario.susceptibility);
  const stepsPerDay = Math.round(1 / RATES.step);
  const dt = 1 / stepsPerDay;

  let B = 1;
  let M = 0;
  let I = 0;
  let E = 0;
  const result: SimulationResult = { day: [0], barrier: [B], microbes: [M], inflammation: [I], extent: [E] };

  for (let d = 0; d < days; d++) {
    for (let k = 0; k < stepsPerDay; k++) {
      const t = d + k * dt;
      const m = modifiers(t, scenario.treatments);
      const trigger = scenario.triggers.reduce(
        (sum, g) => (t >= g.day && t < g.day + RATES.triggerDays ? sum + clamp(g.size) * RATES.triggerStrength : sum),
        0,
      );

      const amplification = (RATES.amplificationBase + RATES.amplificationBySusceptibility * s) * m.amplification;
      const loop = (I * I) / (RATES.halfSaturation ** 2 + I * I);

      const dM = RATES.leak * m.leak * (1 - B) + trigger - RATES.clearance * M;
      const dI =
        (RATES.activation * m.activation * M + amplification * loop) * (1 - I) - RATES.resolution * m.resolution * I;
      const dB = RATES.repair * (1 - RATES.repairLossBySusceptibility * s) * m.repair * (1 - B) - RATES.damage * I * B;
      const over = I - RATES.spreadThreshold;
      const dE = over > 0 ? RATES.spread * over * (1 - E) : RATES.retreat * over * E;

      M = clamp(M + dt * dM);
      I = clamp(I + dt * dI);
      B = clamp(B + dt * dB);
      E = clamp(E + dt * dE);
    }
    result.day.push(d + 1);
    result.barrier.push(B);
    result.microbes.push(M);
    result.inflammation.push(I);
    result.extent.push(E);
  }
  return result;
}
export * from "./card";
