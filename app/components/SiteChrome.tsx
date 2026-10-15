import type { ReactNode } from "react";

export function ArchiveHeader() {
  return (
    <header className="archive-header">
      <a className="archive-brand" href="/" aria-label="Dataverse Project home">
        <img className="dataverse-logo" src="/dataverse-project-logo.svg" alt="The Dataverse Project" />
      </a>
      <nav aria-label="Main navigation">
        <a href="/about">About</a>
        <a href="https://people.dataverse.org/">People</a>
        <a href="/events">Community</a>
        <a href="/best-practices/data-citation">Best Practices</a>
        <a href="/use-cases">Use Cases</a>
        <a href="/software">Software</a>
        <a href="/roadmap">Roadmap</a>
        <a href="/releases">Releases</a>
        <a href="/research-projects">Research Projects</a>
        <a href="/contact">Contact</a>
        <a href="https://guides.dataverse.org/en/6.10.1/user/">User Guide ↗</a><a href="/search">Search</a>
      </nav>
      <a className="archive-harvard" href="/explore">
        Explore the Dataverse
      </a>
    </header>
  );
}

export function ArchiveFooter() {
  return (
    <footer className="archive-footer">
      <div className="archive-footer-brand">
        <img src="/iqss-logo.jpg" alt="IQSS" />
        <div><b>Dataverse</b><span>Open-source research data infrastructure</span></div>
      </div>
      <div className="archive-footer-links">
        <a href="/explore">Explore</a>
        <a href="/software">Software</a>
        <a href="/roadmap">Roadmap</a>
        <a href="/releases">Releases</a>
        <a href="/best-practices/data-citation">Best Practices</a>
        <a href="https://guides.dataverse.org/">Guides ↗</a>
        <a href="https://github.com/IQSS/dataverse">GitHub ↗</a>
        <a href="https://accessibility.huit.harvard.edu/digital-accessibility-policy">Accessibility</a>
      </div>
    </footer>
  );
}

export function ArchiveShell({ children }: { children: ReactNode }) {
  return (
    <div className="archive-site">
      <ArchiveHeader />
      <main className="archive-main" id="main-content" tabIndex={-1}>{children}</main>
      <ArchiveFooter />
    </div>
  );
}
