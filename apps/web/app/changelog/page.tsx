import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { parseChangelog } from "@/changelog";
import { External } from "@/components/External";
import { Page } from "@/components/Page";
import { pageMetadata } from "@/meta";

export const metadata = pageMetadata("Changelog", "What has changed on this ulcerative colitis site, and when.");

/** Turns [text](address) and `code` into links and code. */
function inline(text: string): React.ReactNode {
  return text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`)/).map((part, i) => {
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      return href!.startsWith("/") ? (
        <Link key={i} href={href!} className="text-[var(--source)] underline underline-offset-4">
          {label}
        </Link>
      ) : (
        <External key={i} href={href!}>
          {label}
        </External>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="timecode">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default function Changelog() {
  // Read when the page is built; the file lives at the root of the repository.
  const releases = parseChangelog(readFileSync(join(process.cwd(), "../../CHANGELOG.md"), "utf8"));
  return (
    <Page title="Changelog" intro="What changed, newest first.">
      <div className="max-w-prose space-y-10">
        {releases.map((release) => (
          <section key={release.title}>
            <h2 className="display text-3xl">{release.title}</h2>
            {release.groups.map((group, i) => (
              <div key={group.title ?? i} className="mt-4">
                {group.title && <h3 className="font-semibold">{group.title}</h3>}
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {group.items.map((item) => (
                    <li key={item}>{inline(item)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>
    </Page>
  );
}
