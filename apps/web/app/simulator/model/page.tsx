import {
  DEFAULT_SCENARIO,
  DEFAULT_STRENGTH,
  MODEL_CHANGELOG,
  MODEL_VERSION,
  RATE_NOTES,
  RATES,
  THERAPIES,
} from "@uc/sim";
import { DRAWING, SEGMENTS } from "@uc/viz3d";
import { Cite, Page } from "@/components/Page";
import { Todo } from "@/components/Todo";
import { pageMetadata } from "@/meta";
import { SIM_UI } from "@/simulator-settings";

export const metadata = pageMetadata(
  "Simulator model card",
  "What the ulcerative colitis teaching simulator represents, every number in it, what it leaves out and why it cannot predict anything.",
);

const EQUATIONS = `dM/dt = leak · (1 − B) + trigger − clearance · M
dI/dt = (activation · M + a(s) · I² / (K² + I²)) · (1 − I) − resolution · I
dB/dt = repair(s) · (1 − B) − damage · I · B
dE/dt = spread · (I − θ) · (1 − E)   when I > θ
dE/dt = retreat · (I − θ) · E        otherwise

a(s)      = amplificationBase + amplificationBySusceptibility · s
repair(s) = repair · (1 − repairLossBySusceptibility · s)
trigger   = sum over active triggers of size · triggerStrength
K         = halfSaturation
θ         = spreadThreshold

A treatment's level at day t, once started:
  level = strength · (1 − e^(−(min(t, stop) − start) / onsetDays))
          · e^(−(t − stop) / washoutDays) after it stops
Each affected constant is multiplied by 1 + (multiplier − 1) · level.`;

const STATE = [
  ["B", "Barrier integrity: mucus and lining cells", "1"],
  ["M", "Microbial exposure of the tissue", "0"],
  ["I", "Immune inflammation", "0"],
  ["E", "Extent: how far up the colon from the rectum", "0"],
];


interface Param {
  name: string;
  value: number | string;
  meaning: string;
  source?: React.ReactNode;
}

const byHand = (
  <>
    Chosen by hand. <Todo>TODO(owner): source</Todo>
  </>
);

function Params({ caption, rows }: { caption: string; rows: Param[] }) {
  return (
    <div tabIndex={0} role="region" aria-label={caption} className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-[var(--rule)]">
            {["Name", "Value", "What it does", "Source for the value"].map((h) => (
              <th key={h} scope="col" className="py-2 pr-4">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.name} data-param={p.name} className="border-b border-[var(--rule)] align-top">
              <th scope="row" className="timecode py-2 pr-4 font-normal">
                {p.name}
              </th>
              <td className="timecode py-2 pr-4">{p.value}</td>
              <td className="py-2 pr-4">{p.meaning}</td>
              <td className="py-2">{p.source ?? byHand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const DRAWING_NOTES: Record<keyof typeof DRAWING, string> = {
  quietBelow: "Below this inflammation the colon is drawn and described as quiet.",
  minReach: "The least of the colon involved once there is any inflammation.",
  fadeLength: "Length over which colour fades out above the extent.",
  ulcerEdge: "Where ulcer patches begin on the surface texture.",
  ulcerEdgeFall: "How much higher intensity widens ulcer patches.",
  ulcerSoftness: "Softness of patch edges.",
  ulcerFrom: "Intensity below which no ulcer patches show.",
  mucusPower: "Mucus thickness is barrier integrity raised to this power.",
  maxGaps: "Open gaps drawn in a fully lost barrier.",
  bacteriaGain: "Microbial exposure is multiplied by this before bacteria are drawn.",
  maxBacteria: "Most bacteria drawn inside the tissue.",
  restingImmuneCells: "Immune cells drawn with no inflammation.",
  extraImmuneCells: "Immune cells added at full inflammation.",
};

const UI_NOTES: Record<keyof typeof SIM_UI, string> = {
  startDay: "Day the simulator opens on.",
  daysPerSecond: "Playback speed.",
  latestTriggerDay: "Latest day the trigger slider allows.",
  lateStartDay: "Start day for a treatment added when the view is at the last day.",
  minStrength: "Lowest treatment strength the slider allows.",
  previewTreatmentDay: "Day the home page preview adds a treatment.",
};

const h2 = "display mt-12 text-3xl";
const prose = "mt-3 max-w-prose";
const list = "mt-3 max-w-prose list-disc space-y-1 pl-5";

export default function Model() {
  const trigger = DEFAULT_SCENARIO.triggers[0]!;
  return (
    <Page
      content="/simulator/model"
      title="Simulator model card"
      intro="How the simulator works, every number in it, and what it cannot do."
    >
      <p className="max-w-prose border-l-2 border-[var(--signal)] pl-4 text-[var(--signal)]">
        This is a teaching model. Its constants were chosen by hand to produce a recognisable pattern. They were not
        fitted to patient data or validated, so it cannot predict a flare, a response or an outcome.
      </p>

      <h2 className={h2}>What the model represents</h2>
      <p className={prose}>
        A qualitative story from the research literature: a weakened lining lets microbes reach the tissue, the immune
        system reacts, the reaction can keep itself going, and inflammation spreads upward from the rectum. Susceptibility
        (s, from 0 to 1) stands for the genetic and environmental tendency for inflammation to sustain itself and for the
        lining to repair slowly.
      </p>

      <h2 className={h2}>State variables</h2>
      <p className={prose}>Four numbers, each from 0 to 1, in model units. They are not clinical measurements.</p>
      <dl className="mt-3 max-w-prose space-y-1">
        {STATE.map(([symbol, meaning, start]) => (
          <div key={symbol}>
            <dt className="timecode inline">{symbol}</dt>
            <dd className="inline">
              : {meaning}. Starts at <span className="timecode">{start}</span>.
            </dd>
          </div>
        ))}
      </dl>

      <h2 className={h2}>Equations</h2>
      <pre tabIndex={0} role="region" aria-label="Model equations" className="panel timecode mt-4 overflow-x-auto p-5 text-sm">
        {EQUATIONS}
      </pre>
      <p className={prose}>
        Solved in fixed steps (Euler&apos;s method) with values held between 0 and 1. The loop term uses a power of 2,
        chosen by hand to give a threshold-like response. <Todo>TODO(owner): source</Todo>
      </p>

      <h2 className={h2}>Constants</h2>
      <Params
        caption="Model constants"
        rows={Object.entries(RATES).map(([name, value]) => ({
          name,
          value,
          meaning: RATE_NOTES[name as keyof typeof RATES],
        }))}
      />

      <h2 className={h2}>How treatments act</h2>
      <p className={prose}>
        Each family multiplies some constants. The multipliers apply at full strength and full onset. The sources support
        the mechanism and the direction of effect, <strong>not the numbers</strong>, so the simulator cannot be used to
        compare drugs.
      </p>
      {THERAPIES.map((t) => (
        <section key={t.id} className="mt-8">
          <h3 className="display text-2xl">{t.name}</h3>
          <p className="mt-1 max-w-prose text-sm text-[var(--ink-soft)]">{t.mechanism}</p>
          <Params
            caption={`${t.name} values`}
            rows={[
              {
                name: `${t.id}.onsetDays`,
                value: t.onsetDays,
                meaning: "Days for about two thirds of the effect to build up.",
              },
              ...Object.entries(t.effect).map(([k, v]) => ({
                name: `${t.id}.${k}`,
                value: v,
                meaning: `Multiplies ${k}.`,
              })),
            ]}
          />
          <details className="mt-2">
            <summary className="slug cursor-pointer">Sources for mechanism and direction</summary>
            <Cite ids={t.sourceIds} />
          </details>
        </section>
      ))}

      <h2 className={h2}>Starting scenario</h2>
      <Params
        caption="Starting scenario"
        rows={[
          { name: "scenario.days", value: DEFAULT_SCENARIO.days, meaning: "Length of the simulated period, in days." },
          { name: "scenario.susceptibility", value: DEFAULT_SCENARIO.susceptibility, meaning: "Susceptibility, s." },
          { name: "scenario.triggerDay", value: trigger.day, meaning: "Day the trigger starts." },
          { name: "scenario.triggerSize", value: trigger.size, meaning: "Size of the trigger, from 0 to 1." },
          { name: "DEFAULT_STRENGTH", value: DEFAULT_STRENGTH, meaning: "Strength of a newly added treatment." },
        ]}
      />

      <h2 className={h2}>How the pictures are drawn</h2>
      <p className={prose}>
        These change only what you see. Extent is named with the Montreal classes: E1 up to the end of the rectum, E2 up
        to the top of the descending colon, E3 beyond. The colon&apos;s shape, colours and cell positions are artistic.
      </p>
      <Params
        caption="Drawing values"
        rows={Object.entries(DRAWING).map(([k, v]) => ({
          name: `drawing.${k}`,
          value: String(v),
          meaning: DRAWING_NOTES[k as keyof typeof DRAWING],
        }))}
      />
      <Params
        caption="Where each part of the colon ends"
        rows={SEGMENTS.map((s) => ({
          name: `segment.${s.name}`,
          value: s.end,
          meaning: "Where this part ends, from 0 at the rectum to 1 at the cecum.",
        }))}
      />
      <Params
        caption="Screen settings"
        rows={Object.entries(SIM_UI).map(([k, v]) => ({
          name: `ui.${k}`,
          value: v,
          meaning: UI_NOTES[k as keyof typeof SIM_UI],
        }))}
      />

      <h2 className={h2}>What is missing</h2>
      <ul className={list}>
        <li>Individual immune cell types and signals such as TNF or IL-23 are lumped into one quantity.</li>
        <li>No dosing, drug levels, antibodies against drugs, or side effects.</li>
        <li>No surgery, cancer risk, age, or symptoms outside the colon.</li>
        <li>Relapses happen only from the triggers and treatment changes you set.</li>
        <li>No differences between people beyond one susceptibility number, and no chance variation.</li>
        <li>The 3D colon is stylised, and the extent shown is a drawing of one number.</li>
      </ul>

      <h2 className={h2}>Why this is not a prediction tool</h2>
      <ul className={list}>
        <li>No number was fitted to or tested against data from any person.</li>
        <li>It takes nothing about you as input, and its units match no test or score.</li>
        <li>Treatment strengths are invented to show direction, so differences between families mean nothing.</li>
        <li>It must not be used to start, stop or change any treatment. Talk to your care team.</li>
      </ul>

      <h2 className={h2}>Version and changes</h2>
      <p className={prose}>
        Version <span className="timecode">{MODEL_VERSION}</span>
      </p>
      <ul className={list}>
        {MODEL_CHANGELOG.map((c) => (
          <li key={c.version}>
            <span className="timecode">{c.version}</span> (<span className="timecode">{c.date}</span>): {c.changes}
          </li>
        ))}
      </ul>
    </Page>
  );
}
