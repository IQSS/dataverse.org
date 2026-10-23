const items = [
  { title: "The Software", text: "Architecture, APIs, metadata standards, storage and large-data options, authentication, deployment.", href: "/software", external: false },
  { title: "Run Dataverse", text: "Start a complete installation in a container in about five minutes, or try the hosted demo.", href: "https://guides.dataverse.org/en/latest/container/running/demo.html#quickstart", external: true },
  { title: "Releases", text: "Quarterly releases since 2015, with notes and upgrade steps for each.", href: "/releases", external: false },
  { title: "Roadmap", text: "The big-picture priorities for the year and the technical milestones behind them.", href: "/roadmap", external: false },
  { title: "Guides", text: "User, admin, installation, API and developer guides, the reference for every feature.", href: "https://guides.dataverse.org/", external: true },
  { title: "Source Code", text: "Apache-licensed, developed in the open on GitHub; issues and pull requests welcome.", href: "https://github.com/IQSS/dataverse", external: true },
];

/** The technical material, kept together at the bottom of the home page for those who want it. */
export default function TechnicalPanel() {
  return <section className="technical-panel" id="technical" aria-labelledby="technical-heading">
    <div className="audience-banner-heading"><div><h2 id="technical-heading">Technical Details</h2></div></div>
    <ul className="technical-grid">{items.map((item) => <li key={item.href}><a href={item.href}><strong>{item.title}{item.external && <span aria-hidden="true"> ↗</span>}</strong><span>{item.text}</span></a></li>)}</ul>
  </section>;
}
