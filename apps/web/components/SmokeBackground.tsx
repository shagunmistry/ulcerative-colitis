"use client";

import dynamic from "next/dynamic";

const Smoke = dynamic(() => import("@/components/Smoke"), { ssr: false });

export function SmokeBackground() {
  return <Smoke variant="ambient" className="fixed inset-0 z-0" />;
}
