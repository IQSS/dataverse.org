import type { ReactNode } from "react";

export function ArchiveHeader() {
  return (
    <header className="archive-header">
      <a className="archive-brand" href="/" aria-label="Dataverse Project home">
        <img className="dataverse-logo" src="/dataverse-project-logo.svg" alt="The Dataverse Project" />
      </a>
      <nav aria-label="Main navigation">
        <a href="/about">About</a>
        <a href="/events">Community</a>
        <a href="/best-practices/data-citation">Best Practices</a>
        <a href="/use-cases">Use Cases</a>
        <a href="/software">Software</a>
        <a href="/roadmap">Roadmap</a>
        <a href="/releases">Releases</a>
        <a href="/research-projects">Research</a>
        <a href="/contact">Contact</a>
        <a href="https://guides.dataverse.org/en/latest/user/">User Guide ↗</a><a className="nav-search" href="/search" aria-label="Search" title="Search"><svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg></a>
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
