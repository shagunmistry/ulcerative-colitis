import Link from "next/link";
import { Simulator } from "@/components/Simulator";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 py-10 lg:px-10">
      <h1 className="display max-w-3xl text-4xl sm:text-5xl">Watch ulcerative colitis take hold, then push it back</h1>
      <p className="mt-4 max-w-prose text-[var(--ink-soft)]">
        Set how susceptible the colon is, trigger a flare, add treatments and follow a simulated year. Read what is
        known about <Link href="/causes" className="text-[var(--source)] underline underline-offset-4">causes</Link> and{" "}
        <Link href="/treatments" className="text-[var(--source)] underline underline-offset-4">medicines</Link>.
      </p>
      <p className="mb-8 mt-3 max-w-prose text-[var(--signal)]">
        The simulation is a hand-built teaching model. It does not predict anyone&apos;s disease or response to
        treatment.{" "}
        <Link href="/model" className="underline underline-offset-4">How it works</Link>
      </p>
      <Simulator />
    </div>
  );
}
