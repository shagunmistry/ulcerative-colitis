import { DATASETS, LAST_CHECKED, reviewStatement } from "@uc/evidence";
import Link from "next/link";
import { External } from "@/components/External";
import { LandingPreview } from "@/components/LandingPreview";
import { REPO_URL } from "@/lib";

const inline = "text-[var(--source)] underline-offset-4 hover:underline";

function Path({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return (
    <section className="panel p-6">
      <h2 className="display text-2xl">{title}</h2>
      <p className="mt-2 text-[var(--ink-soft)]">{text}</p>
      <ul className="mt-4 space-y-2">{children}</ul>
    </section>
  );
}

function Go({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className={inline}>
        {children}
      </Link>
    </li>
  );
}

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-10 lg:px-10 lg:py-16">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <div>
          <h1 className="display text-4xl sm:text-5xl">Understand ulcerative colitis</h1>
          <p className="mt-5 max-w-prose text-lg text-[var(--ink-soft)]">
            What it is, what may cause it and what treatments do, in plain language, with the sources and the science
            one click away.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/simulator"
              className="rounded-md bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-[var(--paper)] hover:bg-[var(--source)]"
            >
              Try the simulator
            </Link>
            <Link href="/understand" className="button !px-5 !py-3">
              Start with the basics
            </Link>
          </div>
        </div>
        <LandingPreview />
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Path title="Newly diagnosed" text="Start with what it is and what happens next.">
          <Go href="/understand#what-it-is">What it is</Go>
          <Go href="/understand#diagnosis">How it is diagnosed</Go>
          <Go href="/understand#urgent-care">When to get urgent care</Go>
        </Path>
        <Path title="Compare the evidence" text="See what has been tested, and how strong the results are.">
          <Go href="/treatments">Medicines and trial results</Go>
          <Go href="/treatments/other">Supplements, microbes and diet</Go>
          <Go href="/understand#genes">What may cause it</Go>
        </Path>
        <Path title="Work with the data" text="Inspect the model, read the code, find open datasets.">
          <Go href="/data">Data library</Go>
          <Go href="/data/search">Live search of trials and papers</Go>
          <Go href="/simulator/model">How the model works</Go>
          <li>
            <External href={REPO_URL}>Source code on GitHub</External>
          </li>
          {DATASETS.map((d) => (
            <li key={d.id}>
              <External href={d.url}>{d.title}</External>
            </li>
          ))}
        </Path>
      </div>

      <section className="mt-12 border-t border-[var(--rule)] pt-8">
        <h2 className="display text-2xl">How we handle evidence</h2>
        <p className="mt-3 max-w-prose text-[var(--ink-soft)]">
          Topics cite published papers or public health pages. Last checked on{" "}
          <span className="timecode">{LAST_CHECKED}</span>. {reviewStatement()} The simulation is a teaching model that
          predicts nothing about you.{" "}
          <Link href="/reviewers" className={inline}>
            Review status by page
          </Link>
          . Spotted a mistake? <External href={`${REPO_URL}/issues`}>Report it</External>
        </p>
      </section>
    </div>
  );
}
