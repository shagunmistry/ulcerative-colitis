import Link from "next/link";
import { REPO_URL } from "@/lib";

const link = "hover:text-[var(--source)] underline underline-offset-4";

export function Footer() {
  return (
    <footer className="border-t border-[var(--rule)] px-6 py-8 text-sm text-[var(--ink-soft)] lg:px-10">
      <div className="mx-auto max-w-[1400px] space-y-4">
        <p className="max-w-prose">
          For learning, not medical advice. Do not start, stop or change any treatment because of what you see here; talk
          to your care team.{" "}
          <Link href="/understand#urgent-care" className={link}>
            When to get urgent care
          </Link>
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <Link href="/disclaimer" className={link}>
              Disclaimer
            </Link>
          </li>
          <li>
            <Link href="/privacy" className={link}>
              Privacy
            </Link>
          </li>
          <li>
            <a href={REPO_URL} target="_blank" rel="noreferrer" className={link}>
              GitHub (external)
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
