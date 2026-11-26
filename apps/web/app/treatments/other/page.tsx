import { topicsIn } from "@uc/evidence";
import type { Metadata } from "next";
import { Page } from "@/components/Page";
import { Contents, TopicList } from "@/components/Topic";
import { TreatmentsSwitch } from "@/components/TreatmentsSwitch";
import { ogImage } from "@/og-pages";

export const metadata: Metadata = {
  title: "Other approaches",
  openGraph: {
    title: "Supplements, microbes and diet",
    images: [ogImage("other")],
  },
};

export default function OtherApproaches() {
  const topics = topicsIn("other");
  return (
    <Page
      content="/treatments/other"
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
