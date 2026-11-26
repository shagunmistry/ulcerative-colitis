import { topicHref, type Topic } from "@uc/evidence";

/** The only public address the project owns. */
export const SITE_URL = "https://ulcerative-colitis.vercel.app";
export const REPO_URL = "https://github.com/shagunmistry/ulcerative-colitis";

/** A new content-error issue, already naming the topic and page it is about. */
export function reportUrl(topic: Topic) {
  const query = new URLSearchParams({
    template: "content-error.yml",
    title: `Feedback: ${topic.title}`,
    page_url: `${SITE_URL}${topicHref(topic)}`,
  });
  return `${REPO_URL}/issues/new?${query}`;
}

/** A new patient-feedback issue about a page. */
export function feedbackIssueUrl(path: string) {
  const query = new URLSearchParams({ template: "patient-feedback.yml", page_url: `${SITE_URL}${path}` });
  return `${REPO_URL}/issues/new?${query}`;
}

/** An outside form's address from a setting, or nothing if it is unset or not https. */
export const formUrl = (value: string | undefined) => (value?.startsWith("https://") ? value : undefined);
