import { SOURCES, getSource, type Source } from "./sources";
import { TOPICS, topicHref } from "./topics";

export interface PaperGroup {
  title: string;
  /** the topic that cites these papers; absent for the rest */
  href?: string;
  sources: Source[];
}

/** Every PubMed source, under each topic that cites it, then any that no topic cites. */
export function keyPapers(): PaperGroup[] {
  const groups: PaperGroup[] = TOPICS.map((t) => ({
    title: t.title,
    href: topicHref(t),
    sources: [...new Set(t.sourceIds)].map(getSource).filter((s) => s.pmid),
  })).filter((g) => g.sources.length);
  const listed = new Set(groups.flatMap((g) => g.sources.map((s) => s.id)));
  const rest = SOURCES.filter((s) => s.pmid && !listed.has(s.id));
  return rest.length ? [...groups, { title: "Other cited papers", sources: rest }] : groups;
}
