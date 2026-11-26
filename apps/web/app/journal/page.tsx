import Link from "next/link";
import { JournalApp } from "@/components/journal/JournalApp";
import { Page } from "@/components/Page";
import { pageMetadata } from "@/meta";

export const metadata = pageMetadata(
  "My UC Journal",
  "A prototype journal for ulcerative colitis that stays on your device. Record symptoms, set your own data terms, export or delete everything.",
);

export default function Journal() {
  return (
    <Page title="My UC Journal" intro="A prototype: your own record, on your own device, with your own terms for its use.">
      <div className="max-w-3xl">
        <aside aria-label="Before you start" className="mb-8 border-l-2 border-[var(--signal)] pl-4">
          <p className="text-[var(--signal)]">
            Your entries are stored only on this device. We can&apos;t see them. Clearing your browser data deletes them.
            This is not medical advice and isn&apos;t monitored by anyone. If you have severe symptoms,{" "}
            <Link href="/understand#urgent-care" className="underline underline-offset-4">
              see when to get urgent care
            </Link>
            .
          </p>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Anyone who uses this browser can read your entries, and some browsers delete saved data from sites you have
            not visited for a while. Export a copy now and then. These fields are for your own tracking, not a clinical
            score: nothing here diagnoses or recommends anything.
          </p>
        </aside>
        <noscript>
          <p>The journal needs JavaScript, because it runs entirely in your browser.</p>
        </noscript>
        <JournalApp />
      </div>
    </Page>
  );
}
