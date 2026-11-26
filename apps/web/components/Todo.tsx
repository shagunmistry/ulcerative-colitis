import { isSet } from "@/owner";

/** Shows a value, or makes it obvious that the owner still has to supply it. */
export function Todo({ children }: { children: string }) {
  if (isSet(children)) return <>{children}</>;
  return <mark className="timecode border border-dashed border-[var(--signal)] bg-transparent px-1 text-[var(--signal)]">{children}</mark>;
}
