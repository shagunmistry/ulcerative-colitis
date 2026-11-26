import { getPage, reviewState } from "@uc/evidence";
import Link from "next/link";

export function ReviewBadge({ path }: { path: string }) {
  const state = reviewState(getPage(path));
  return (
    <p className="slug inline-block border border-[var(--rule)] bg-[var(--paper-deep)] px-3 py-1 text-[var(--ink-soft)]">
      {state.status === "unreviewed" && "Not yet clinically reviewed"}
      {state.status === "in_review" && "Review in progress"}
      {state.status === "reviewed" && (
        <>
          <Link href={`/reviewers#${state.reviewer.id}`} className="text-[var(--source)] underline underline-offset-4">
            {`Reviewed by ${state.reviewer.name}, ${state.reviewer.credentials} on `}
            <span className="timecode">{state.date}</span>
          </Link>
        </>
      )}
    </p>
  );
}
