export interface Reviewer {
  /** short key, used as `reviewer_id` in pages.ts */
  id: string;
  name: string;
  /** for example "MD" or "RN, IBD nurse specialist" */
  credentials: string;
  affiliation: string;
  /** a page where a reader can confirm who this is */
  url: string;
  /** what they declared, or "None declared" */
  conflicts_of_interest: string;
}

/**
 * Add a person here only after they have agreed to be named. See docs/CLINICAL_REVIEW.md.
 * Empty on purpose: no clinician has reviewed the site yet.
 */
export const REVIEWERS: Reviewer[] = [
  // {
  //   id: "jdoe",
  //   name: "Full name",
  //   credentials: "MD",
  //   affiliation: "Hospital or university",
  //   url: "https://example.org/profile",
  //   conflicts_of_interest: "None declared",
  // },
];
