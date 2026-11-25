import type { Metadata } from "next";
import Link from "next/link";
import { External } from "@/components/External";
import { Page } from "@/components/Page";
import { REPO_URL } from "@/lib";

export const metadata: Metadata = { title: "Privacy" };

const h2 = "display mt-8 text-2xl";

export default function Privacy() {
  return (
    <Page title="Privacy" intro="This site has no accounts and does not ask for health information. Only live search sends what you type anywhere.">
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
          What you type into the site&apos;s Search page and the settings you choose in the simulator stay in your browser&apos;s memory and
          disappear when you leave. Your light or dark theme choice is saved in your browser.
        </p>
        <p>
          So that the site can work offline, your browser also saves copies of pages and files from this site on your
          device. Clearing this site&apos;s data in your browser removes them.
        </p>
        <h2 className={h2}>Live search</h2>
        <p>
          <Link href="/data/search" className="text-[var(--source)] underline underline-offset-4">
            Live search
          </Link>{" "}
          is different. When you press Search, a common search or Show more there, your browser sends the term, the
          filter you chose and your request, including your IP address, to the US National Library of Medicine (trials
          and papers) or to Hugging Face (datasets and models). We do not put the term in our page address, save it, or
          send it to our servers or analytics.
        </p>
        <p>
          <External href="https://www.nlm.nih.gov/web_policies.html#privacy_security">
            National Library of Medicine privacy policy
          </External>
        </p>
        <p>
          <External href="https://huggingface.co/privacy">Hugging Face privacy policy</External>
        </p>
        <h2 className={h2}>Hosting and other sites</h2>
        <p>
          The site is hosted by Vercel, which processes requests in order to serve pages. Links marked external lead to
          sites with their own privacy practices.
        </p>
        <h2 className={h2}>Contact</h2>
        <p>
          Open an issue on GitHub, for example with the report link under a topic. Issues are public, so do not include personal or health details.{" "}
          <External href={`${REPO_URL}/issues`}>GitHub issues</External>
        </p>
        <p className="timecode text-sm text-[var(--ink-soft)]">Updated 2026-11-25</p>
      </div>
    </Page>
  );
}
