import { RATES, THERAPIES } from "@uc/sim";
import type { Metadata } from "next";
import { Page } from "@/components/Page";

export const metadata: Metadata = { title: "How the model works" };

const EQUATIONS = `dM/dt = leak · (1 − B) + trigger − clearance · M
dI/dt = (activation · M + a(s) · I² / (K² + I²)) · (1 − I) − resolution · I
dB/dt = repair(s) · (1 − B) − damage · I · B
dE/dt = spread · (I − θ) · (1 − E)   when I > θ
dE/dt = retreat · (I − θ) · E        otherwise`;

export default function Model() {
  return (
    <Page
      content="/simulator/model"
      title="How the model works"
      intro="Four numbers change day by day: the barrier (B), microbial exposure (M), inflammation (I) and how far up the colon it reaches (E). Susceptibility (s) sets how readily inflammation sustains itself and how slowly the lining repairs."
    >
      <p className="max-w-prose border-l-2 border-[var(--signal)] pl-4 text-[var(--signal)]">
        This is a teaching model. Its constants were chosen by hand to produce a recognisable pattern. They were not
        fitted to patient data or validated, so it cannot predict a flare, a response or an outcome.
      </p>

      <h2 className="display mt-10 text-3xl">Equations</h2>
      <pre className="panel timecode mt-4 overflow-x-auto p-5 text-sm">{EQUATIONS}</pre>

      <h2 className="display mt-10 text-3xl">Constants</h2>
      <dl className="mt-4 grid max-w-2xl grid-cols-2 gap-x-8 text-sm sm:grid-cols-3">
        {Object.entries(RATES).map(([k, v]) => (
          <div key={k} className="flex justify-between border-b border-[var(--rule)] py-1">
            <dt>{k}</dt>
            <dd className="timecode">{v}</dd>
          </div>
        ))}
      </dl>

      <h2 className="display mt-10 text-3xl">How treatments act</h2>
      <p className="mt-2 max-w-prose text-[var(--ink-soft)]">
        Each family multiplies some constants. The multipliers below apply at full strength and full onset. They express
        direction and mechanism, not measured effect sizes, so the simulator cannot be used to compare drugs.
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        {THERAPIES.map((t) => (
          <li key={t.id}>
            <strong>{t.name}:</strong>{" "}
            <span className="timecode">
              {Object.entries(t.effect)
                .map(([k, v]) => `${k} ×${v}`)
                .join(", ")}
            </span>
            , onset about <span className="timecode">{t.onsetDays}</span> days
          </li>
        ))}
      </ul>

      <h2 className="display mt-10 text-3xl">What is missing</h2>
      <ul className="mt-3 max-w-prose list-disc space-y-1 pl-5">
        <li>Individual immune cell types and signals such as TNF or IL-23 are lumped into one quantity.</li>
        <li>No dosing, drug levels, antibodies against drugs, or side effects.</li>
        <li>No surgery, cancer risk, age, or symptoms outside the colon.</li>
        <li>Relapses happen only from the triggers and treatment changes you set.</li>
        <li>The 3D colon is stylised, and the extent shown is a drawing of one number.</li>
      </ul>
    </Page>
  );
}
