"use client";

import { DEFAULT_SCENARIO, DEFAULT_STRENGTH, simulate, THERAPIES, type TherapyId, type Treatment } from "@uc/sim";
import { montrealExtent } from "@uc/viz3d";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { events, once } from "@/analytics";
import { Mucosa } from "./Mucosa";
import { SceneBoundary } from "./SceneBoundary";
import { Timeline } from "./Timeline";

const ColonScene = dynamic(() => import("@uc/viz3d/scene"), {
  ssr: false,
  loading: () => <p className="p-5 text-sm text-[var(--ink-soft)]">Loading the 3D view…</p>,
});

const START_DAY = 150;
const DAYS_PER_SECOND = 30;

function Slider(props: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex justify-between gap-3 text-sm">
        {props.label}
        <span className="timecode">{props.display}</span>
      </span>
      <input
        type="range"
        className="mt-1 w-full"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
      />
    </label>
  );
}

const percent = (v: number) => `${Math.round(v * 100)}%`;

export function Simulator() {
  const [susceptibility, setSusceptibility] = useState(DEFAULT_SCENARIO.susceptibility);
  const [triggerSize, setTriggerSize] = useState(DEFAULT_SCENARIO.triggers[0]!.size);
  const [triggerDay, setTriggerDay] = useState(DEFAULT_SCENARIO.triggers[0]!.day);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [day, setDay] = useState(START_DAY);
  const [playing, setPlaying] = useState(false);
  const [segment, setSegment] = useState<string | null>(null);
  // Counted once per visit, when someone first runs or changes the starting scenario.
  const [countRun] = useState(() => once(() => events.simulatorRun("default")));

  const days = DEFAULT_SCENARIO.days;
  const result = useMemo(
    () => simulate({ days, susceptibility, triggers: [{ day: triggerDay, size: triggerSize }], treatments }),
    [days, susceptibility, triggerDay, triggerSize, treatments],
  );

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setDay((d) => Math.min(days, d + 1)), 1000 / DAYS_PER_SECOND);
    return () => clearInterval(timer);
  }, [playing, days]);

  useEffect(() => {
    if (day >= days) setPlaying(false);
  }, [day, days]);

  /** Passes a control's new value on, and counts the run. */
  const run =
    <T,>(set: (value: T) => void) =>
    (value: T) => {
      countRun();
      set(value);
    };

  const update = (id: TherapyId, patch: Partial<Treatment>) =>
    setTreatments((list) => list.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const toggle = (id: TherapyId, on: boolean) =>
    setTreatments((list) =>
      on ? [...list, { id, strength: DEFAULT_STRENGTH, startDay: day < days ? day : 90 }] : list.filter((t) => t.id !== id),
    );

  const reset = () => {
    setSusceptibility(DEFAULT_SCENARIO.susceptibility);
    setTriggerSize(DEFAULT_SCENARIO.triggers[0]!.size);
    setTriggerDay(DEFAULT_SCENARIO.triggers[0]!.day);
    setTreatments([]);
    setDay(START_DAY);
    setPlaying(false);
  };

  const now = {
    barrier: result.barrier[day]!,
    microbes: result.microbes[day]!,
    inflammation: result.inflammation[day]!,
    extent: result.extent[day]!,
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="min-w-0 space-y-6">
        <section aria-label="3D colon" className="panel">
          <div className="relative h-[26rem] sm:h-[34rem]">
            <SceneBoundary>
              <ColonScene extent={now.extent} inflammation={now.inflammation} onSegment={setSegment} />
            </SceneBoundary>
            <div className="pointer-events-none absolute left-4 top-3">
              <p className="display text-2xl" aria-live="polite">
                {montrealExtent(now.extent, now.inflammation)}
              </p>
              <p className="text-sm text-[var(--ink-soft)]">{segment ?? "Drag to turn. Point to name a part."}</p>
            </div>
            <p className="slug pointer-events-none absolute bottom-3 right-4 text-[var(--signal)]">
              Simulated, not a real scan
            </p>
          </div>
          <div className="flex items-center gap-4 border-t border-[var(--rule)] p-4">
            <button
              className="button w-20"
              onClick={() => {
                countRun();
                if (!playing && day >= days) setDay(0);
                setPlaying(!playing);
              }}
            >
              {playing ? "Pause" : "Play"}
            </button>
            <div className="flex-1">
              <Slider
                label="Time"
                min={0}
                max={days}
                step={1}
                value={day}
                display={`day ${day} of ${days}`}
                onChange={(d) => {
                  setPlaying(false);
                  setDay(d);
                }}
              />
            </div>
          </div>
        </section>

        <section className="panel p-5">
          <h2 className="display mb-3 text-2xl">The year so far</h2>
          <Timeline
            result={result}
            treatments={treatments}
            day={day}
            onDay={(d) => {
              setPlaying(false);
              setDay(d);
            }}
          />
        </section>

        <section className="panel p-5">
          <h2 className="display mb-3 text-2xl">
            Inside the lining, day <span className="timecode">{day}</span>
          </h2>
          <Mucosa {...now} />
        </section>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <section className="panel space-y-4 p-5">
          <h2 className="display text-2xl">The colon</h2>
          <Slider
            label="Susceptibility"
            min={0}
            max={1}
            step={0.05}
            value={susceptibility}
            display={percent(susceptibility)}
            onChange={run(setSusceptibility)}
          />
          <Slider
            label="Trigger strength (infection, antibiotics)"
            min={0}
            max={1}
            step={0.05}
            value={triggerSize}
            display={percent(triggerSize)}
            onChange={run(setTriggerSize)}
          />
          <Slider
            label="Trigger starts"
            min={0}
            max={180}
            step={1}
            value={triggerDay}
            display={`day ${triggerDay}`}
            onChange={run(setTriggerDay)}
          />
          <p className="text-sm text-[var(--ink-soft)]">
            Try low susceptibility: the same trigger flares, then settles.
          </p>
        </section>

        <section className="panel p-5">
          <h2 className="display text-2xl">Treatment</h2>
          <p className="mt-1 text-sm text-[var(--signal)]">
            Strengths are made up to show how each family acts. Do not compare them.{" "}
            <Link href="/treatments" className="text-[var(--source)] underline underline-offset-4">
              See trial results
            </Link>
          </p>
          <ul className="mt-3 divide-y divide-[var(--rule)]">
            {THERAPIES.map((therapy) => {
              const active = treatments.find((t) => t.id === therapy.id);
              return (
                <li key={therapy.id} className="py-3">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1.5"
                      checked={!!active}
                      onChange={(e) => {
                        countRun();
                        toggle(therapy.id, e.target.checked);
                      }}
                    />
                    <span>
                      <span className="font-medium">{therapy.name}</span>
                      <span className="block text-sm text-[var(--ink-soft)]">{therapy.examples}</span>
                    </span>
                  </label>
                  {active && (
                    <div className="mt-3 space-y-3 pl-7">
                      <p className="text-sm">{therapy.mechanism}</p>
                      <Slider
                        label="Strength"
                        min={0.1}
                        max={1}
                        step={0.05}
                        value={active.strength}
                        display={percent(active.strength)}
                        onChange={run((strength: number) => update(therapy.id, { strength }))}
                      />
                      <Slider
                        label="Starts"
                        min={0}
                        max={days}
                        step={1}
                        value={active.startDay}
                        display={`day ${active.startDay}`}
                        onChange={run((startDay: number) =>
                          update(therapy.id, {
                            startDay,
                            stopDay: active.stopDay === undefined ? undefined : Math.max(startDay, active.stopDay),
                          }),
                        )}
                      />
                      <Slider
                        label="Stops"
                        min={active.startDay}
                        max={days}
                        step={1}
                        value={active.stopDay ?? days}
                        display={active.stopDay === undefined ? "not stopped" : `day ${active.stopDay}`}
                        onChange={run((stopDay: number) =>
                          update(therapy.id, { stopDay: stopDay >= days ? undefined : stopDay }),
                        )}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <button className="button mt-2 w-full" onClick={reset}>
            Reset everything
          </button>
        </section>
      </aside>
    </div>
  );
}
