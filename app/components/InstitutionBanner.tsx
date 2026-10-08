const institutions: { name: string; label: string; href: string; logo?: string }[] = [
  { name: "Borealis", label: "Canadian research institutions", href: "https://borealisdata.ca/", logo: "borealis.png" },
  { name: "Recherche Data Gouv", label: "France · National research infrastructure", href: "https://entrepot.recherche.data.gouv.fr/", logo: "recherche-data-gouv.svg" },
  { name: "Ministry of Cultures, Arts and Knowledge", label: "Colombia · Government", href: "https://investigacionartes.mincultura.gov.co/" },
  { name: "NASA Jet Propulsion Laboratory", label: "United States · Research laboratory", href: "https://dataverse.jpl.nasa.gov/", logo: "jpl.png" },
  { name: "Harvard University", label: "United States · University", href: "https://dataverse.harvard.edu/", logo: "harvard.png" },
  { name: "University of North Carolina", label: "United States · University", href: "https://dataverse.unc.edu/", logo: "unc-dataverse.png" },
];

export default function InstitutionBanner({ compact = false, embedded = false }: { compact?: boolean; embedded?: boolean }) {
  return <section className={`institution-banner ${compact ? "audience-banner-inline" : ""} ${embedded ? "institution-banner-embedded" : ""}`} id="institutions" aria-labelledby="institutions-heading">
    <div className="audience-banner-heading"><div><h2 id="institutions-heading">Institutions in the Dataverse Network</h2><p>Governments, research labs, universities, and national research communities.</p></div><a href={compact ? "/installations" : "/institutions"}>{compact ? "Explore all installations" : "Dataverse for institutions"}</a></div>
    <ul className="institution-grid">{institutions.map(item => <li key={item.name}><a href={item.href}><span className="institution-logo-frame" aria-hidden="true">{item.logo && <img src={`/institutions/${item.logo}`} alt="" loading="lazy" />}</span><span>{item.label}</span><strong>{item.name}</strong></a></li>)}</ul>
  </section>;
}
