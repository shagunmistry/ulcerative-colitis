import { topicHref, type Topic } from "@uc/evidence";

/** The only public address the project owns. */
export const SITE_URL = "https://ulcerative-colitis.vercel.app";
export const REPO_URL = "https://github.com/shagunmistry/ulcerative-colitis";

/** A new GitHub issue, already naming the topic it is about. */
export function reportUrl(topic: Topic) {
  const query = new URLSearchParams({
    title: `Feedback: ${topic.title}`,
    body: `Page: ${SITE_URL}${topicHref(topic)}\n\nWhat was unclear or wrong?\n\n(Issues are public. Do not include personal or health details.)`,
  });
  return `${REPO_URL}/issues/new?${query}`;
}
