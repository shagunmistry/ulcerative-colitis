export function External({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-[var(--source)] underline-offset-4 hover:underline">
      {children}
      <span className="text-[var(--ink-soft)]"> (external)</span>
    </a>
  );
}
