import { TOPICS, topicHref } from "@uc/evidence";

function baseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return process.env.NODE_ENV === "production" ? "https://ulcerativecolitis.org" : "http://localhost:3000";
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const base = baseUrl();
  const updated = new Date().toISOString();

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
