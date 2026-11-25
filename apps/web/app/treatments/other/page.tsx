import { topicsIn } from "@uc/evidence";
import type { Metadata } from "next";
import { Page } from "@/components/Page";
import { Contents, TopicList } from "@/components/Topic";
import { TreatmentsSwitch } from "@/components/TreatmentsSwitch";

export const metadata: Metadata = {
  title: "Other approaches",
  openGraph: {
    title: "Supplements, microbes and diet",
    images: [{ url: "/og?title=Supplements%2C%20microbes%20and%20diet", width: 1200, height: 630 }],
  },
};

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
