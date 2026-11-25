"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const MENU = [
  { href: "/understand", label: "Understand" },
  { href: "/treatments", label: "Treatments" },
  { href: "/simulator", label: "Simulator" },
  { href: "/data", label: "Data" },
  { href: "/search", label: "Search" },
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
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-4 max-[374px]:px-3 lg:px-10">
        <Link href="/" className="display text-lg hover:text-[var(--source)]">
          Ulcerative Colitis
        </Link>
        <nav aria-label="Main" className="order-3 w-full md:order-none md:w-auto">
          <ul className="flex items-center justify-between gap-0.5 md:justify-start md:gap-8">
            {MENU.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`slug border-b py-1 transition-colors max-[374px]:py-1.5 max-[374px]:text-[0.75rem] ${
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
