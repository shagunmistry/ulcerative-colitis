/*
 * Offline support. Medical text must never go stale, so the network always comes
 * first and saved copies are only used when it cannot be reached.
 */
const CACHE = "uc-v2";

const SHELL = [
  "/",
  "/understand",
  "/treatments",
  "/treatments/other",
  "/simulator",
  "/simulator/model",
  "/search",
  "/privacy",
  "/disclaimer",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

async function save(event, cache, response) {
  // A full cache must not break the page.
  if (response.ok) event.waitUntil(cache.put(event.request, response.clone()).catch(() => {}));
}

async function networkFirst(event) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(event.request);
    await save(event, cache, response);
    return response;
  } catch (error) {
    const saved = await cache.match(event.request);
    if (saved) return saved;
    throw error;
  }
}

/** Only for build files, whose names change whenever their content does. */
async function cacheFirst(event) {
  const cache = await caches.open(CACHE);
  const saved = await cache.match(event.request);
  if (saved) return saved;
  const response = await fetch(event.request);
  await save(event, cache, response);
  return response;
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/_vercel/")) return;
  event.respondWith(url.pathname.startsWith("/_next/static/") ? cacheFirst(event) : networkFirst(event));
});
