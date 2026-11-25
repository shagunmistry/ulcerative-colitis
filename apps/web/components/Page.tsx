import { getSource, LAST_CHECKED, sourceUrl } from "@uc/evidence";
import { External } from "./External";

export function Page({
  title,
  intro,
  evidence = false,
  children,
}: {
  title: string;
  intro: string;
  /** show when the page makes medical claims */
  evidence?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-6 py-14 lg:px-10">
      <h1 className="display max-w-3xl text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-prose text-[var(--ink-soft)]">{intro}</p>
      <div className="mt-12">{children}</div>
      {evidence && (
        <p className="slug mt-12 text-[var(--ink-soft)]">
          Checked against the cited sources on <span className="timecode">{LAST_CHECKED}</span>. Not yet reviewed by a
          clinician.
        </p>
      )}
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
            <External href={sourceUrl(source)}>{source.title}</External>
            <span className="text-[var(--ink-soft)]">
              {" "}
              {source.journal}
              {source.year && (
                <>
                  , <span className="timecode">{source.year}</span>
                </>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
