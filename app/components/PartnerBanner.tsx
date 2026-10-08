const partners = [
  { name: "Google", href: "https://www.google.com/", logo: "google.png", className: "partner-google" },
  { name: "firebrand.ai", href: "https://firebrand.ai/", logo: "firebrand-cream.svg", className: "partner-on-dark" },
  { name: "NSF", href: "https://www.nsf.gov/", logo: "nsf.png", className: "partner-nsf" },
  { name: "NIH", href: "https://www.nih.gov/", logo: "nih.png", className: "partner-nih" },
  { name: "GREI", href: "https://zenodo.org/communities/grei/", logo: "grei.png", className: "partner-grei" },
  { name: "GDCC", href: "https://www.gdcc.io/", logo: "gdcc.png", className: "partner-gdcc" },
  { name: "Bertarelli Foundation", href: "https://www.fondation-bertarelli.org/", logo: "bertarelli.png", className: "partner-bertarelli" },
  { name: "Harvard FAS", href: "https://www.fas.harvard.edu/", logo: "fas.png", className: "partner-on-dark" },
  { name: "Alfred P. Sloan Foundation", href: "https://sloan.org/", logo: "sloan.png", className: "partner-sloan" },
  { name: "Helmsley Charitable Trust", href: "https://helmsleytrust.org/", logo: "helmsley.png", className: "partner-on-dark partner-helmsley" },
];

export default function PartnerBanner() {
  return <section className="partner-banner" id="partners" aria-labelledby="partners-heading">
    <h2 id="partners-heading">Thanks to our Partners</h2>
    <div className="partner-scroll" tabIndex={0} role="region" aria-label="Partner logos, scroll horizontally to see all partners">
    <ul className="partner-grid">
      {partners.map(partner => <li key={partner.name}>
        <a href={partner.href} className={partner.className} aria-label={partner.name}>
          <span className="partner-logo-frame"><img src={`/partners/${partner.logo}`} alt={partner.name} loading="lazy" /></span>
          <span className="partner-name">{partner.name}</span>
        </a>
      </li>)}
    </ul>
    </div>
  </section>;
}
