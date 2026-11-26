export function External({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-[var(--source)] underline underline-offset-4">
      {children}
      <span className="text-[var(--ink-soft)]"> (external)</span>
    </a>
  );
}
