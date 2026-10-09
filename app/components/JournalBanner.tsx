const journals = [
  { name: "American Journal of Political Science", logo: "ajps.jpg", href: "https://dataverse.harvard.edu/dataverse/ajps", relationship: "Journal collection on Harvard Dataverse", action: "View data collection" },
  { name: "Political Analysis", logo: "political-analysis.jpg", href: "https://dataverse.harvard.edu/dataverse/pan", relationship: "Journal collection on Harvard Dataverse", action: "View data collection" },
  { name: "The Quarterly Journal of Economics", logo: "qje.png", href: "https://dataverse.harvard.edu/dataverse/qje", relationship: "Journal collection on Harvard Dataverse", action: "View data collection" },
  { name: "NeurIPS", logo: "neurips.png", href: "https://neurips.cc/Conferences/2026/EvaluationsDatasetsHosting", relationship: "Harvard Dataverse is a preferred hosting platform for the Evaluations & Datasets track.", action: "Read hosting guidelines" },
  { name: "Frontiers", logo: "frontiers.png", href: "https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2024.1405369/full", relationship: "Authors publish supporting research data on Harvard Dataverse.", action: "View a published example" },
];

export default function JournalBanner({ compact = false }: { compact?: boolean }) {
  return <section className={`journal-banner ${compact ? "audience-banner-inline" : ""}`} id="journals" aria-labelledby="journals-heading">
    <div className="audience-banner-heading"><div><h2 id="journals-heading">Journal and proceedings spotlight</h2><p>A few examples of data collections, conference hosting, and author-deposited research data. Many more journals work with Dataverse.</p></div>{!compact && <a href="/journals">Dataverse for journals and proceedings</a>}</div>
    <div className="journal-scroll" role="region" aria-label="Journals and proceedings — scroll to browse" tabIndex={0}><div className="journal-logo-grid">{journals.map(journal => <a key={journal.name} href={journal.href}>
      <span className="journal-logo-frame"><img src={`/journals/${journal.logo}`} alt="" loading="lazy" /></span>
      <strong>{journal.name}</strong><span className="journal-relationship">{journal.relationship}</span><span>{journal.action}</span>
    </a>)}</div></div>
  </section>;
}
