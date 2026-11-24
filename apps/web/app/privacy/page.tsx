import type { Metadata } from "next";
import { External } from "@/components/External";
import { Page } from "@/components/Page";
import { REPO_URL } from "@/lib";

export const metadata: Metadata = { title: "Privacy" };

const h2 = "display mt-8 text-2xl";

export default function Privacy() {
  return (
    <Page title="Privacy" intro="This site has no accounts, no forms that send data, and does not ask for health information.">
      <div className="max-w-prose space-y-3">
        <h2 className="display text-2xl">Visitor statistics</h2>
        <p>
          We use Vercel Web Analytics to count page views. According to Vercel, a page view may record the time, the page
          address, the referring site, filtered query parameters, approximate location, and your device and browser type.
        </p>
        <p>
          Vercel says it uses no third-party cookies, identifies visitors by a hash made from the request, discards the
          visitor session after 24 hours, and uses the data for aggregated statistics.
        </p>
        <p>
          <External href="https://vercel.com/docs/analytics/privacy-policy">Vercel&apos;s privacy and compliance page</External>
        </p>
        <h2 className={h2}>What stays on your device</h2>
        <p>
          What you type into search and the settings you choose in the simulator stay in your browser&apos;s memory and
          disappear when you leave. Your light or dark theme choice is saved in your browser.
        </p>
        <h2 className={h2}>Hosting and other sites</h2>
        <p>
          The site is hosted by Vercel, which processes requests in order to serve pages. Links marked external lead to
          sites with their own privacy practices.
        </p>
        <h2 className={h2}>Contact</h2>
        <p>
          Open an issue on GitHub. Issues are public, so do not include personal or health details.{" "}
          <External href={`${REPO_URL}/issues`}>GitHub issues</External>
        </p>
        <p className="timecode text-sm text-[var(--ink-soft)]">Updated 2026-11-24</p>
      </div>
    </Page>
  );
}
