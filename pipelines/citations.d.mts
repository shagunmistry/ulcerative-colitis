export function classify(result: { status?: number; error?: string }): "ok" | "broken" | "unsure";
export function missingDates(records: { path?: string; id?: string; checkedOn?: string }[]): string[];
export function undatedPages(pages: { path: string; source: string }[], listed: string[]): string[];
export function fixedLinks(source: string): string[];
