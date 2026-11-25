/** The only titles a preview image can show, so nobody can put their own words on one. */
export const OG_TITLES = {
  understand: "Understand ulcerative colitis",
  medicines: "Medicines for ulcerative colitis",
  other: "Supplements, microbes and diet",
} as const;

export type OgPage = keyof typeof OG_TITLES;

export const ogTitle = (page: string | null) =>
  OG_TITLES[page && Object.hasOwn(OG_TITLES, page) ? (page as OgPage) : "understand"];

export const ogImage = (page: OgPage) => ({ url: `/og?page=${page}`, width: 1200, height: 630 });
