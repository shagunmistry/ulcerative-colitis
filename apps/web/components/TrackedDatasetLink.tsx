"use client";

import { events } from "@/analytics";
import { External } from "./External";

/** An outside link to a dataset. Only the dataset's id is counted. */
export function TrackedDatasetLink({ id, href, children }: { id: string; href: string; children: React.ReactNode }) {
  const count = () => events.datasetLinkClick(id);
  return (
    <span onClick={count} onAuxClick={(e) => e.button === 1 && count()}>
      <External href={href}>{children}</External>
    </span>
  );
}
