import { getSource, sourceUrl, TRIALS, type Trial } from "@uc/evidence";
import { THERAPIES } from "@uc/sim";
import type { Metadata } from "next";
import { Cite, Page } from "@/components/Page";

export const metadata: Metadata = { title: "Medicines" };

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr_3.5rem] items-center gap-3">
      <span className="slug text-[var(--ink-soft)]">{label}</span>
      <span className="h-2 bg-[var(--surface-2)]">
        <span className="block h-2 rounded-r" style={{ width: `${value}%`, background: color }} />
      </span>
      <span className="timecode text-right text-sm">{value}%</span>
    </div>
  );
}

function TrialList({ measure }: { measure: Trial["measure"] }) {
  return (
    <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
      {TRIALS.filter((t) => t.measure === measure).map((t) => (
        <li key={t.drug} className="grid gap-x-10 gap-y-2 py-5 md:grid-cols-[16rem_1fr]">
          <div>
            <h3 className="display text-xl">{t.drug}</h3>
            <p className="text-sm text-[var(--ink-soft)]">Blocks or modulates: {t.target}</p>
            {t.investigational && <p className="slug text-[var(--signal)]">Investigational, phase 2 result</p>}
          </div>
          <div className="space-y-1">
            <Bar label="Drug" value={t.drugPercent} color="var(--ink)" />
            <Bar label="Placebo" value={t.placeboPercent} color="var(--ink-soft)" />
            <a
              href={sourceUrl(getSource(t.sourceId))}
              target="_blank"
              rel="noreferrer"
              className="slug inline-block pt-1 text-[var(--source)] underline-offset-4 hover:underline"
            >
              {t.trial}, week <span className="timecode">{t.week}</span>
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Treatments() {
  return (
    <Page
      title="What medicines did in trials"
      intro="Each pair compares one dose of a drug with placebo in the first weeks of one trial. Compare each drug with its own placebo only."
    >
      <p className="max-w-prose border-l-2 border-[var(--signal)] pl-4 text-[var(--signal)]">
        Do not rank drugs by these bars. The trials enrolled different patients, used different definitions and measured
        at different times. For comparative advice, see the guidelines below.
      </p>

      <h2 className="display mt-12 text-3xl">Clinical remission</h2>
      <p className="mb-5 mt-2 max-w-prose text-[var(--ink-soft)]">Little or no disease activity, as each trial defined it.</p>
      <TrialList measure="Clinical remission" />

      <h2 className="display mt-12 text-3xl">Clinical response</h2>
      <p className="mb-5 mt-2 max-w-prose text-[var(--ink-soft)]">
        A meaningful improvement, a lower bar than remission.
      </p>
      <TrialList measure="Clinical response" />

      <h2 className="display mt-12 text-3xl">Drug families</h2>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        {THERAPIES.filter((t) => t.id !== "microbial").map((t) => (
          <article key={t.id} className="panel p-5">
            <h3 className="display text-xl">{t.name}</h3>
            <p className="text-sm text-[var(--ink-soft)]">For example {t.examples}</p>
            <p className="mt-3 text-sm">{t.mechanism}</p>
            <Cite ids={t.sourceIds} />
          </article>
        ))}
      </div>

      <h2 className="display mt-12 text-3xl">Guidelines</h2>
      <Cite ids={["aga-2024", "acg-2025"]} />
    </Page>
  );
}
