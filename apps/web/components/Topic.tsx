import { linksFor, type Topic as TopicData } from "@uc/evidence";
import { External } from "./External";
import { Cite } from "./Page";

const summary = "slug cursor-pointer py-2 text-[var(--ink-soft)] hover:text-[var(--source)]";

export function Topic({ topic }: { topic: TopicData }) {
  const links = linksFor(topic.id);
  return (
    <article id={topic.id} className="grid scroll-mt-32 gap-x-10 gap-y-2 py-8 md:grid-cols-[16rem_1fr]">
      <div>
        <h3 className="display text-2xl">{topic.title}</h3>
        {topic.badge && <p className="slug mt-1 text-[var(--sage)]">{topic.badge}</p>}
      </div>
      <div className="max-w-prose">
        <p className="text-lg">{topic.plain}</p>
        <p className="mt-3 text-[var(--signal)]">{topic.caveat}</p>
        <details className="mt-4 border-t border-[var(--rule)]">
          <summary className={summary}>The science</summary>
          <ul className="list-disc space-y-2 pb-3 pl-5">
            {topic.science.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </details>
        <details className="border-t border-[var(--rule)]">
          <summary className={summary}>Sources and further reading</summary>
          <div className="pb-3">
            <Cite ids={topic.sourceIds} />
            {links.length > 0 && (
              <>
                <h4 className="slug mt-4">Further reading</h4>
                <ul className="mt-1 space-y-1">
                  {links.map((link) => (
                    <li key={link.id} className="text-sm">
                      <External href={link.url}>{link.title}</External>
                      <span className="text-[var(--ink-soft)]"> {link.publisher}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </details>
      </div>
    </article>
  );
}

export function TopicList({ topics }: { topics: TopicData[] }) {
  return (
    <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
      {topics.map((t) => (
        <Topic key={t.id} topic={t} />
      ))}
    </div>
  );
}

export function Contents({ topics }: { topics: TopicData[] }) {
  return (
    <nav aria-label="On this page" className="flex flex-wrap gap-x-6 gap-y-1">
      {topics.map((t) => (
        <a key={t.id} href={`#${t.id}`} className="slug py-1 text-[var(--ink-soft)] hover:text-[var(--source)]">
          {t.title}
        </a>
      ))}
    </nav>
  );
}
