"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

/** Wraps a term and shows its definition on hover, tap or keyboard focus. */
export function Glossary({
  definition,
  source,
  children,
}: {
  definition: string;
  source: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const id = useId();
  const tip = useRef<HTMLSpanElement>(null);

  // Centred over the term, then nudged back if that would leave the screen.
  useLayoutEffect(() => {
    const box = open ? tip.current?.getBoundingClientRect() : undefined;
    if (!box) return;
    const margin = 8;
    const width = document.documentElement.clientWidth;
    const shift = Math.max(margin - box.left, 0) + Math.min(width - margin - box.right, 0);
    tip.current!.style.marginLeft = `${shift}px`;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span
      ref={ref}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-describedby={open ? id : undefined}
      className="relative inline cursor-help border-b border-dotted border-[var(--ink-soft)]"
      onClick={() => setOpen((value) => !value)}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setOpen((value) => !value);
        }
      }}
    >
      {children}
      {open && (
        <span
          ref={tip}
          id={id}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[16rem] -translate-x-1/2 border border-[var(--rule)] bg-[var(--paper-deep)] px-3 py-2 text-left text-sm font-normal leading-snug text-[var(--ink)] shadow-lg"
        >
          {definition}
          <span className="mt-1 block text-xs text-[var(--source)]">Source: {source}</span>
        </span>
      )}
    </span>
  );
}
