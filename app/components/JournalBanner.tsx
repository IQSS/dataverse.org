const journals = [
  { name: "American Journal of Political Science", logo: "ajps.jpg", href: "https://dataverse.harvard.edu/dataverse/ajps" },
  { name: "Political Analysis", logo: "political-analysis.jpg", href: "https://dataverse.harvard.edu/dataverse/pan" },
  { name: "The Quarterly Journal of Economics", logo: "qje.png", href: "https://dataverse.harvard.edu/dataverse/qje" },
];

export default function JournalBanner({ compact = false }: { compact?: boolean }) {
  return <section className={`journal-banner ${compact ? "audience-banner-inline" : ""}`} id="journals" aria-labelledby="journals-heading">
    <div className="audience-banner-heading"><div><h2 id="journals-heading">Journals on Harvard Dataverse</h2><p>Explore selected journal data collections.</p></div>{!compact && <a href="/journals">Dataverse for journals</a>}</div>
    <div className="journal-logo-grid">{journals.map(journal => <a key={journal.name} href={journal.href}>
      <span className="journal-logo-frame"><img src={`/journals/${journal.logo}`} alt="" loading="lazy" /></span>
      <strong>{journal.name}</strong><span>View data collection</span>
    </a>)}</div>
  </section>;
}
