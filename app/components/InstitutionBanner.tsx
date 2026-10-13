const institutions: { name: string; label: string; href: string; logo?: string }[] = [
  { name: "Borealis", label: "Canadian research institutions", href: "https://borealisdata.ca/", logo: "borealis.png" },
  { name: "Recherche Data Gouv", label: "France · National research infrastructure", href: "https://entrepot.recherche.data.gouv.fr/", logo: "recherche-data-gouv.svg" },
  { name: "Ministry of Cultures, Arts and Knowledge", label: "Colombia · Government", href: "https://investigacionartes.mincultura.gov.co/" },
  { name: "NASA Jet Propulsion Laboratory", label: "United States · Research laboratory", href: "https://dataverse.jpl.nasa.gov/", logo: "jpl.png" },
  { name: "Harvard University", label: "United States · University", href: "https://dataverse.harvard.edu/", logo: "harvard.png" },
  { name: "University of North Carolina", label: "United States · University", href: "https://dataverse.unc.edu/", logo: "unc-dataverse.png" },
];

export default function InstitutionBanner({ compact = false, embedded = false, explore = false }: { compact?: boolean; embedded?: boolean; explore?: boolean }) {
  return <section className={`institution-banner ${compact ? "audience-banner-inline" : ""} ${embedded ? "institution-banner-embedded" : ""}`} id="institutions" aria-labelledby="institutions-heading">
    <div className="audience-banner-heading"><div><h2 id="institutions-heading">Institution spotlight</h2><p>Six of the 150+ installations. They are part of the 150.</p></div><a href={explore ? "#explore-list-heading" : "/explore"}>{explore ? "All installations below" : "See all 150+ installations"}</a></div>
    <ul className="institution-grid">{institutions.map(item => <li key={item.name}><a href={item.href}><span className="institution-logo-frame" aria-hidden="true">{item.logo && <img src={`/institutions/${item.logo}`} alt="" loading="lazy" />}</span><span>{item.label}</span><strong>{item.name}</strong></a></li>)}</ul>
  </section>;
}
