import { LAST_CHECKED } from "./content.ts";
import type { Review } from "./review.ts";

/** A page that makes medical or scientific claims, and so can be clinically reviewed. */
export interface ContentPage {
  path: string;
  /** short stable name, used in analytics events */
  slug: string;
  title: string;
  /** date the page was last checked against its sources or code */
  checkedOn: string;
  review: Review;
}

const unreviewed = (): Review => ({ status: "unreviewed", reviewer_id: null, reviewed_on: null, notes: null });

/**
 * To record a review, change that page's `review`, for example
 * { status: "reviewed", reviewer_id: "jdoe", reviewed_on: "2027-01-15", notes: null }.
 * If the page's content later changes in substance, set it back to "unreviewed".
 */
export const PAGES: ContentPage[] = [
  { path: "/understand", slug: "understand", title: "Understand ulcerative colitis", checkedOn: LAST_CHECKED, review: unreviewed() },
  { path: "/treatments", slug: "treatments", title: "Medicines", checkedOn: LAST_CHECKED, review: unreviewed() },
  { path: "/treatments/other", slug: "other-approaches", title: "Supplements, microbes and diet", checkedOn: LAST_CHECKED, review: unreviewed() },
  { path: "/simulator", slug: "simulator", title: "Simulator", checkedOn: LAST_CHECKED, review: unreviewed() },
  { path: "/simulator/model", slug: "model-card", title: "Simulator model card", checkedOn: "2026-11-26", review: unreviewed() },
  { path: "/data", slug: "data", title: "Data library", checkedOn: "2026-11-25", review: unreviewed() },
];
