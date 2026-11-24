"use client";

import { search } from "@uc/evidence";
import Link from "next/link";
import { useState } from "react";
import { External } from "./External";

/** The query stays in memory: it is never written to the address bar or sent anywhere. */
export function SearchBox() {
  const [query, setQuery] = useState("");
  const hits = search(query);

  return (
    <div className="max-w-2xl">
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="q" className="slug">
          Search topics and further reading
        </label>
        <input
          id="q"
          type="search"
          autoComplete="off"
          placeholder="For example: steroids, diet, infliximab"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-2 w-full border border-[var(--rule)] bg-[var(--paper-deep)] px-4 py-3 text-lg"
        />
      </form>
      <p role="status" className="mt-4 text-sm text-[var(--ink-soft)]">
        {query.trim().length < 2
          ? "Type at least two letters."
          : hits.length === 0
            ? "Nothing matched. Try a shorter or different word."
            : `${hits.length} ${hits.length === 1 ? "result" : "results"}`}
      </p>
      <ul className="mt-2 divide-y divide-[var(--rule)]">
        {hits.map((hit) => (
          <li key={hit.href} className="py-4">
            {hit.kind === "topic" ? (
              <Link href={hit.href} className="display text-xl text-[var(--source)] underline-offset-4 hover:underline">
                {hit.title}
              </Link>
            ) : (
              <External href={hit.href}>{hit.title}</External>
            )}
            <p className="mt-1 text-sm text-[var(--ink-soft)]">{hit.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
