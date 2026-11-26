import { DATASETS, LINKS, keyPapers } from "@uc/evidence";
import type { Metadata } from "next";
import Link from "next/link";
import { DataSwitch } from "@/components/DataSwitch";
import { DatasetList } from "@/components/DatasetList";
import { External } from "@/components/External";
import { Cite, Page } from "@/components/Page";

export const metadata: Metadata = { title: "Data" };

const heading = "display text-3xl";

export default function Data() {
  return (
    <Page
      content="/data"
      title="Data library"
      intro="Datasets, research papers and registries about ulcerative colitis and inflammatory bowel disease. We link to them and do not host the data. Read each source's terms before you use it."
    >
      <DataSwitch current="/data" />
      <section>
        <h2 className={heading}>Datasets</h2>
        <p className="mt-2 max-w-prose text-sm text-[var(--ink-soft)]">
          Details come from the pages of each host and its authors, read on the date shown. &ldquo;Not stated&rdquo; means
          we did not find it there. The same list is available as{" "}
          <a href="/data/datasets.json" className="text-[var(--source)] underline underline-offset-4">
            JSON
          </a>
          .
        </p>
        <div className="mt-6">
          <DatasetList datasets={DATASETS} />
        </div>
      </section>

      <section className="mt-16">
        <h2 className={heading}>Key papers</h2>
        <p className="mt-2 max-w-prose text-sm text-[var(--ink-soft)]">
          The PubMed papers cited on this site, grouped by the topics that cite them. A paper cited by several topics
          appears under each.
        </p>
        <div className="mt-6 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
          {keyPapers().map((group) => (
            <div key={group.title} className="grid gap-x-10 py-6 md:grid-cols-[16rem_1fr]">
              <h3 className="display text-xl">
                {group.href ? (
                  <Link href={group.href} className="underline-offset-4 hover:text-[var(--source)] hover:underline">
                    {group.title}
                  </Link>
                ) : (
                  group.title
                )}
              </h3>
              <div className="max-w-prose">
                <Cite ids={group.sources.map((s) => s.id)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className={heading}>Registries and tools</h2>
        <ul className="mt-4 space-y-2">
          {LINKS.filter((link) => link.kind === "registry").map((link) => (
            <li key={link.id}>
              <External href={link.url}>{link.title}</External>
              <span className="text-[var(--ink-soft)]">
                {" "}
                {link.publisher}. Last checked <span className="timecode">{link.checkedOn}</span>.
              </span>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
