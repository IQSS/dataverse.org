import type { Metadata } from "next";
import { ArchiveShell } from "../components/SiteChrome";
import InstallationMap from "../components/InstallationMap";
import InstitutionBanner from "../components/InstitutionBanner";
import registry from "../../data/installations.json";
import { headlineMetrics as metrics, formatMetric as number } from "../../data/headline-metrics";
import "./explore.css";

export const metadata: Metadata = {
  title: "Explore the Dataverse | The Dataverse Project",
  description: "Harvard Dataverse, the founding repository, and the 150+ independently run Dataverse installations around the world: map, spotlight, and the full list.",
};

const continents = ["North America", "South America", "Europe", "Africa", "Asia", "Australia"];

export default function ExplorePage() {
  const byContinent = continents.map((continent) => ({ continent, items: registry.installations.filter((item) => item.continent === continent) })).filter((group) => group.items.length);
  const other = registry.installations.filter((item) => !continents.includes(item.continent));
  return <ArchiveShell>
    <article className="archive-detail explore-page">
      <header className="archive-detail-head"><p>Dataverse Project</p><h1>Explore the Dataverse</h1></header>

      <section className="explore-harvard" aria-labelledby="explore-harvard-heading">
        <div>
          <p className="section-kicker">THE FOUNDING REPOSITORY</p>
          <h2 id="explore-harvard-heading">Harvard Dataverse</h2>
          <p>Where the project began in 2006, and still the place anyone can deposit: open to researchers from any institution and any discipline, with every dataset given a formal citation and preserved for the long term. It is one of the largest repositories of open research data in the world.</p>
          <div className="explore-harvard-facts">
            <div><b>{number(metrics.harvardDatasets)}</b><span>published datasets</span></div>
            <div><b>{number(metrics.scholarlyCitations)}</b><span>scholarly citations connected to its datasets</span></div>
            <div><b>{number(metrics.harvardUniqueViewsPeople)}</b><span>unique dataset views by people since 2020</span></div>
          </div>
          <div className="explore-actions"><a className="primary-button" href="https://dataverse.harvard.edu/">Go to Harvard Dataverse <span aria-hidden="true">↗</span></a><a className="metric-method-link" href="/numbers">Source / details</a></div>
        </div>
      </section>

      <section className="explore-network" aria-labelledby="explore-network-heading">
        <p className="section-kicker">THE NETWORK</p>
        <h2 id="explore-network-heading">{registry.installations.length} installations, three ways</h2>
        <p className="explore-lede">Every repository below runs the same open-source software and protocols, is governed by its own institution, and is listed in the community registry. First the map, then a spotlight on a few, then all of them.</p>
      </section>

      <div className="explore-map"><InstallationMap hideDirectory /></div>

      <InstitutionBanner embedded explore />

      <section className="explore-list" aria-labelledby="explore-list-heading">
        <div className="audience-banner-heading"><div><h2 id="explore-list-heading">All {registry.installations.length} installations</h2><p>Grouped by continent, each with its own purpose in its own words. Every link goes to the repository itself.</p></div></div>
        {[...byContinent, ...(other.length ? [{ continent: "Elsewhere", items: other }] : [])].map((group) => <div key={group.continent} className="explore-group">
          <h3>{group.continent} <span>{group.items.length}</span></h3>
          <ul className="institution-grid explore-grid">{group.items.map((item) => <li key={item.url}><a href={item.url}><span>{item.country}{item.launch_year ? ` · since ${item.launch_year}` : ""}</span><strong>{item.name}</strong>{item.description && <span className="explore-description">{item.description}</span>}</a></li>)}</ul>
        </div>)}
        <p className="explore-source">Registry: the community-maintained list of Dataverse installations, refreshed with the site. Installations join by asking to be listed; see <a href="/contact">Contact</a>.</p>
      </section>
    </article>
  </ArchiveShell>;
}
