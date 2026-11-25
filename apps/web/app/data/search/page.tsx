import type { Metadata } from "next";
import { DataSwitch } from "@/components/DataSwitch";
import { LiveSearch } from "@/components/LiveSearch";
import { Page } from "@/components/Page";

export const metadata: Metadata = { title: "Live search" };

export default function LiveSearchPage() {
  return (
    <Page
      title="Live search"
      intro="Search trials, papers, datasets and models held by outside services. Nothing is sent until you press Search or a common search."
    >
      <DataSwitch current="/data/search" />
      <LiveSearch />
    </Page>
  );
}
