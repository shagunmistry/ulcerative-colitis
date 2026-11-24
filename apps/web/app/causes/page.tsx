import { CAUSES } from "@uc/evidence";
import type { Metadata } from "next";
import { Cite, Page } from "@/components/Page";

export const metadata: Metadata = { title: "Causes" };

export default function Causes() {
  return (
    <Page
      title="What is behind ulcerative colitis"
      intro="No single cause is known. The disease appears where inherited risk, a weakened lining, gut microbes, immune signals and surroundings meet. Each piece below says how firm the evidence is."
    >
      <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
        {CAUSES.map((c) => (
          <article key={c.id} className="grid gap-x-10 gap-y-2 py-8 md:grid-cols-[16rem_1fr]">
            <div>
              <h2 className="display text-2xl">{c.title}</h2>
              <p className="slug mt-1 text-[var(--sage)]">{c.strength}</p>
            </div>
            <div className="max-w-prose">
              <p>{c.summary}</p>
              <p className="mt-3 text-[var(--signal)]">{c.caveat}</p>
              <Cite ids={c.sourceIds} />
            </div>
          </article>
        ))}
      </div>
    </Page>
  );
}
