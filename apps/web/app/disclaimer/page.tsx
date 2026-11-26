import { reviewStatement } from "@uc/evidence";
import type { Metadata } from "next";
import Link from "next/link";
import { External } from "@/components/External";
import { Page } from "@/components/Page";
import { UrgentCare } from "@/components/UrgentCare";
import { REPO_URL } from "@/lib";

export const metadata: Metadata = { title: "Disclaimer" };

export default function Disclaimer() {
  return (
    <Page title="Disclaimer" intro="This site is for learning. It is not medical advice and does not replace your care team.">
      <ul className="mb-10 max-w-prose list-disc space-y-2 pl-5">
        <li>
          {reviewStatement()}{" "}
          <Link href="/reviewers" className="text-[var(--source)] underline underline-offset-4">
            Review status by page
          </Link>
        </li>
        <li>Do not start, stop or change any treatment because of something you read or saw here.</li>
        <li>
          The simulator is a hand-built, unvalidated teaching model. It cannot predict your disease, a flare or how you
          would respond to a drug.
        </li>
        <li>Research moves on. Check the dates on sources.</li>
        <li>The software and writing are provided without warranty, under their open licenses.</li>
        <li>
          Found an error? <External href={`${REPO_URL}/issues`}>Report it on GitHub</External>
        </li>
      </ul>
      <UrgentCare />
    </Page>
  );
}
