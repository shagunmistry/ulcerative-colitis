import { COMPLEMENTARY } from "@uc/evidence";
import type { Metadata } from "next";
import { Cite, Page } from "@/components/Page";

export const metadata: Metadata = { title: "Other approaches" };

export default function Alternatives() {
  return (
    <Page
      title="Supplements, microbes and diet"
      intro="What has been tested beyond standard medicines. None of these has been shown to replace prescribed treatment. Tell your care team about anything you take."
    >
      <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
        {COMPLEMENTARY.map((c) => (
          <article key={c.id} className="grid gap-x-10 gap-y-2 py-8 md:grid-cols-[16rem_1fr]">
            <div>
              <h2 className="display text-2xl">{c.title}</h2>
              <p className="slug mt-1 text-[var(--signal)]">{c.verdict}</p>
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
