import type { Entry } from "@/journal/schema";

const W = 600;
const H = 120;
const PAD = { left: 32, right: 12, top: 10, bottom: 22 };

const SERIES = [
  { key: "stool_frequency", label: "Bowel movements per day", max: undefined },
  { key: "pain", label: "Abdominal pain (0 to 10)", max: 10 },
  { key: "fatigue", label: "Fatigue (0 to 10)", max: 10 },
] as const;

/** One small chart per measure, so each keeps its own scale. */
function Trend({ entries, series }: { entries: Entry[]; series: (typeof SERIES)[number] }) {
  const points = entries.flatMap((e) => {
    const value = e[series.key];
    return value === undefined ? [] : [{ id: e.id, date: e.date, time: Date.parse(e.date), value }];
  });
  if (points.length === 0) return null;
  const first = points[0]!;
  const last = points[points.length - 1]!;
  const max = series.max ?? Math.max(1, ...points.map((p) => p.value));
  const x = (time: number) =>
    last.time === first.time
      ? (PAD.left + W - PAD.right) / 2
      : PAD.left + ((time - first.time) / (last.time - first.time)) * (W - PAD.left - PAD.right);
  const y = (v: number) => PAD.top + (1 - v / max) * (H - PAD.top - PAD.bottom);

  return (
    <figure>
      <figcaption className="slug">{series.label}</figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-1 w-full"
        role="img"
        aria-label={`${series.label}: ${points.length} ${points.length === 1 ? "value" : "values"} from ${first.date} to ${last.date}, latest ${last.value}. Each value is listed in your entries.`}
      >
        {[0, max].map((v) => (
          <g key={v}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} stroke="var(--rule)" />
            <text x={PAD.left - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="var(--ink-soft)">
              {v}
            </text>
          </g>
        ))}
        <polyline fill="none" stroke="var(--ink)" strokeWidth="2" points={points.map((p) => `${x(p.time)},${y(p.value)}`).join(" ")} />
        {points.map((p) => (
          <circle key={p.id} cx={x(p.time)} cy={y(p.value)} r="3.5" fill="var(--ink)" />
        ))}
        <text
          x={last.date === first.date ? x(first.time) : PAD.left}
          y={H - 6}
          textAnchor={last.date === first.date ? "middle" : "start"}
          fontSize="11"
          fill="var(--ink-soft)"
        >
          {first.date}
        </text>
        {last.date !== first.date && (
          <text x={W - PAD.right} y={H - 6} textAnchor="end" fontSize="11" fill="var(--ink-soft)">
            {last.date}
          </text>
        )}
      </svg>
    </figure>
  );
}

export function Trends({ entries }: { entries: Entry[] }) {
  const any = entries.some((e) => SERIES.some((s) => e[s.key] !== undefined));
  if (!any) return <p className="text-sm text-[var(--ink-soft)]">Trends appear once you record bowel movements, pain or fatigue.</p>;
  return (
    <div className="space-y-5">
      {SERIES.map((series) => (
        <Trend key={series.key} entries={entries} series={series} />
      ))}
    </div>
  );
}
