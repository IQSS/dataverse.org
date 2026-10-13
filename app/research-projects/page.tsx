import type { Metadata } from "next";
import { ArchiveShell } from "../components/SiteChrome";
import "../contact/contact.css";

export const metadata: Metadata = {
  title: "Research projects | The Dataverse Project",
  description: "Funded research projects led by the Dataverse team: trusted data with Google, NYU and UNC; NIH GREI data sharing; AI metadata enrichment with DataCite and the Harvard Data Science Initiative.",
};

const projects = [
  { title: "Trusted Data Collaboration", partners: "Google, NYU, UNC-Chapel Hill · 2025–", summary: "A standards-compliant framework for surfacing community-defined trust signals on open data: trusted reviews, engagement, and automated trust indicators built into the Dataverse platform.", links: [["Overview", "/trusted-data-collaboration"], ["Progress", "/trusted-data-progress"], ["Tech notes", "/trusted-data-tech-notes"]] },
  { title: "Generalist Repository Ecosystem Initiative (GREI)", partners: "NIH Office of Data Science Strategy · with Dryad, Figshare, Mendeley Data, OSF, Vivli, Zenodo", summary: "Making NIH-funded data easier to share, find and reuse across generalist repositories: common metadata, usage metrics, training, and the published use cases and data-sharing stories on this site.", links: [["Use cases", "/use-cases"], ["GREI community on Zenodo ↗", "https://zenodo.org/communities/grei/"]] },
  { title: "AI metadata enrichment", partners: "Harvard Data Science Initiative · DataCite · NIH GREI AI supplement", summary: "Fine-tuned open models that fill in missing keywords, subjects and geographic coverage for datasets, a knowledge graph over the whole Harvard Dataverse corpus, and the daily citation and usage figures shown on this site.", links: [["How the numbers are produced", "/numbers"], ["Preprint ↗", "https://arxiv.org/abs/2609.16498"]] },
];

export default function ResearchProjectsPage() {
  return <ArchiveShell>
    <article className="archive-detail contact-page">
      <header className="archive-detail-head"><p>Dataverse Project</p><h1>Research projects</h1></header>
      <div className="contact-body">
        <p className="contact-lede">Funded research the Dataverse team leads or co-leads, beyond maintaining the software. Each project publishes its results openly and feeds back into the platform.</p>
        <ul className="contact-grid">{projects.map((project) => <li key={project.title}><div className="project-card"><strong>{project.title}</strong><span className="project-partners">{project.partners}</span><span>{project.summary}</span><p>{project.links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</p></div></li>)}</ul>
      </div>
    </article>
  </ArchiveShell>;
}
