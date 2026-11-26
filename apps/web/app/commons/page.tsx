import Link from "next/link";
import { External } from "@/components/External";
import { Page } from "@/components/Page";
import { Todo } from "@/components/Todo";
import { REPO_URL } from "@/lib";
import { pageMetadata } from "@/meta";

export const metadata = pageMetadata(
  "A patient-governed IBD data commons",
  "Where this project is going: local-first journals, consent terms that travel with the data, and access governed by patients.",
);

const h2 = "display mt-12 text-3xl";
const prose = "mt-3 max-w-prose";
const list = "mt-3 max-w-prose list-disc space-y-2 pl-5";
const inline = "text-[var(--source)] underline underline-offset-4";

function Planned() {
  return <span className="slug mr-2 border border-[var(--signal)] px-2 text-[var(--signal)]">Planned</span>;
}

export default function Commons() {
  return (
    <Page
      title="A patient-governed IBD data commons"
      intro="The goal: people with inflammatory bowel disease keep their own data, say how it may be used, and decide who can use it. Only the first small pieces exist today."
    >
      <h2 className="display text-3xl">The problem</h2>
      <p className={prose}>
        What people record in apps, and what registries and trials collect about them, usually flows to others. Patients
        often agree once, to long terms, and then have little say in who uses the data, for what, or whether they ever
        hear what was learned.
      </p>

      <h2 className={h2}>What we&apos;re building</h2>
      <ul className={list}>
        <li>
          <strong>Local-first journals:</strong> your record is kept on your device and works without an account.
        </li>
        <li>
          <strong>Consent terms that travel with the data:</strong> your wishes are written into the file you export.
        </li>
        <li>
          <Planned />
          <strong>Patient-governed access:</strong> people choose to contribute, and patients help decide who may use what
          is pooled and on what conditions.
        </li>
      </ul>

      <h2 className={h2}>What exists today</h2>
      <ul className={list}>
        <li>
          <Link href="/journal" className={inline}>
            My UC Journal
          </Link>
          , a prototype that stays in your browser, with export, import and delete.
        </li>
        <li>
          <External href={`${REPO_URL}/tree/main/spec/consent-terms`}>Consent terms 0.1</External>, a draft format for
          discussion with patients. It is not legally binding.
        </li>
        <li>
          This open site: <External href={REPO_URL}>code and writing</External> anyone can check and reuse.
        </li>
      </ul>
      <p className={prose}>
        There is no pooled data, no server holding anyone&apos;s entries and no way yet for a researcher to request
        access.
      </p>

      <h2 className={h2}>What&apos;s next</h2>
      <p className={prose}>
        <Planned />A twelve-month roadmap. These are intentions, and patients&apos; input may change them.
      </p>
      <ul className={list}>
        <li>Review the journal and the consent terms with people who live with UC.</li>
        <li>Form a patient advisory group.</li>
        <li>Have clinicians review the content pages.</li>
        <li>Work out how contributing, access requests and withdrawal would work before building any of them.</li>
      </ul>
      <p className={prose}>
        <Todo>TODO(owner): quarterly milestones for the next 12 months</Todo>
      </p>

      <h2 className={h2}>How it&apos;s governed</h2>
      <p className={prose}>
        <Planned />A patient advisory group with a real say over the journal, the consent terms and any future access
        rules. It has not been formed. Today the project is maintained in the open on GitHub.
      </p>
      <p className={prose}>
        <Todo>TODO(owner): patient advisory group members, decision rights and how often it meets</Todo>
      </p>

      <h2 className={h2}>Get involved</h2>
      <p className={prose}>
        People with UC, caregivers, clinicians, developers and researchers are all wanted.{" "}
        <Link href="/get-involved" className={inline}>
          See how to take part
        </Link>
      </p>
    </Page>
  );
}
