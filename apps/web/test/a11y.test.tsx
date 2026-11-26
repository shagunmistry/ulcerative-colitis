import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Search from "../app/search/page";
import Understand from "../app/understand/page";
import { External } from "../components/External";

const read = (file: string) => readFileSync(join(__dirname, "../../..", file), "utf8");

describe("accessibility", () => {
  it("underlines outside links so colour is not the only cue", () => {
    expect(renderToStaticMarkup(<External href="https://example.org">x</External>)).toMatch(/class="[^"]*(?<![:-])underline(?![-:])/);
  });

  it("gives each contents list its own name", () => {
    const names = [...renderToStaticMarkup(<Understand />).matchAll(/<nav aria-label="([^"]+)"/g)].map((m) => m[1]);
    expect(new Set(names).size).toBe(names.length);
  });

  it.each(["apps/web/components/Simulator.tsx", "apps/web/components/LandingPreview.tsx"])(
    "describes the 3D colon in words in %s",
    (file) => {
      expect(read(file)).toContain("describeColon(");
    },
  );

  it("stops the 3D view gliding for people who ask for reduced motion", () => {
    expect(read("packages/viz3d/src/ColonScene.tsx")).toMatch(/enableDamping=\{!reducedMotion\}/);
  });

  it("says that search needs JavaScript", () => {
    expect(renderToStaticMarkup(<Search />)).toContain("<noscript>");
  });
});
