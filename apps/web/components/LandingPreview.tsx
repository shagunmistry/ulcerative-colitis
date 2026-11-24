"use client";

import { DEFAULT_SCENARIO, DEFAULT_STRENGTH, simulate } from "@uc/sim";
import { montrealExtent } from "@uc/viz3d";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SceneBoundary } from "./SceneBoundary";

const ColonScene = dynamic(() => import("@uc/viz3d/scene"), {
  ssr: false,
  loading: () => <p className="p-5 text-sm text-[var(--ink-soft)]">Loading the 3D view…</p>,
});

const TREATMENT_DAY = 150;
const RESULT = simulate({
  ...DEFAULT_SCENARIO,
  treatments: [{ id: "cytokine", strength: DEFAULT_STRENGTH, startDay: TREATMENT_DAY }],
});
const DAYS = DEFAULT_SCENARIO.days;

export function LandingPreview() {
  const [day, setDay] = useState(TREATMENT_DAY);
  const [playing, setPlaying] = useState(false);

  // Starts moving only for people who have not asked for reduced motion.
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDay(0);
      setPlaying(true);
    }
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setDay((d) => (d >= DAYS ? 0 : d + 1)), 40);
    return () => clearInterval(timer);
  }, [playing]);

  return (
    <figure className="panel">
      <div className="relative h-[20rem] sm:h-[26rem]">
        <SceneBoundary>
          <ColonScene extent={RESULT.extent[day]!} inflammation={RESULT.inflammation[day]!} />
        </SceneBoundary>
        <p className="slug pointer-events-none absolute right-4 top-3 text-[var(--signal)]">Simulated</p>
      </div>
      <figcaption className="flex items-center justify-between gap-4 border-t border-[var(--rule)] p-4">
        <span className="text-sm">
          <span className="block">{montrealExtent(RESULT.extent[day]!, RESULT.inflammation[day]!)}</span>
          <span className="text-[var(--ink-soft)]">
            Day <span className="timecode">{day}</span>
            {day >= TREATMENT_DAY ? ", treatment added" : ", no treatment"}
          </span>
        </span>
        <button className="button w-20" onClick={() => setPlaying(!playing)}>
          {playing ? "Pause" : "Play"}
        </button>
      </figcaption>
    </figure>
  );
}
