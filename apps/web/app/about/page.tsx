import { existsSync } from "node:fs";
import { join } from "node:path";
import { LAST_CHECKED, reviewStatement } from "@uc/evidence";
import Link from "next/link";
import { External } from "@/components/External";
import { Page } from "@/components/Page";
import { Todo } from "@/components/Todo";
import { REPO_URL } from "@/lib";
import { pageMetadata } from "@/meta";
import { isSet, OWNER } from "@/owner";

export const metadata = pageMetadata(
  "About",
  "Who builds this free ulcerative colitis site, why, how its content is sourced and checked, and how to report errors.",
);

const h2 = "display mt-12 text-3xl";
const inline = "text-[var(--source)] underline underline-offset-4";

/** Checked when the page is built. */
const hasPhoto = () => existsSync(join(process.cwd(), "public/about/owner.jpg"));

function Profile({ label, url }: { label: string; url: string }) {
  return <li>{isSet(url) ? <External href={url}>{label}</External> : <Todo>{url}</Todo>}</li>;
}

export default function About() {
  return (
    <Page title="About" intro="A free, open, evidence-cited resource about ulcerative colitis.">
      <div className="max-w-prose">
        <h2 className="display text-3xl">Who built this</h2>
        <div className="mt-4 flex flex-wrap items-start gap-6">
          {hasPhoto() ? (
            <img src="/about/owner.jpg" alt={isSet(OWNER.name) ? OWNER.name : "The site's builder"} width={160} height={160} className="h-40 w-40 object-cover" />
          ) : (
            <p className="panel flex h-40 w-40 items-center p-3 text-sm">
              <Todo>TODO(owner): photo at /public/about/owner.jpg</Todo>
            </p>
          )}
          <div className="min-w-0 flex-1 basis-64">
            <p className="display text-2xl">
              <Todo>{OWNER.name}</Todo>
            </p>
            <p className="mt-2">
              <Todo>{OWNER.bio}</Todo>
            </p>
          </div>
        </div>

        <h2 className={h2}>Why</h2>
        <p className="mt-3">
          <Todo>{OWNER.why}</Todo>
        </p>

        <h2 className={h2}>How this site is made</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Medical statements cite published papers indexed in PubMed, or public health pages such as the NHS and the US
            National Institute of Diabetes and Digestive and Kidney Diseases. The sources sit under each topic.
          </li>
          <li>
            Scripts check cited titles and quoted figures against PubMed, and that linked addresses respond. They cannot
            judge whether a sentence is a fair reading, which is what clinical review is for.
          </li>
          <li>
            Pages show when they were last checked. The topics were last checked on{" "}
            <span className="timecode">{LAST_CHECKED}</span>.
          </li>
          <li>
            The code and writing are open: <External href={REPO_URL}>source on GitHub</External>.
          </li>
          <li>
            Found an error? <External href={`${REPO_URL}/issues`}>Report it as a GitHub issue</External>. Issues are
            public, so leave out personal and health details.
          </li>
        </ul>

        <h2 className={h2}>Clinical review status</h2>
        <p className="mt-3">
          {reviewStatement()}{" "}
          <Link href="/reviewers" className={inline}>
            Review status by page
          </Link>
        </p>

        <h2 className={h2}>Contact</h2>
        <ul className="mt-3 space-y-2">
          <li>
            {isSet(OWNER.email) ? (
              <a href={`mailto:${OWNER.email}`} className={inline}>
                {OWNER.email}
              </a>
            ) : (
              <Todo>{OWNER.email}</Todo>
            )}
          </li>
          <Profile label="GitHub profile" url={OWNER.github} />
          <Profile label="LinkedIn" url={OWNER.linkedin} />
        </ul>
        <p className="mt-3 text-sm text-[var(--ink-soft)]">
          This is not a place for medical questions. Nobody here can advise on your care.
        </p>
      </div>
    </Page>
  );
}
