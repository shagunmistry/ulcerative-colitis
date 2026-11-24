import { topicsIn } from "@uc/evidence";
import type { Metadata } from "next";
import { Page } from "@/components/Page";
import { Contents, TopicList } from "@/components/Topic";
import { TreatmentsSwitch } from "@/components/TreatmentsSwitch";

export const metadata: Metadata = { title: "Other approaches" };

export default function OtherApproaches() {
  const topics = topicsIn("other");
  return (
    <Page
      evidence
      title="Supplements, microbes and diet"
      intro="What has been tested beyond standard medicines. Do not swap prescribed treatment for any of these without talking to your care team, and tell them about anything you take."
    >
      <TreatmentsSwitch current="/treatments/other" />
      <Contents topics={topics} />
      <h2 className="sr-only">Approaches</h2>
      <div className="mt-4">
        <TopicList topics={topics} />
      </div>
    </Page>
  );
}
