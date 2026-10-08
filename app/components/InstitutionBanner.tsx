const institutions = [
  { name: "Borealis", label: "Canadian research institutions", href: "https://borealisdata.ca/" },
  { name: "Recherche Data Gouv", label: "France · National research infrastructure", href: "https://entrepot.recherche.data.gouv.fr/" },
  { name: "Ministry of Cultures, Arts and Knowledge", label: "Colombia · Government", href: "https://investigacionartes.mincultura.gov.co/" },
  { name: "NASA Jet Propulsion Laboratory", label: "United States · Research laboratory", href: "https://dataverse.jpl.nasa.gov/" },
  { name: "Harvard University", label: "United States · University", href: "https://dataverse.harvard.edu/" },
  { name: "University of North Carolina", label: "United States · University", href: "https://dataverse.unc.edu/" },
];

export default function InstitutionBanner({ compact = false }: { compact?: boolean }) {
  return <section className={`institution-banner ${compact ? "audience-banner-inline" : ""}`} id="institutions" aria-labelledby="institutions-heading">
    <div className="audience-banner-heading"><div><h2 id="institutions-heading">Institutions in the Dataverse Network</h2><p>Governments, research labs, universities, and national research communities.</p></div><a href={compact ? "/installations" : "/institutions"}>{compact ? "Explore all installations" : "Dataverse for institutions"}</a></div>
    <ul className="institution-grid">{institutions.map(item => <li key={item.name}><a href={item.href}><span>{item.label}</span><strong>{item.name}</strong></a></li>)}</ul>
  </section>;
}
