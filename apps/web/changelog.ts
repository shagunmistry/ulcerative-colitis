export interface Release {
  title: string;
  groups: { title?: string; items: string[] }[];
}

/** Reads the small part of Markdown that CHANGELOG.md uses: "##", "###" and "-" lists. */
export function parseChangelog(text: string): Release[] {
  const releases: Release[] = [];
  let open = false;
  for (const line of text.split("\n")) {
    const release = releases.at(-1);
    if (line.startsWith("## ")) {
      releases.push({ title: line.slice(3).trim(), groups: [] });
      open = false;
    } else if (!release) {
      continue;
    } else if (line.startsWith("### ")) {
      release.groups.push({ title: line.slice(4).trim(), items: [] });
      open = false;
    } else if (line.startsWith("- ")) {
      if (release.groups.length === 0) release.groups.push({ title: undefined, items: [] });
      release.groups.at(-1)!.items.push(line.slice(2).trim());
      open = true;
    } else if (open && /^\s+\S/.test(line)) {
      const items = release.groups.at(-1)!.items;
      items[items.length - 1] += ` ${line.trim()}`;
    } else {
      open = false;
    }
  }
  return releases;
}
