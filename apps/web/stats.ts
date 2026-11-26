export type Stats = Record<string, string | number>;

export const STATS_FIELDS = [
  ["as_of", "As of"],
  ["monthly_visitors", "Monthly visitors"],
  ["github_stars", "GitHub stars"],
  ["contributors", "Contributors"],
] as const;

/** True only when every number has been filled in, so the page can be linked to. */
export const hasStats = (stats: Stats) =>
  STATS_FIELDS.every(([key]) => {
    const value = stats[key];
    return value !== undefined && !String(value).startsWith("TODO(owner)");
  });
