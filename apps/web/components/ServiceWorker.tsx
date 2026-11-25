"use client";

import { useEffect } from "react";

/** Registers the service worker so pages stay available offline after the first visit. */
export function ServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Registration can fail in private browsing or when the origin is not secure.
    });
  }, []);

  return null;
}
