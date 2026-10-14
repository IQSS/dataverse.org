const partners: { name: string; href: string; logo?: string; className?: string }[] = [
  { name: "Google", href: "https://www.google.com/", logo: "google.png", className: "partner-google" },
  { name: "firebrand.ai", href: "https://firebrand.ai/", logo: "firebrand-cream.svg", className: "partner-on-dark" },
  { name: "NSF", href: "https://www.nsf.gov/", logo: "nsf.png", className: "partner-nsf" },
  { name: "NIH", href: "https://www.nih.gov/", logo: "nih.png", className: "partner-nih" },
  { name: "GREI", href: "https://zenodo.org/communities/grei/", logo: "grei.png", className: "partner-grei" },
  { name: "GDCC", href: "/events", logo: "gdcc.png", className: "partner-gdcc" },
  { name: "Bertarelli Foundation", href: "https://www.fondation-bertarelli.org/", logo: "bertarelli.png", className: "partner-bertarelli" },
  { name: "Harvard FAS", href: "https://www.fas.harvard.edu/", logo: "fas.png", className: "partner-on-dark" },
  { name: "Alfred P. Sloan Foundation", href: "https://sloan.org/", logo: "sloan.png", className: "partner-sloan" },
  { name: "Helmsley Charitable Trust", href: "https://helmsleytrust.org/", logo: "helmsley.png", className: "partner-on-dark partner-helmsley" },
  { name: "Harvard Data Science Initiative", href: "https://datascience.harvard.edu/", logo: "hdsi-white.png", className: "partner-on-dark partner-wide" },
  { name: "Office of the President and Provost, Harvard University", href: "https://provost.harvard.edu/", logo: "harvard-provost.png", className: "partner-wide" },
  { name: "Institute of Museum and Library Services", href: "https://www.imls.gov/", logo: "imls.png", className: "partner-wide" },
  { name: "Massachusetts Institute of Technology", href: "https://www.mit.edu/", logo: "mit.png" },
  { name: "Office of Naval Research", href: "https://www.onr.navy.mil/", logo: "onr.png", className: "partner-wide" },
  { name: "Regents of the University of Michigan", href: "https://umich.edu/", logo: "umich.png", className: "partner-wide" },
  { name: "RMDS Lab", href: "https://grmds.org/" },
  { name: "Social Science Research Council", href: "https://www.ssrc.org/" },
  { name: "University of Pittsburgh", href: "https://www.pitt.edu/", logo: "pitt.png" },
  { name: "US Department of State", href: "https://www.state.gov/", logo: "state.png", className: "partner-seal" },
];

export default function PartnerBanner() {
  return <section className="partner-banner" id="partners" aria-labelledby="partners-heading">
    <h2 id="partners-heading">Thanks to the Generous Support From</h2>
    <div className="partner-scroll" tabIndex={0} role="region" aria-label="Partner logos, scroll horizontally to see all partners">
    <ul className="partner-grid">
      {partners.map(partner => <li key={partner.name}>
        <a href={partner.href} className={partner.className ?? ""} aria-label={partner.name}>
          <span className={partner.logo ? "partner-logo-frame" : "partner-logo-frame partner-wordmark"}>{partner.logo ? <img src={`/partners/${partner.logo}`} alt={partner.name} loading="lazy" /> : <span aria-hidden="true">{partner.name}</span>}</span>
          <span className="partner-name">{partner.name}</span>
        </a>
      </li>)}
    </ul>
    </div>
  </section>;
}
