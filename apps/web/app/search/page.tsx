import type { Metadata } from "next";
import { Page } from "@/components/Page";
import { SearchBox } from "@/components/SearchBox";

export const metadata: Metadata = { title: "Search" };

export default function Search() {
  return (
    <Page title="Search" intro="Searching happens in your browser. What you type is not sent anywhere.">
      <SearchBox />
    </Page>
  );
}
