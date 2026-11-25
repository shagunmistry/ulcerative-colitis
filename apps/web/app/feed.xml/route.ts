import { LAST_CHECKED, TOPICS, topicHref } from "@uc/evidence";
import { SITE_URL } from "../../lib";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const base = SITE_URL;
  const updated = `${LAST_CHECKED}T00:00:00Z`;

  const entries = TOPICS.map((topic) => {
    const href = `${base}${topicHref(topic)}`;
    return `    <entry>
      <title>${escapeXml(topic.title)}</title>
      <link href="${escapeXml(href)}" />
      <id>${escapeXml(href)}</id>
      <updated>${updated}</updated>
      <summary>${escapeXml(topic.plain)}</summary>
    </entry>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Ulcerative Colitis</title>
  <subtitle>Plain-language topics on ulcerative colitis, with sources.</subtitle>
  <link href="${escapeXml(`${base}/feed.xml`)}" rel="self" />
  <link href="${escapeXml(`${base}/`)}" />
  <id>${escapeXml(`${base}/`)}</id>
  <updated>${updated}</updated>
  <author>
    <name>Ulcerative Colitis</name>
  </author>
${entries}
</feed>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
