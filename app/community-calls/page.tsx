import type { Metadata } from "next";
import Markdown from "react-markdown";
import { ArchiveShell } from "../components/SiteChrome";
import calls from "../../content/community-calls.md";

export const metadata: Metadata = {
  title: "Community Calls — Dataverse Project",
  description: "Dataverse community calls, meeting notes and recordings.",
};

export default function CommunityCallsPage() {
  return <ArchiveShell>
    <article className="community-calls-page">
      <a href="/events">Back to Community</a>
      <div className="community-markdown">
        <Markdown skipHtml>{calls}</Markdown>
      </div>
    </article>
  </ArchiveShell>;
}
