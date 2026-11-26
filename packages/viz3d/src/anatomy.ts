/** Positions along the colon run from 0 (end of the rectum) to 1 (cecum). */

const clamp = (x: number) => Math.min(1, Math.max(0, x));

export interface Segment {
  name: string;
  end: number;
}

export const SEGMENTS: Segment[] = [
  { name: "Rectum", end: 0.12 },
  { name: "Sigmoid colon", end: 0.34 },
  { name: "Descending colon", end: 0.52 },
  { name: "Transverse colon", end: 0.8 },
  { name: "Ascending colon", end: 0.93 },
  { name: "Cecum", end: 1 },
];

export const segmentAt = (s: number) => SEGMENTS.find((x) => s <= x.end) ?? SEGMENTS[SEGMENTS.length - 1]!;

/** Numbers that turn the model's values into a picture. Listed on the model card. */
export const DRAWING = {
  /** below this inflammation the colon is drawn and described as quiet */
  quietBelow: 0.05,
  /** the least of the colon involved once there is any inflammation */
  minReach: 0.07,
  /** length over which involvement fades out above the extent */
  fadeLength: 0.08,
  /** ulcer patches: noise level where they start at no intensity, and how much intensity lowers it */
  ulcerEdge: 0.75,
  ulcerEdgeFall: 0.65,
  ulcerSoftness: 0.25,
  /** intensity below which no ulcer patches show */
  ulcerFrom: 0.3,
  /** mucus thickness is barrier integrity raised to this power */
  mucusPower: 2,
  /** open gaps drawn in a fully lost barrier */
  maxGaps: 10,
  /** microbial exposure is multiplied by this before bacteria are drawn */
  bacteriaGain: 5,
  maxBacteria: 24,
  restingImmuneCells: 4,
  extraImmuneCells: 44,
};

/** Inflammation intensity at one position: continuous upward from the rectum. */
export function involvement(s: number, extent: number, inflammation: number): number {
  if (inflammation < DRAWING.quietBelow) return 0;
  const reach = Math.max(extent, DRAWING.minReach);
  return clamp(inflammation) * clamp((reach + DRAWING.fadeLength - s) / DRAWING.fadeLength);
}

/** Montreal classification of disease extent (E1 to E3). */
export function montrealExtent(extent: number, inflammation: number): string {
  if (inflammation < DRAWING.quietBelow) return "No active inflammation";
  const reach = Math.max(extent, DRAWING.minReach);
  if (reach <= SEGMENTS[0]!.end) return "E1, proctitis";
  // E2 stops at the splenic flexure, the top of the descending colon.
  if (reach <= SEGMENTS[2]!.end) return "E2, left-sided colitis";
  return "E3, extensive colitis";
}

export type RGB = [number, number, number];

const STOPS: RGB[] = [
  [0.86, 0.6, 0.55], // healthy pink mucosa
  [0.78, 0.28, 0.24], // red, swollen
  [0.42, 0.04, 0.05], // raw, ulcerated
];

export function tissueColor(intensity: number): RGB {
  const x = clamp(intensity) * (STOPS.length - 1);
  const i = Math.min(Math.floor(x), STOPS.length - 2);
  const f = x - i;
  return STOPS[i]!.map((c, k) => c + (STOPS[i + 1]![k]! - c) * f) as RGB;
}

export interface MucosaState {
  /** 0..1 of healthy thickness */
  mucusThickness: number;
  gaps: number;
  bacteriaInside: number;
  immuneCells: number;
}

/** What to draw in the magnified view of the lining. */
export function mucosaState(v: { barrier: number; microbes: number; inflammation: number }): MucosaState {
  const barrier = clamp(v.barrier);
  return {
    // Rounding error must not make a healthy barrier look thinned.
    mucusThickness: barrier ** DRAWING.mucusPower > 0.999 ? 1 : barrier ** DRAWING.mucusPower,
    gaps: Math.round((1 - barrier) * DRAWING.maxGaps),
    bacteriaInside: Math.round(clamp(v.microbes * DRAWING.bacteriaGain) * DRAWING.maxBacteria),
    immuneCells: DRAWING.restingImmuneCells + Math.round(clamp(v.inflammation) * DRAWING.extraImmuneCells),
  };
}
