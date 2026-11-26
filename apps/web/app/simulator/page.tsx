import type { Metadata } from "next";
import Link from "next/link";
import { Helpful } from "@/components/Helpful";
import { ReviewBadge } from "@/components/ReviewBadge";
import { Simulator } from "@/components/Simulator";

export const metadata: Metadata = { title: "Simulator" };

const inline = "text-[var(--source)] underline underline-offset-4";

export default function SimulatorPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 py-10 lg:px-10">
      <h1 className="display max-w-3xl text-4xl sm:text-5xl">Watch ulcerative colitis take hold, then push it back</h1>
      <div className="mt-4">
        <ReviewBadge path="/simulator" />
      </div>
      <p className="mt-4 max-w-prose text-[var(--ink-soft)]">
        Set how susceptible the colon is, trigger a flare, add treatments and follow a simulated year. Read what is
        known about{" "}
        <Link href="/understand#genes" className={inline}>
          causes
        </Link>{" "}
        and{" "}
        <Link href="/treatments" className={inline}>
          medicines
        </Link>
        .
      </p>
      <p className="mb-8 mt-3 max-w-prose text-[var(--signal)]">
        The simulation is a hand-built teaching model. It does not predict anyone&apos;s disease or response to
        treatment.{" "}
        <Link href="/simulator/model" className="underline underline-offset-4">
          Model card: assumptions and limits
        </Link>
      </p>
      <Simulator />
      <Helpful path="/simulator" />
    </div>
  );
}
