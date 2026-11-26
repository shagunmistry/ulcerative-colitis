import { getPage, getSource, sourceUrl } from "@uc/evidence";
import { External } from "./External";
import { Helpful } from "./Helpful";
import { ReviewBadge } from "./ReviewBadge";

export function Page({
  title,
  intro,
  content,
  children,
}: {
  title: string;
  intro: string;
  /** the page's path in PAGES, when it makes medical or scientific claims */
  content?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-6 py-14 lg:px-10">
      <h1 className="display max-w-3xl text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-prose text-[var(--ink-soft)]">{intro}</p>
      {content && (
        <div className="mt-5">
          <ReviewBadge path={content} />
        </div>
      )}
      <div className="mt-12">{children}</div>
      {content && (
        <p className="slug mt-12 text-[var(--ink-soft)]">
          Last checked against its sources on <span className="timecode">{getPage(content).checkedOn}</span>.
        </p>
      )}
      {content && <Helpful key={content} path={content} />}
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
