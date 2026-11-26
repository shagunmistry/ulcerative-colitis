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
