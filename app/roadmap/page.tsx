import type { Metadata } from "next";
import { ArchiveShell } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Roadmap | The Dataverse Project",
  description: "The Dataverse Project FY27 roadmap and technical release milestones.",
};

const milestones = [
  { version: "6.12", target: "September 16, 2026", date: "2026-09-16", url: "https://github.com/IQSS/dataverse/milestone/124" },
  { version: "6.13", target: "December 16, 2026", date: "2026-12-16", url: "https://github.com/IQSS/dataverse/milestone/125" },
  { version: "6.14", target: "March 17, 2027", date: "2027-03-17", url: "https://github.com/IQSS/dataverse/milestone/126" },
  { version: "6.15", target: "June 16, 2027", date: "2027-06-16", url: "https://github.com/IQSS/dataverse/milestone/127" },
];

// Distilled only from the External Roadmap worksheet, rows 3–20.
// These themes combine priorities and continuing work, not release commitments.
const themes = [
  {
    title: "Biomedical data sharing",
    description: "Continue NIH GREI collaboration on data sharing and discovery, and NIH CAFE work on biomedical metadata, geospatial support, and data curation.",
  },
  {
    title: "Indigenous data support",
    description: "Develop technical infrastructure, governance, and policies to support Indigenous data in Dataverse installations, including Harvard Dataverse.",
  },
  {
    title: "Usability and collections",
    description: "Advance the modern Dataverse interface toward feature completeness, improve Dataverse Collections, and address curation and user-support pain points at Harvard Dataverse.",
  },
  {
    title: "Metadata, AI, and discovery",
    description: "Work with DataCite on AI-assisted curation, extract variable-level metadata, and develop responsible AI practices. Continue Google Data Commons collaboration and Croissant support, and complete remaining Google Trusted Data work.",
  },
  {
    title: "Repository and curation services",
    description: "Support large datasets, data acquisition, and paid curation at Harvard Dataverse. Help the MORU Tropical Health Network deploy and operate its own repository, including metadata customization, migration, and staff training.",
  },
  {
    title: "Community and performance",
    description: "Continue outreach, webinars, and the Dataverse Community Meeting. Improve Harvard Dataverse performance, including shared software improvements that can benefit other installations.",
  },
];

export default function RoadmapPage() {
  return <ArchiveShell>
    <section className="roadmap-hero">
      <a className="roadmap-back" href="/">Dataverse Project</a>
      <div className="section-kicker">FY27</div>
      <h1>Roadmap</h1>
      <p>Priorities and ongoing work for July 2026–June 2027.</p>
    </section>
    <section className="roadmap-content" aria-label="Roadmap and release plans">
      <figure className="roadmap-timeline">
        <div className="roadmap-timeline-scroll" tabIndex={0} role="group" aria-label="FY27 roadmap timeline; scroll horizontally on small screens">
          <img src="/fy27-roadmap-timeline.svg" width="1200" height="620" alt="FY27 roadmap, July 2026 through June 2027. Target software releases: Dataverse 6.12 on September 16, 2026; 6.13 on December 16, 2026; 6.14 on March 17, 2027; and 6.15 on June 16, 2027. Six ongoing work themes are described below; no theme is assigned to a specific release." />
        </div>
        <figcaption>Release targets may change. Initiative timing is not assigned to specific releases. <a href="/fy27-roadmap-timeline.svg" download="Dataverse-FY27-roadmap.svg">Download timeline image</a></figcaption>
      </figure>
      <section className="roadmap-themes" aria-labelledby="roadmap-priorities">
        <h2 id="roadmap-priorities">FY27 priorities and ongoing work</h2>
        <div className="roadmap-theme-grid">
          {themes.map(theme => <article key={theme.title}><h3>{theme.title}</h3><p>{theme.description}</p></article>)}
        </div>
      </section>
      <div className="release-heading"><h2>Technical release milestones</h2><p>Explore planned features, fixes, and progress for each release.</p></div>
      <nav className="roadmap-milestone-links" aria-label="Technical release milestones">
        {milestones.map(milestone => <a href={milestone.url} key={milestone.version}>Dataverse {milestone.version} ↗</a>)}
      </nav>
      <p className="roadmap-source">Source: <a href="https://github.com/IQSS/dataverse/milestones">Dataverse release milestones</a>. For published releases and upgrade instructions, see <a href="https://github.com/IQSS/dataverse/releases">release notes</a>.</p>
    </section>
  </ArchiveShell>;
}
