import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { LAST_CHECKED } from "@uc/evidence";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "../app/feed.xml/route";

const SITE = "https://ulcerative-colitis.vercel.app";
const root = join(__dirname, "..");

const files = (dir: string): string[] =>
  readdirSync(join(root, dir), { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)],
  );

describe("site address", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("never points at a domain the project does not own", () => {
    const offenders = ["app", "components", "public"]
      .flatMap(files)
      .filter((file) => readFileSync(join(root, file), "utf8").includes("ulcerativecolitis.org"));
    expect(offenders).toEqual([]);
  });

  it("uses the public address in the feed, even on a Vercel deployment", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL_URL", "ulcerative-colitis-abc123-team.vercel.app");
    const xml = await GET().text();
    const addresses = [...xml.matchAll(/<link href="([^"]+)"/g)].map((m) => m[1]!);
    expect(addresses.length).toBeGreaterThan(1);
    for (const address of addresses) expect(address.startsWith(`${SITE}/`), address).toBe(true);
  });

  it("dates feed entries by when the content was checked, not when it was fetched", async () => {
    const xml = await GET().text();
    const dates = new Set([...xml.matchAll(/<updated>([^<]+)<\/updated>/g)].map((m) => m[1]));
    expect([...dates]).toEqual([`${LAST_CHECKED}T00:00:00Z`]);
  });
});
