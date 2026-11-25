import { topicsIn } from "@uc/evidence";
import type { Metadata } from "next";
import { Page } from "@/components/Page";
import { Contents, TopicList } from "@/components/Topic";
import { UrgentCare } from "@/components/UrgentCare";
import { ogImage } from "@/og-pages";

export const metadata: Metadata = {
  title: "Understand",
  openGraph: {
    title: "Understand ulcerative colitis",
    images: [ogImage("understand")],
  },
};

export default function Understand() {
  const basics = topicsIn("basics");
  const causes = topicsIn("cause");
  return (
    <Page
      evidence
      title="Understand ulcerative colitis"
      intro="Each topic starts in plain language. Open the science for detail, or the sources to check it yourself."
    >
      <h2 className="sr-only">The basics</h2>
      <Contents topics={basics} />
      <div className="mt-4">
        <TopicList topics={basics} />
      </div>
      <div className="mt-10">
        <UrgentCare />
      </div>
      <h2 className="display mt-14 text-3xl">What may cause it</h2>
      <p className="mb-4 mt-3 max-w-prose text-[var(--ink-soft)]">
        No single cause is known. The disease appears where inherited risk, a weakened lining, gut microbes, immune
        signals and surroundings meet. Each topic says how firm the evidence is.
      </p>
      <Contents topics={causes} />
      <div className="mt-4">
        <TopicList topics={causes} />
      </div>
    </Page>
  );
}
