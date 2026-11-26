import type { Metadata } from "next";
import Link from "next/link";
import { External } from "@/components/External";
import { Page } from "@/components/Page";
import { REPO_URL } from "@/lib";

export const metadata: Metadata = { title: "Privacy" };

const h2 = "display mt-8 text-2xl";

const EVENTS = [
  ["simulator_run", "someone ran or changed the simulator, with the name of the starting scenario."],
  ["dataset_link_click", "a link to a dataset was opened, with the dataset's short name."],
  ["helpful_vote", "someone answered “Was this helpful?”, with the page's short name and yes or no."],
  ["journal_created_entry", "a journal entry was created. Nothing about the entry."],
  ["journal_export", "a journal file was exported. Nothing about its contents."],
] as const;

export default function Privacy() {
  return (
    <Page title="Privacy" intro="This site has no accounts and does not ask for health information. Only live search sends what you type anywhere.">
      <div className="max-w-prose space-y-3">
        <h2 className="display text-2xl">Visitor statistics</h2>
        <p>
          We use Vercel Web Analytics to count page views and a few actions, and Vercel Speed Insights to measure how
          quickly pages load. Both are processed by Vercel. We see totals, not individual people.
        </p>
        <p>
          According to Vercel, a page view may record the time, the page address, the referring site, filtered query
          parameters, approximate location, and your device and browser type. Speed Insights records the page address,
          network speed, browser, device type, operating system, country and loading measurements.
        </p>
        <p>These actions are also counted, each with only the detail shown:</p>
        <ul className="list-disc space-y-1 pl-5">
          {EVENTS.map(([name, meaning]) => (
            <li key={name}>
              <span className="timecode">{name}</span>: {meaning}
            </li>
          ))}
        </ul>
        <p>
          We do not collect your name, email address, health details or anything you type. Journal entries, consent terms
          and exported files are never sent to analytics or to us.
        </p>
        <p>
          Vercel says Web Analytics uses no third-party cookies, identifies visitors by a hash made from the request,
          discards the visitor session after 24 hours, and uses the data for aggregated statistics. This site sets no
          cookies of its own.
        </p>
        <p>
          To block these statistics, use a content blocker that blocks addresses on this site beginning{" "}
          <span className="timecode">/_vercel/</span>, or turn JavaScript off. The reading pages still work; the
          simulator, search and journal need JavaScript.
        </p>
        <p>
          <External href="https://vercel.com/docs/analytics/privacy-policy">Web Analytics privacy and compliance</External>
        </p>
        <p>
          <External href="https://vercel.com/docs/speed-insights/privacy-policy">
            Speed Insights privacy and compliance
          </External>
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
          send it to our servers or analytics. When a search fails or finds nothing, the &ldquo;Run this search on
          ...&rdquo; and &ldquo;Search ... on Hugging Face&rdquo; links send your term to that site in the address, which
          stays in your browser history.
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
        <p className="timecode text-sm text-[var(--ink-soft)]">Updated 2026-11-26</p>
      </div>
    </Page>
  );
}
