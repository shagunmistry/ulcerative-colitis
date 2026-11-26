import { readFileSync } from "node:fs";
import { join } from "node:path";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

const SOURCE = readFileSync(join(__dirname, "../public/sw.js"), "utf8");
const ORIGIN = "https://ulcerative-colitis.vercel.app";

/** Runs the real service worker against an in-memory network and cache. */
function start() {
  const stores = new Map<string, Map<string, Response>>();
  const open = (name: string) => {
    if (!stores.has(name)) stores.set(name, new Map());
    const store = stores.get(name)!;
    return {
      match: async (request: { url: string }) => store.get(request.url)?.clone(),
      put: async (request: { url: string }, response: Response) => void store.set(request.url, response),
      addAll: async (paths: string[]) => void installed.push(...paths),
    };
  };
  const installed: string[] = [];
  const server = { online: true, body: "old" };
  const handlers: Record<string, (event: any) => void> = {};
  runInNewContext(SOURCE, {
    URL,
    caches: {
      open: async (name: string) => open(name),
      keys: async () => [...stores.keys()],
      delete: async (name: string) => stores.delete(name),
    },
    fetch: async () => {
      if (!server.online) throw new TypeError("offline");
      return new Response(server.body);
    },
    self: {
      location: { origin: ORIGIN },
      addEventListener: (type: string, handler: (event: any) => void) => (handlers[type] = handler),
      skipWaiting: async () => {},
      clients: { claim: async () => {} },
    },
  });

  /** Returns the body served, or null when the worker leaves the request to the browser. */
  async function get(path: string, mode = "cors") {
    let reply: Promise<Response> | undefined;
    const pending: Promise<unknown>[] = [];
    handlers.fetch!({
      request: { url: path.startsWith("http") ? path : ORIGIN + path, method: "GET", mode },
      respondWith: (r: Promise<Response>) => (reply = r),
      waitUntil: (p: Promise<unknown>) => pending.push(p),
    });
    if (!reply) return null;
    const text = await (await reply).text();
    await Promise.all(pending);
    return text;
  }

  async function activate() {
    let done: Promise<unknown> | undefined;
    handlers.activate!({ waitUntil: (p: Promise<unknown>) => (done = p) });
    await done;
  }

  /** Returns the paths that must all download for the worker to install. */
  async function install() {
    let done: Promise<unknown> | undefined;
    handlers.install!({ waitUntil: (p: Promise<unknown>) => (done = p) });
    await done;
    return installed;
  }

  return { server, stores, get, activate, install };
}

describe("service worker", () => {
  it.each([
    ["a full page load", "/understand", "navigate"],
    ["the data used when clicking between pages", "/understand?_rsc=abc", "cors"],
    ["the feed", "/feed.xml", "cors"],
  ])("shows corrected content at once for %s", async (_, path, mode) => {
    const sw = start();
    expect(await sw.get(path, mode)).toBe("old");
    sw.server.body = "corrected";
    expect(await sw.get(path, mode)).toBe("corrected");
  });

  it("falls back to the latest saved copy when offline", async () => {
    const sw = start();
    await sw.get("/understand", "navigate");
    sw.server.body = "corrected";
    await sw.get("/understand", "navigate");
    sw.server.online = false;
    expect(await sw.get("/understand", "navigate")).toBe("corrected");
  });

  it("fails normally when offline with nothing saved", async () => {
    const sw = start();
    sw.server.online = false;
    await expect(sw.get("/understand", "navigate")).rejects.toThrow("offline");
  });

  it("reuses saved copies of files whose names change with their content", async () => {
    const sw = start();
    await sw.get("/_next/static/chunks/a1b2.js");
    sw.server.body = "different";
    expect(await sw.get("/_next/static/chunks/a1b2.js")).toBe("old");
  });

  it.each(["https://example.org/x.js", "/_vercel/insights/script.js"])("leaves %s alone", async (path) => {
    expect(await start().get(path)).toBeNull();
  });

  it("saves the data library for offline use, without needing its JSON copy", async () => {
    const shell = await start().install();
    expect(shell).toContain("/data");
    expect(shell).toContain("/data/search");
    expect(shell).not.toContain("/data/datasets.json");
  });

  it.each(["uc-v1", "uc-v2", "uc-v3", "uc-v4"])("deletes the old cache %s", async (name) => {
    const sw = start();
    sw.stores.set(name, new Map());
    await sw.activate();
    expect([...sw.stores.keys()]).not.toContain(name);
  });
});
