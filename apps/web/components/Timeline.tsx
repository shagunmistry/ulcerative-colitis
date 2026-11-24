"use client";

import { THERAPIES, type SimulationResult, type Treatment } from "@uc/sim";

const W = 760;
const H = 260;
const PAD = { left: 40, right: 12, top: 10, bottom: 26 };

/* Colour is backed by line style, so the series stay distinct without it. */
export const SERIES = [
  { key: "inflammation", label: "Inflammation", color: "var(--ink)", dash: "", width: 2.5 },
  { key: "barrier", label: "Barrier integrity", color: "var(--sage)", dash: "8 4", width: 2 },
  { key: "microbes", label: "Microbial exposure", color: "var(--signal)", dash: "2 3", width: 2 },
] as const;

const pct = (v: number) => `${Math.round(v * 100)}`;

export function Timeline({
  result,
  treatments,
  day,
  onDay,
}: {
  result: SimulationResult;
  treatments: Treatment[];
  day: number;
  onDay: (day: number) => void;
}) {
  const days = result.day.length - 1;
  const x = (d: number) => PAD.left + (d / days) * (W - PAD.left - PAD.right);
  const y = (v: number) => PAD.top + (1 - v) * (H - PAD.top - PAD.bottom);

  const pick = (e: React.PointerEvent<SVGSVGElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - box.left) / box.width) * W;
    const d = Math.round(((px - PAD.left) / (W - PAD.left - PAD.right)) * days);
    onDay(Math.min(days, Math.max(0, d)));
  };

  return (
    <figure>
      <ul className="flex flex-wrap gap-x-6 gap-y-1">
        {SERIES.map((s) => (
          <li key={s.key} className="flex items-center gap-2 text-sm">
            <svg width="28" height="8" aria-hidden="true">
              <line x1="0" y1="4" x2="28" y2="4" stroke={s.color} strokeWidth={s.width} strokeDasharray={s.dash} />
            </svg>
            {s.label}
            <span className="timecode">{pct(result[s.key][day]!)}</span>
          </li>
        ))}
      </ul>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-3 w-full cursor-crosshair touch-pan-y"
        role="img"
        aria-label="Simulated inflammation, barrier integrity and microbial exposure over time"
        onPointerDown={pick}
        onPointerMove={(e) => (e.buttons === 1 || e.pointerType === "mouse") && pick(e)}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <g key={v}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} stroke="var(--rule)" />
            <text x={PAD.left - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="var(--ink-soft)">
              {pct(v)}
            </text>
          </g>
        ))}
        {Array.from({ length: Math.floor(days / 90) + 1 }, (_, i) => i * 90).map((d) => (
          <text key={d} x={x(d)} y={H - 8} textAnchor="middle" fontSize="11" fill="var(--ink-soft)">
            {d === 0 ? "Day 0" : d}
          </text>
        ))}
        {treatments.map((t, i) => (
          <g key={t.id}>
            <rect
              x={x(Math.min(t.startDay, days))}
              y={PAD.top}
              width={Math.max(0, x(Math.min(t.stopDay ?? days, days)) - x(Math.min(t.startDay, days)))}
              height={H - PAD.top - PAD.bottom}
              fill="var(--source)"
              opacity="0.07"
            />
            <text x={x(Math.min(t.startDay, days)) + 4} y={PAD.top + 12 + i * 13} fontSize="11" fill="var(--ink-soft)">
              {THERAPIES.find((o) => o.id === t.id)!.name}
            </text>
          </g>
        ))}
        {SERIES.map((s) => (
          <polyline
            key={s.key}
            fill="none"
            stroke={s.color}
            strokeWidth={s.width}
            strokeDasharray={s.dash}
            strokeLinejoin="round"
            points={result[s.key].map((v, d) => `${x(d).toFixed(1)},${y(v).toFixed(1)}`).join(" ")}
          />
        ))}
        <line x1={x(day)} x2={x(day)} y1={PAD.top} y2={H - PAD.bottom} stroke="var(--source)" strokeWidth="1.5" />
        {SERIES.map((s) => (
          <circle key={s.key} cx={x(day)} cy={y(result[s.key][day]!)} r="4" fill={s.color} stroke="var(--paper)" strokeWidth="2" />
        ))}
      </svg>
      <figcaption className="text-sm text-[var(--ink-soft)]">
        Model units from 0 to 100, not a clinical score. Point at or drag across the chart to move through time.
      </figcaption>

      <details className="mt-3 text-sm">
        <summary className="slug cursor-pointer">Show the numbers as a table</summary>
        <div className="mt-2 max-h-64 overflow-auto">
          <table className="w-full max-w-lg text-left">
            <thead>
              <tr>
                <th className="py-1">Day</th>
                {SERIES.map((s) => (
                  <th key={s.key}>{s.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="timecode">
              {result.day
                .filter((d) => d % 30 === 0)
                .map((d) => (
                  <tr key={d} className="border-t border-[var(--rule)]">
                    <td className="py-1">{d}</td>
                    {SERIES.map((s) => (
                      <td key={s.key}>{pct(result[s.key][d]!)}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
