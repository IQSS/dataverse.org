import { useCases } from "../../data/use-cases";

export function UseCaseCard({ item }: { item: (typeof useCases)[number] }) {
  return <li>
    <a href={`/use-cases/${item.slug}`}>
      <span className={`use-case-image${item.card?.fit === "contain" ? " contain" : ""}`}><img src={item.card?.src ?? item.image} alt="" loading="lazy" /></span>
      <span className="use-case-kicker">{item.audience} · {item.kind}</span>
      <strong>{item.title}</strong>
      <span className="use-case-summary">{item.summary}</span>
    </a>
  </li>;
}

/** Three featured use cases on the homepage; the full list lives at /use-cases. */
export default function UseCaseBanner() {
  const featured = useCases.filter((item) => item.featured).slice(0, 3);
  return <section className="use-case-banner" id="use-cases" aria-labelledby="use-cases-heading">
    <div className="audience-banner-heading"><div><h2 id="use-cases-heading">Dataverse in practice</h2><p>Data-sharing stories and worked scenarios from the Harvard Dataverse Repository, published by the Dataverse team.</p></div><a href="/use-cases">All {useCases.length} use cases</a></div>
    <ul className="use-case-grid">{featured.map((item) => <UseCaseCard key={item.slug} item={item} />)}</ul>
  </section>;
}
