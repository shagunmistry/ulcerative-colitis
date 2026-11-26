import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import Journal from "../app/journal/page";
import Privacy from "../app/privacy/page";
import { Header } from "../components/Header";

vi.mock("next/navigation", () => ({ usePathname: () => "/journal" }));
vi.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme: undefined, setTheme: () => {} }) }));

const html = renderToStaticMarkup(<Journal />).replaceAll("&#x27;", "'");

describe("journal page", () => {
  it("opens with the on-device, not-monitored warning and urgent-care link", () => {
    for (const words of [
      "Your entries are stored only on this device.",
      "We can't see them.",
      "Clearing your browser data deletes them.",
      "This is not medical advice and isn't monitored by anyone.",
      "for your own tracking, not a clinical score",
    ]) {
      expect(html).toContain(words);
    }
    expect(html).toContain('href="/understand#urgent-care"');
  });

  it("sends no form to the server if scripts have not loaded", () => {
    expect(html).not.toMatch(/<(form|input|textarea)/);
    expect(html).toContain("<noscript>");
  });

  it("is in the main menu", () => {
    expect(renderToStaticMarkup(<Header />)).toContain('href="/journal"');
  });

  it("has no way to send anything", () => {
    const files = ["journal", "components/journal"].flatMap((dir) =>
      readdirSync(join(__dirname, "..", dir)).map((f) => join(__dirname, "..", dir, f)),
    );
    expect(files.length).toBeGreaterThan(4);
    for (const f of files) {
      expect(readFileSync(f, "utf8"), f).not.toMatch(/fetch\(|XMLHttpRequest|sendBeacon|WebSocket|action=|method=/);
    }
  });

  it("is described on the privacy page", () => {
    const privacy = renderToStaticMarkup(<Privacy />);
    expect(privacy).toContain("IndexedDB");
    expect(privacy).not.toContain("does not ask for health information");
  });
});
