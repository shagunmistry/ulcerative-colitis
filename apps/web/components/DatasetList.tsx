"use client";

import {
  NOT_STATED,
  copyUrl,
  filterDatasets,
  loadSnippet,
  type Access,
  type Copy,
  type DataType,
  type Dataset,
} from "@uc/evidence";
import { useState } from "react";
import { External } from "./External";
import { TrackedDatasetLink } from "./TrackedDatasetLink";

const TYPES: Record<DataType, string> = {
  images: "Images",
  "gene-expression": "Gene expression",
  microbiome: "Microbiome",
  clinical: "Clinical",
  other: "Other",
};

const ACCESS: Record<Access, string> = {
  open: "Open",
  registration: "Registration",
  application: "Application",
  "not-stated": NOT_STATED,
};

const TYPE_OPTIONS = Object.keys(TYPES) as DataType[];
/** Unstated access is not something to filter for. */
const ACCESS_OPTIONS: Access[] = ["open", "registration", "application"];

function Filter<T extends string>({
  legend,
  options,
  labels,
  value,
  onChange,
}: {
  legend: string;
  options: T[];
  labels: Record<T, string>;
  value: T | undefined;
  onChange: (value: T | undefined) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="slug mb-2">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {[undefined, ...options].map((option) => (
          <button
            key={option ?? "all"}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className="button aria-pressed:border-[var(--ink)] aria-pressed:bg-[var(--ink)] aria-pressed:text-[var(--paper)]"
          >
            {option ? labels[option] : "All"}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function CopyButton({ text, name }: { text: string; name: string }) {
  const [result, setResult] = useState<"copied" | "failed">();

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setResult("copied");
    } catch {
      setResult("failed");
    }
  }

  return (
    <div className="mt-2 flex flex-wrap items-center gap-3">
      <button type="button" className="button" onClick={copy}>
        Copy<span className="sr-only"> code for {name}</span>
      </button>
      <span role="status" className="text-sm text-[var(--ink-soft)]">
        {result === "copied" && "Copied."}
        {result === "failed" && "Could not copy. Select the code instead."}
      </span>
    </div>
  );
}

function CopyItem({ dataset, copy }: { dataset: string; copy: Copy }) {
  const snippet = loadSnippet(copy);
  return (
    <li className="min-w-0">
      <p className="text-sm">
        <TrackedDatasetLink id={dataset} href={copyUrl(copy)}>
          {copy.host}: {copy.id}
        </TrackedDatasetLink>
      </p>
      <p className="mt-1 text-sm">
        <span className={copy.original ? "text-[var(--source)]" : "text-[var(--signal)]"}>
          {copy.original ? "Original release" : "Not named by the authors as the release"}
        </span>
        <span className="text-[var(--ink-soft)]">
          . Last checked <span className="timecode">{copy.checkedOn}</span>.
        </span>
      </p>
      {copy.note && <p className="mt-1 text-sm">{copy.note}</p>}
      <pre
        tabIndex={0}
        role="region"
        aria-label={`Load code for ${copy.id} on ${copy.host}`}
        className="timecode mt-2 overflow-x-auto border border-[var(--rule)] bg-[var(--paper)] p-3 text-sm"
      >
        <code>{snippet}</code>
      </pre>
      <CopyButton text={snippet} name={`${copy.id} on ${copy.host}`} />
    </li>
  );
}

const term = "slug text-[var(--ink-soft)]";

function Card({ dataset }: { dataset: Dataset }) {
  const rows: [string, React.ReactNode][] = [
    ["Data type", dataset.types.map((type) => TYPES[type]).join(", ")],
    ["Size", dataset.size],
    ["Licence", dataset.licence],
    ["Access", ACCESS[dataset.access]],
    // Restrictions stay in view, beside the licence and ahead of any copy.
    ...(dataset.accessNote ? [["Access note", dataset.accessNote] as [string, string]] : []),
    ["How to cite", dataset.citation],
    ["Last checked", <span className="timecode text-[var(--source)]">{dataset.checkedOn}</span>],
  ];
  return (
    <article id={dataset.id} className="panel min-w-0 scroll-mt-32 p-5 [overflow-wrap:anywhere] sm:p-6">
      <h3 className="display text-2xl">{dataset.title}</h3>
      <p className="slug mt-1 text-[var(--ink-soft)]">{dataset.publisher}</p>
      <p className="mt-3 max-w-prose">{dataset.summary}</p>
      <dl className="mt-4 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-[8rem_1fr]">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className={term}>{label}</dt>
            <dd className="mb-2 max-w-prose sm:mb-0">{value}</dd>
          </div>
        ))}
      </dl>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <li>
          <TrackedDatasetLink id={dataset.id} href={dataset.url}>
            Dataset page<span className="sr-only">: {dataset.title}</span>
          </TrackedDatasetLink>
        </li>
        <li>
          {dataset.termsUrl ? (
            <External href={dataset.termsUrl}>
              Terms<span className="sr-only"> for {dataset.title}</span>
            </External>
          ) : (
            `Terms: ${NOT_STATED}`
          )}
        </li>
      </ul>
      {dataset.copies.length > 0 && (
        <div className="mt-5 border-t border-[var(--rule)] pt-4">
          <h4 className="slug">Get it on</h4>
          <p className="mt-1 max-w-prose text-sm text-[var(--ink-soft)]">
            The licence and access above are those of the original release. A copy&apos;s own page may say otherwise.
          </p>
          <ul className="mt-3 space-y-5">
            {dataset.copies.map((copy) => (
              <CopyItem key={copyUrl(copy)} dataset={dataset.id} copy={copy} />
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export function DatasetList({ datasets }: { datasets: Dataset[] }) {
  const [type, setType] = useState<DataType>();
  const [access, setAccess] = useState<Access>();
  const shown = filterDatasets(datasets, { type, access });

  return (
    <div>
      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <Filter legend="Data type" options={TYPE_OPTIONS} labels={TYPES} value={type} onChange={setType} />
        <Filter legend="Access" options={ACCESS_OPTIONS} labels={ACCESS} value={access} onChange={setAccess} />
      </div>
      <p role="status" className="mt-4 text-sm text-[var(--ink-soft)]">
        {shown.length === 0
          ? "No datasets match these filters."
          : `${shown.length} ${shown.length === 1 ? "dataset" : "datasets"}`}
      </p>
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-6">
        {shown.map((dataset) => (
          <Card key={dataset.id} dataset={dataset} />
        ))}
      </div>
    </div>
  );
}
