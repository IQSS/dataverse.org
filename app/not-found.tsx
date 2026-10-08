import type { Metadata } from "next";
import { ArchiveShell } from "./components/SiteChrome";

export const metadata: Metadata = { title: "Page not found | The Dataverse Project" };

export default function NotFound() {
  return <ArchiveShell>
    <article className="archive-detail not-found">
      <header className="archive-detail-head"><p>Dataverse Project</p><h1>Page not found</h1></header>
      <div className="archive-prose">
        <p>The address may have changed when the site moved. Try one of these instead.</p>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About the project</a></li>
          <li><a href="/installations">Dataverse installations</a></li>
          <li><a href="/blog">Blog</a>, <a href="/presentations">presentations</a> and <a href="/publications">publications</a></li>
          <li><a href="https://guides.dataverse.org/">User guides</a></li>
        </ul>
      </div>
    </article>
  </ArchiveShell>;
}
