import { LINKS } from "./links";
import { TOPICS, URGENT, topicHref } from "./topics";

export interface Hit {
  title: string;
  href: string;
  snippet: string;
  kind: "topic" | "link";
}

/** Folds case, accents and common British spellings so either form matches. */
const fold = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/ae|oe/g, "e")
    .replace(/our/g, "or");

const words = (text: string) => fold(text).split(/[^\p{L}\p{N}]+/u).filter(Boolean);

const urgentTitle = "When to get urgent care";

const INDEX = [
  {
    hit: {
      title: urgentTitle,
      href: "/understand#urgent-care",
      snippet: "Symptoms that need emergency care or same-day medical advice.",
      kind: "topic" as const,
    },
    title: fold(urgentTitle),
    body: fold([urgentTitle, "emergency", ...URGENT.emergency, ...URGENT.urgent].join(" ")),
  },
  ...TOPICS.map((t) => ({
    hit: { title: t.title, href: topicHref(t), snippet: t.plain, kind: "topic" as const },
    title: fold(t.title),
    body: fold([t.title, t.plain, t.caveat, ...t.science].join(" ")),
  })),
  ...LINKS.map((l) => ({
    hit: { title: l.title, href: l.url, snippet: `${l.publisher}, ${l.kind}`, kind: "link" as const },
    title: fold(l.title),
    body: fold(`${l.title} ${l.publisher} ${l.kind}`),
  })),
];

export function search(query: string, limit = 20): Hit[] {
  // Single characters match nearly everything, so they are ignored.
  const terms = words(query).filter((term) => term.length > 1);
  if (!terms.length) return [];
  return INDEX.filter((entry) => terms.every((term) => entry.body.includes(term)))
    .map((entry) => ({
      hit: entry.hit,
      score: terms.filter((term) => entry.title.includes(term)).length * 10 + (entry.hit.kind === "topic" ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.hit);
}
