import { External } from "@/components/External";
import { Page } from "@/components/Page";
import { Todo } from "@/components/Todo";
import { formUrl, REPO_URL } from "@/lib";
import { pageMetadata } from "@/meta";
import { isSet, OWNER } from "@/owner";

export const metadata = pageMetadata(
  "Get involved",
  "How people with ulcerative colitis, caregivers, clinicians, developers and researchers can help shape this project.",
);

const h2 = "display text-2xl";

function SignUp() {
  const form = formUrl(process.env.NEXT_PUBLIC_ADVISORY_FORM_URL);
  if (form) return <External href={form}>Open the sign-up form</External>;
  return (
    <>
      Email{" "}
      {isSet(OWNER.email) ? (
        <a href={`mailto:${OWNER.email}`} className="text-[var(--source)] underline underline-offset-4">
          {OWNER.email}
        </a>
      ) : (
        <Todo>{OWNER.email}</Todo>
      )}
    </>
  );
}

export default function GetInvolved() {
  return (
    <Page title="Get involved" intro="This project should be built with the people it is about. Pick the path that fits you.">
      <div className="grid max-w-3xl gap-6">
        <section className="panel p-6">
          <h2 className={h2}>People with UC and caregivers</h2>
          <p className="mt-3">
            We are planning a patient advisory group. Members would join co-design calls and help decide how the journal,
            the consent terms and any future data sharing work. It has not been formed yet.
          </p>
          <p className="mt-3">
            Stipend: <Todo>TODO(owner): stipend amount and terms</Todo>
          </p>
          <p className="mt-3">
            <SignUp />
          </p>
          <p className="mt-3 text-sm text-[var(--ink-soft)]">
            Signing up happens outside this site, so that service&apos;s privacy terms apply. We do not need your medical
            details, so leave them out.
          </p>
        </section>

        <section className="panel p-6">
          <h2 className={h2}>Clinicians</h2>
          <p className="mt-3">
            Review one page for accuracy, fair evidence labels, urgent-care guidance and wording that could cause harm.
          </p>
          <p className="mt-3">
            <External href={`${REPO_URL}/blob/main/docs/CLINICAL_REVIEW.md`}>Read the reviewer checklist</External>
          </p>
        </section>

        <section className="panel p-6">
          <h2 className={h2}>Developers and researchers</h2>
          <p className="mt-3">Fix an error, add a source or dataset, improve the code, or critique the consent format.</p>
          <p className="mt-3">
            <External href={`${REPO_URL}/blob/main/CONTRIBUTING.md`}>Read the contributing guide</External>
          </p>
        </section>
      </div>
    </Page>
  );
}
