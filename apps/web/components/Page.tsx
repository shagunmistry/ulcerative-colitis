import { getSource, LAST_CHECKED, sourceUrl } from "@uc/evidence";

export function Page({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-6 py-14 lg:px-10">
      <h1 className="display max-w-3xl text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-prose text-[var(--ink-soft)]">{intro}</p>
      <div className="mt-12">{children}</div>
      <p className="slug mt-12 text-[var(--ink-soft)]">
        Figures compared with their PubMed abstracts on <span className="timecode">{LAST_CHECKED}</span>. Not yet
        reviewed by a clinician.
      </p>
    </div>
  );
}

export function Cite({ ids }: { ids: string[] }) {
  return (
    <ul className="mt-3 space-y-1">
      {ids.map((id) => {
        const source = getSource(id);
        return (
          <li key={id} className="text-sm">
            <a
              href={sourceUrl(source)}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--source)] underline-offset-4 hover:underline"
            >
              {source.title}
            </a>
            <span className="text-[var(--ink-soft)]">
              {" "}
              {source.journal}, <span className="timecode">{source.year}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
