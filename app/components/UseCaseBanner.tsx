import { practiceFeatures, useCases } from "../../data/use-cases";

export function UseCaseCard({ item, toRepository = false }: { item: (typeof useCases)[number]; toRepository?: boolean }) {
  return <li>
    <a href={toRepository ? item.repository.href : `/use-cases/${item.slug}`}>
      <span className={`use-case-image${item.card?.fit === "contain" ? " contain" : ""}`}><img src={item.card?.src ?? item.image} alt="" loading="lazy" /></span>
      <span className="use-case-kicker">{item.audience} · {item.kind}</span>
      <strong>{item.title}</strong>
      <span className="use-case-summary">{item.summary}</span>
      {toRepository && <span className="use-case-repository">{item.repository.label} <span aria-hidden="true">↗</span></span>}
    </a>
  </li>;
}

/** A card with several outward links (guide, talks), so it is a block rather than one link. */
function FeatureCard({ item }: { item: (typeof practiceFeatures)[number] }) {
  return <li className="use-case-feature">
    <span className="use-case-image" aria-hidden="true" />
    <span className="use-case-kicker">{item.audience} · {item.kind}</span>
    <strong>{item.title}</strong>
    <span className="use-case-summary">{item.summary}</span>
    <span className="use-case-talks">Talks: {item.talks.map((talk, i) => <span key={talk.href}>{i > 0 && ", "}<a href={talk.href}>{talk.label}</a></span>)}</span>
    <a className="use-case-repository" href={item.link.href}>{item.link.label} <span aria-hidden="true">↗</span></a>
  </li>;
}

/** Every use case as a compact card in a horizontal slider on the homepage, featured first; each card opens the repository the
 *  story is about, and the stories themselves live at /use-cases. */
export default function UseCaseBanner() {
  const featured = [...useCases.filter((item) => item.featured), ...useCases.filter((item) => !item.featured)];
  return <section className="use-case-banner" id="use-cases" aria-labelledby="use-cases-heading">
    <div className="audience-banner-heading"><div><h2 id="use-cases-heading">Dataverse in Practice</h2><p>Data-sharing stories and case studies from the Harvard Dataverse Repository, published by the Dataverse team.</p></div><a href="/use-cases">All {useCases.length} Use Cases</a></div>
    <div className="journal-scroll" role="region" aria-label="Dataverse in practice — scroll to browse" tabIndex={0}><ul className="use-case-grid use-case-grid-compact">{featured.map((item) => <UseCaseCard key={item.slug} item={item} toRepository />)}{practiceFeatures.map((item) => <FeatureCard key={item.title} item={item} />)}</ul></div>
  </section>;
}
