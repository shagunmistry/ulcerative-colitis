"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const MENU = [
  { href: "/", label: "Simulator" },
  { href: "/causes", label: "Causes" },
  { href: "/treatments", label: "Medicines" },
  { href: "/alternatives", label: "Other approaches" },
  { href: "/model", label: "How the model works" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const next = resolvedTheme === "light" ? "dark" : "light";
  return (
    <button className="button w-16" onClick={() => setTheme(next)} aria-label={`Switch to ${next} theme`}>
      {mounted ? (next === "light" ? "Light" : "Dark") : " "}
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--rule)] bg-[color-mix(in_srgb,var(--paper)_85%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-4 lg:px-10">
        <Link href="/" className="display text-lg hover:text-[var(--source)]">
          Ulcerative Colitis
        </Link>
        <nav aria-label="Main" className="order-3 w-full overflow-x-auto lg:order-none lg:w-auto">
          <ul className="flex items-center gap-6 whitespace-nowrap">
            {MENU.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`slug border-b py-1 transition-colors ${
                      active
                        ? "border-[var(--source)] text-[var(--source)]"
                        : "border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
