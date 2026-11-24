import { describe, expect, it } from "vitest";
import { REDIRECTS } from "../redirects.mjs";

describe("redirects", () => {
  it("sends every old address to its new page", () => {
    expect(REDIRECTS.map((r) => [r.source, r.destination])).toEqual([
      ["/causes", "/understand"],
      ["/alternatives", "/treatments/other"],
      ["/model", "/simulator/model"],
      ["/learn", "/understand"],
      ["/learn/about-uc", "/understand"],
      ["/learn/living-with-uc", "/understand"],
      ["/learn/treatments", "/treatments"],
      ["/terms", "/disclaimer"],
      ["/resources/emergency", "/disclaimer"],
      ["/resources/:path*", "/"],
      ["/tools/:path*", "/"],
    ]);
  });

  it("is permanent and never chains", () => {
    const sources = new Set(REDIRECTS.map((r) => r.source));
    for (const r of REDIRECTS) {
      expect(r.permanent).toBe(true);
      expect(sources.has(r.destination)).toBe(false);
    }
  });
});
