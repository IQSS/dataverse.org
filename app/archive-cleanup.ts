/** Old Drupal navigation was captured inside five page bodies during import. */
export const importedNavigation = "About\nAbout\nexpand_more\nAbout the Project\nGetting Started\nGetting Started\nexpand_more\nResearchers\nJournals\nInstitutions\nDevelopers\nBlog\nPresentations\nPublications\nMetrics\nReports\nReports\nexpand_more";

export function cleanImportedText(text: string) {
  return text.replaceAll(importedNavigation, "");
}

export function cleanImportedLinks<T extends { text: string; links: { text: string; href: string }[] }>(item: T) {
  if (!item.text.includes(importedNavigation)) return item.links;
  // Only remove the captured leading menu, never matching links from the body.
  const end = item.links.findIndex(link => link.text === "Dataverse Annual Report 2025");
  return end < 0 ? item.links : item.links.slice(end + 1);
}
