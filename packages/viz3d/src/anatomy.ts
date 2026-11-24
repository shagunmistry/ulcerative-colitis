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

const QUIET = 0.05;
const MIN_REACH = 0.07;
const EDGE = 0.08;

/** Inflammation intensity at one position: continuous upward from the rectum. */
export function involvement(s: number, extent: number, inflammation: number): number {
  if (inflammation < QUIET) return 0;
  const reach = Math.max(extent, MIN_REACH);
  return clamp(inflammation) * clamp((reach + EDGE - s) / EDGE);
}

/** Montreal classification of disease extent (E1 to E3). */
export function montrealExtent(extent: number, inflammation: number): string {
  if (inflammation < QUIET) return "No active inflammation";
  const reach = Math.max(extent, MIN_REACH);
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
    mucusThickness: barrier ** 2 > 0.999 ? 1 : barrier ** 2,
    gaps: Math.round((1 - barrier) * 10),
    bacteriaInside: Math.round(clamp(v.microbes * 5) * 24),
    immuneCells: 4 + Math.round(clamp(v.inflammation) * 44),
  };
}
