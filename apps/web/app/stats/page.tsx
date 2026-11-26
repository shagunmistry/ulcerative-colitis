import { reviewSummary } from "@uc/evidence";
import type { Metadata } from "next";
import { Page } from "@/components/Page";
import { Todo } from "@/components/Todo";
import stats from "@/data/stats.json";
import { pageMetadata } from "@/meta";
import { hasStats, STATS_FIELDS } from "@/stats";

export const metadata: Metadata = {
  ...pageMetadata("Numbers", "How many people use this ulcerative colitis site, and how much of it is reviewed."),
  // Not for search results until the numbers are real.
  robots: hasStats(stats) ? undefined : { index: false },
};

export default function Stats() {
  const { total, reviewed } = reviewSummary();
  const rows: [string, string][] = [
    ...STATS_FIELDS.map(([key, label]): [string, string] => [label, String(stats[key])]),
    ["Pages clinically reviewed", `${reviewed} of ${total}`],
  ];
  return (
    <Page
      title="Numbers"
      intro="Entered by hand from Vercel Web Analytics and GitHub, except the review count, which comes from the site's own records."
    >
      <dl className="max-w-md divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
        {rows.map(([label, value]) => (
          <div key={label} className="flex flex-wrap justify-between gap-3 py-3">
            <dt>{label}</dt>
            <dd className="timecode">
              <Todo>{value}</Todo>
            </dd>
          </div>
        ))}
      </dl>
    </Page>
  );
}
