import type { Blood, Entry, Sharing, Use } from "@/journal/schema";

export const BLOOD_LABELS: Record<Blood, string> = {
  none: "None",
  streaks: "Streaks",
  obvious: "Obvious",
  mostly_blood: "Mostly blood",
};

export const URGENCY_LABELS = ["None", "Mild", "Moderate", "Severe"];

export const USE_LABELS: Record<Use, string> = {
  personal: "My own use",
  clinical_care: "My care team, for my care",
  academic_research: "Academic research",
  commercial_research: "Commercial research",
  ai_training: "Training AI systems",
};

export const SHARING_LABELS: Record<Sharing, string> = {
  must_share_results_back: "They must share results back with me",
  no_requirement: "No requirement",
  not_allowed: "Nothing may be made from my data for others",
};

export function describe(entry: Entry): [string, string][] {
  const rows: [string, string | undefined][] = [
    ["Bowel movements", entry.stool_frequency?.toString()],
    ["Blood in stool", entry.blood && BLOOD_LABELS[entry.blood]],
    ["Urgency", entry.urgency === undefined ? undefined : URGENCY_LABELS[entry.urgency]],
    ["Abdominal pain", entry.pain === undefined ? undefined : `${entry.pain} of 10`],
    ["Fatigue", entry.fatigue === undefined ? undefined : `${entry.fatigue} of 10`],
    ["Medicines taken", entry.medications],
    ["Notes", entry.notes],
  ];
  return rows.filter((row): row is [string, string] => row[1] !== undefined);
}

/** Today in the person's own time zone. */
export function today() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}
