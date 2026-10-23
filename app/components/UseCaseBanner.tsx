import { useCases } from "../../data/use-cases";

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

/** Every use case as a compact card on the homepage, featured first; each card opens the repository the
 *  story is about, and the stories themselves live at /use-cases. */
export default function UseCaseBanner() {
  const featured = [...useCases.filter((item) => item.featured), ...useCases.filter((item) => !item.featured)];
  return <section className="use-case-banner" id="use-cases" aria-labelledby="use-cases-heading">
    <div className="audience-banner-heading"><div><h2 id="use-cases-heading">Dataverse in practice</h2><p>Data-sharing stories and case studies from the Harvard Dataverse Repository, published by the Dataverse team.</p></div><a href="/use-cases">All {useCases.length} use cases</a></div>
    <ul className="use-case-grid use-case-grid-compact">{featured.map((item) => <UseCaseCard key={item.slug} item={item} toRepository />)}</ul>
  </section>;
}
