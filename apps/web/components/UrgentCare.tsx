import { URGENT } from "@uc/evidence";
import { Cite } from "./Page";

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function UrgentCare() {
  return (
    <section id="urgent-care" aria-labelledby="urgent-title" className="panel scroll-mt-32 border-l-2 !border-l-[var(--signal)] p-5">
      <h2 id="urgent-title" className="display text-2xl text-[var(--signal)]">
        When to get urgent care
      </h2>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <List title="Call emergency services or go to an emergency department for" items={URGENT.emergency} />
        <List title="Get same-day medical advice for symptoms with" items={URGENT.urgent} />
      </div>
      <p className="mt-4 text-sm text-[var(--ink-soft)]">
        From NHS advice. In an emergency, do not drive yourself.
      </p>
      <Cite ids={[URGENT.sourceId]} />
    </section>
  );
}
