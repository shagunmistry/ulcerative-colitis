import { ImageResponse } from "next/og";
import { ogTitle } from "../../og-pages";

export const runtime = "edge";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = ogTitle(searchParams.get("page"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3e4cf",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: "#1a1310", maxWidth: 900, lineHeight: 1.1 }}>{title}</div>
        </div>
        <div style={{ fontSize: 28, color: "#971b12" }}>
          Ulcerative Colitis: plain language, sources and a 3D simulation
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
