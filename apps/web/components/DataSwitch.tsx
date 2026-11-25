import Link from "next/link";

const TABS = [
  { href: "/data", label: "Library" },
  { href: "/data/search", label: "Live search" },
];

export function DataSwitch({ current }: { current: string }) {
  return (
    <nav aria-label="Data section" className="mb-10 inline-flex border border-[var(--rule)]">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={tab.href === current ? "page" : undefined}
          className={`px-4 py-2 text-sm font-medium ${
            tab.href === current ? "bg-[var(--ink)] text-[var(--paper)]" : "hover:text-[var(--source)]"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
