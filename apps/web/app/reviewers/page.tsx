import { PAGES, REVIEWERS, reviewStatement, reviewSummary } from "@uc/evidence";
import Link from "next/link";
import { External } from "@/components/External";
import { Page } from "@/components/Page";
import { ReviewBadge } from "@/components/ReviewBadge";
import { REPO_URL } from "@/lib";
import { pageMetadata } from "@/meta";

export const metadata = pageMetadata(
  "Clinical reviewers",
  "Who has clinically reviewed this ulcerative colitis site, how review works, and which pages are still unreviewed.",
);

const h2 = "display mt-12 text-3xl";
const inline = "text-[var(--source)] underline underline-offset-4";

export default function Reviewers() {
  const { total, reviewed, inReview } = reviewSummary();
  return (
    <Page title="Clinical review" intro={reviewStatement()}>
      <p className="text-lg">
        <span className="timecode">{`${reviewed} of ${total}`}</span> content pages reviewed
        {inReview > 0 && (
          <>
            , <span className="timecode">{inReview}</span> in review
          </>
        )}
        .
      </p>
      <ul className="mt-4 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
        {PAGES.map((p) => (
          <li key={p.path} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <Link href={p.path} className={inline}>
              {p.title}
            </Link>
            <ReviewBadge path={p.path} />
          </li>
        ))}
      </ul>

      <h2 className={h2}>Reviewers</h2>
      {REVIEWERS.length === 0 ? (
        <p className="mt-3 max-w-prose">
          No reviewers yet. If you are a clinician and would like to review a page, start with the checklist linked
          below.
        </p>
      ) : (
        <ul className="mt-4 space-y-6">
          {REVIEWERS.map((r) => (
            <li key={r.id} id={r.id} className="panel scroll-mt-32 p-5">
              <h3 className="display text-2xl">
                {r.name}, {r.credentials}
              </h3>
              <p className="mt-1 text-[var(--ink-soft)]">{r.affiliation}</p>
              <p className="mt-2">
                <External href={r.url}>Profile</External>
              </p>
              <p className="mt-2 text-sm">
                <strong>Conflicts of interest:</strong> {r.conflicts_of_interest}
              </p>
            </li>
          ))}
        </ul>
      )}

      <h2 className={h2}>How review works</h2>
      <div className="mt-3 max-w-prose space-y-3">
        <p>A reviewer checks one page at a time for:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>accuracy against the cited sources,</li>
          <li>whether each strength-of-evidence label is fair,</li>
          <li>the urgent-care guidance, where the page shows it,</li>
          <li>wording that could lead someone to harm, for example by changing treatment.</li>
        </ul>
        <p>
          Before reviewing, each reviewer declares conflicts of interest, such as payments, research funding or shares
          connected to a treatment or product the page discusses. The declaration is published here beside their name.
        </p>
        <p>
          A page counts as reviewed only when the reviewer, their agreement to be named and the date are recorded. If its
          content later changes in substance, it goes back to unreviewed.
        </p>
        <p>
          <External href={`${REPO_URL}/blob/main/docs/CLINICAL_REVIEW.md`}>Reviewer checklist</External>
        </p>
      </div>
    </Page>
  );
}
