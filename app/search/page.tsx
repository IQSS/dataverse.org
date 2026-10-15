import type { Metadata } from "next";
import { ArchiveShell } from "../components/SiteChrome";
import SearchBox from "../components/SearchBox";
import { searchEntries } from "../search-data";

export const metadata: Metadata = {
  title: "Search | The Dataverse Project",
  description: "Search every page, blog post, presentation, publication and use case on dataverse.org.",
};

export default function SearchPage() {
  return (
    <ArchiveShell>
      <section className="archive-detail site-search-page">
        <p className="archive-category">Dataverse Project</p>
        <h1>Search</h1>
        <SearchBox entries={searchEntries} />
      </section>
    </ArchiveShell>
  );
}
