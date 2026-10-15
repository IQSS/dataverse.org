/** Old Drupal navigation was captured inside five page bodies during import. */
export const importedNavigation = "About\nAbout\nexpand_more\nAbout the Project\nGetting Started\nGetting Started\nexpand_more\nResearchers\nJournals\nInstitutions\nDevelopers\nBlog\nPresentations\nPublications\nMetrics\nReports\nReports\nexpand_more";

const uiTokens = new Set(["expand_more", "chevron_right", "menu", "close"]);

/** Drop a captured Drupal menu at the top of a page body (short title-case labels around
 *  expand_more tokens) and any stray icon-font tokens, keeping sentences and subtitles. */
export function stripMenuNoise(text: string) {
  const lines = text.replace(/\r/g, "").split("\n");
  const firstBlank = lines.findIndex((line) => !line.trim());
  const head = firstBlank < 0 ? lines : lines.slice(0, firstBlank);
  let out = lines;
  if (head.some((line) => uiTokens.has(line.trim()))) {
    const kept = head.filter((line) => {
      const t = line.trim();
      return t && !uiTokens.has(t) && (t.length > 45 || /[.:!?,]/.test(t));
    });
    out = [...kept, ...(firstBlank < 0 ? [] : lines.slice(firstBlank))];
  }
  return out.filter((line) => !uiTokens.has(line.trim())).join("\n");
}

export function cleanImportedText(text: string) {
  return stripMenuNoise(text.replaceAll(importedNavigation, ""));
}

const retiredLinks: Record<string, string> = {
  "https://www.iq.harvard.edu/people/program/dataverse-project": "/about#team",
};

// The old site titled many references just "Link"; label them by host instead.
function labelLink(link: { text: string; href: string }) {
  const href = retiredLinks[link.href] ?? link.href;
  if (link.text.trim().toLowerCase() !== "link") return { ...link, href };
  try {
    return { text: new URL(href).hostname.replace(/^www\./, ""), href };
  } catch {
    return { ...link, href };
  }
}

export function cleanImportedLinks<T extends { text: string; links: { text: string; href: string }[] }>(item: T) {
  const links = item.links.map(labelLink);
  if (!item.text.includes(importedNavigation)) return links;
  // Only remove the captured leading menu, never matching links from the body.
  const end = links.findIndex(link => link.text === "Dataverse Annual Report 2025");
  return end < 0 ? links : links.slice(end + 1);
}
