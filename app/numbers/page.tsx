import type { Metadata } from "next";
import { ArchiveShell } from "../components/SiteChrome";
import InstallationMap from "../components/InstallationMap";
import map from "../../data/installation-map.json";
import { headlineMetrics as metrics, formatMetric as number } from "../../data/headline-metrics";
import "./numbers.css";

export const metadata: Metadata = {
  title: "Behind the numbers | The Dataverse Project",
  description: "How Dataverse installation, dataset, and citation totals are counted, with figures, sources, and coverage notes.",
};

const countryCounts = Object.entries(map.installations.reduce<Record<string, number>>((counts, installation) => {
  counts[installation.country] = (counts[installation.country] || 0) + 1;
  return counts;
}, {})).sort((a, b) => b[1] - a[1]);
const leadingCountries = countryCounts.slice(0, 6);
const remainingCountries = countryCounts.slice(6).reduce((sum, [, count]) => sum + count, 0);
const metricLinks = [
  { id: "installations", label: "Installations", value: metrics.installations },
  { id: "scholarly-citations", label: "Scholarly Citations", value: number(metrics.scholarlyCitations) },
  { id: "network-datasets", label: "Network datasets", value: `${number(metrics.networkDatasets)}+` },
  { id: "dataset-citations", label: "Dataset Citations", value: number(metrics.datasetCitations) },
  { id: "harvard-datasets", label: "Harvard datasets", value: number(metrics.harvardDatasets) },
];

function Bar({ label, value, max, muted = false }: { label: string; value: number; max: number; muted?: boolean }) {
  return <div className={`evidence-bar${muted ? " evidence-bar-muted" : ""}`}>
    <div><span>{label}</span><b>{number(value)}</b></div>
    <div className="evidence-bar-track" aria-hidden="true"><span style={{ width: `${value / max * 100}%` }} /></div>
  </div>;
}

function Steps({ items }: { items: { title: string; text: string }[] }) {
  return <ol className="counting-steps">{items.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol>;
}

export default function NumbersPage() {
  return <ArchiveShell>
    <div className="numbers-page">
      <header className="numbers-intro">
        <a href="/">Dataverse Project</a>
        <p className="section-kicker">SOURCES &amp; METHODS</p>
        <h1>Behind the numbers</h1>
        <p>The scale of the network. The reach of its research. Here is what we count, how we count it, and what each number can—and cannot—tell us.</p>
        <p className="numbers-context">These explanations accompany the figures displayed on the homepage. They are not live counters. Network totals describe multiple installations; the citation analysis covers a defined set of Harvard Dataverse datasets.</p>
      </header>

      <nav className="numbers-index" aria-label="Explore the headline numbers">{metricLinks.map(metric => <a key={metric.id} href={`#${metric.id}`}><b>{metric.value}</b><span>{metric.label}</span></a>)}</nav>

      <section className="number-section" id="scholarly-citations" aria-labelledby="scholarly-title">
        <div className="number-overview">
          <div><p className="section-kicker">HARVARD DATAVERSE · RESEARCH REACH</p><h2 id="scholarly-title">Scholarly Citations</h2><strong className="number-total">{number(metrics.scholarlyCitations)}</strong><p>Citations received by publications linked to the datasets in the analysis. Each linked publication DOI contributes its citation count once, even when multiple datasets link to it.</p></div>
          <figure className="number-figure scholarly-reach"><h3>From shared data to scholarly reach</h3>
            <div className="reach-path" role="group" aria-label="Shared datasets connect to publications, which receive scholarly citations">
              <div><b>Shared datasets</b><span>The foundation</span></div>
              <div><b>Linked publications</b><span>The research</span></div>
              <div><b>Scholarly Citations</b><span>The reach</span></div>
            </div>
            <div className="reach-highlight"><b>{number(metrics.datasetsWithScholarlyCitations)}</b><span>datasets connected to publications with recorded citations</span></div>
            <figcaption>See the wider reach of data-associated research through the publications connected to Harvard Dataverse datasets.</figcaption>
          </figure>
        </div>
        <Steps items={[
          { title: "Connect datasets to publications", text: `Start with the publication links associated with the ${number(metrics.citationStudyDatasets)} Harvard Dataverse datasets in the analysis. Resolve publication identifiers and remove repeated links.` },
          { title: "Choose one count per publication", text: "For each linked publication DOI with a successful lookup, use the largest available provider citation count. If counts tie, prefer the most recently updated record. Do not add provider counts together." },
          { title: "Sum across distinct publication DOIs", text: "Add the selected counts once per linked publication DOI across the analysis—not once per dataset. A publication shared by several datasets contributes only once." },
        ]} />
        <div className="number-notes"><div><h3>What “deduplicated” means here</h3><p>The cited publication is deduplicated. The citing papers are not deduplicated across different publications. A paper that cites two linked publications can contribute to both counts. This total does not establish that every citing paper reused the underlying data.</p></div><div><h3>Sources and coverage</h3><p>Publication links and stored provider results from Crossref, OpenAlex, and Semantic Scholar support the calculation. Missing links, unresolved identifiers, and differences in provider coverage affect the result.</p><div className="evidence-sources"><a href="https://www.crossref.org/documentation/retrieve-metadata/rest-api/">Crossref metadata</a><a href="https://docs.openalex.org/api-entities/works/work-object">OpenAlex work records</a><a href="https://api.semanticscholar.org/api-docs/graph">Semantic Scholar API</a></div></div></div>
      </section>

      <section className="number-section" id="installations" aria-labelledby="installations-title">
        <div className="number-overview"><div><p className="section-kicker">THE GLOBAL COMMUNITY</p><h2 id="installations-title">Dataverse installations</h2><strong className="number-total">{metrics.installations}</strong><p>An installation is an independently operated Dataverse repository. It is not a collection, a dataset, or a server within an installation.</p><p>The registry extract used for this site’s map contains {map.installations.length} installation entries. The headline retains the project’s “150+” wording; the map is not a continuously updated census.</p><div className="evidence-sources"><a href="https://github.com/IQSS/dataverse-installations">Community registry</a><a href={map.sources.installations}>Registry data</a></div></div>
          <figure className="number-figure"><h3>Where installations are based</h3>{leadingCountries.map(([country, count]) => <Bar key={country} label={country === "USA" ? "United States" : country} value={count} max={Math.max(remainingCountries, ...leadingCountries.map(([, count]) => count))} />)}<Bar label="Other countries and territories" value={remainingCountries} max={Math.max(remainingCountries, ...leadingCountries.map(([, count]) => count))} muted /><figcaption>Entries grouped by the registry’s country or territory field. Every entry in this site’s map contributes once; the bars sum to {map.installations.length}.</figcaption></figure>
        </div>
        <InstallationMap />
        <div className="number-notes"><div><h3>Counting rule</h3><p>Count repository entries in the community-maintained registry. Several installations in one country are separate entries; collections within a repository do not increase the installation count.</p></div><div><h3>Coverage limit</h3><p>A registry entry does not by itself confirm current availability or whether a repository’s metrics service responds. The installation count and the number of repositories contributing dataset totals are different measures.</p></div></div>
      </section>

      <section className="number-section" id="network-datasets" aria-labelledby="network-title">
        <div className="number-overview"><div><p className="section-kicker">ACROSS THE NETWORK</p><h2 id="network-title">Total Datasets in the Network</h2><strong className="number-total">{number(metrics.networkDatasets)}+</strong><p>The reported aggregate of published dataset counts from responding installations. This is a repository-record total, not a verified count of unique datasets across all installations.</p></div>
          <figure className="number-figure network-calculation"><h3>From repositories to a network total</h3><div><span>Community registry</span><b>{metrics.installations} installations</b></div><div><span>Responses recorded for this total</span><b>{metrics.respondingInstallations} installations</b></div><div><span>Reported aggregate</span><b>{number(metrics.networkDatasets)} datasets</b></div><figcaption>“+” indicates incomplete network coverage, not an estimate of the missing repositories’ holdings.</figcaption></figure>
        </div>
        <div className="number-notes"><div><h3>How the total is assembled</h3><p>Request the dataset metric from each installation and sum the returned counts. An unavailable response is missing information, not a zero. A collection’s count must not be added again when it is already included in its installation’s total.</p><div className="evidence-sources"><a href="https://guides.dataverse.org/en/latest/api/metrics.html">Dataverse Metrics API</a><a href="https://dataverse.org/installations">Installation directory</a></div></div><div className="evidence-caveat"><h3>What is not yet independently reproducible</h3><p>The original site record attributes this total to 123 responding installations. The installation-by-installation responses and query filters were not retained with the site, so we cannot show an audited breakdown or confirm whether harvested records were excluded. The total should not be described as a complete, cross-repository-deduplicated census.</p></div></div>
      </section>

      <section className="number-section" id="dataset-citations" aria-labelledby="dataset-title">
        <div className="number-overview"><div><p className="section-kicker">HARVARD DATAVERSE · DATASET DOIs</p><h2 id="dataset-title">Dataset Citations</h2><strong className="number-total">{number(metrics.datasetCitations)}</strong><p>The sum of DataCite’s recorded citation counts for dataset DOIs in the Harvard Dataverse analysis. This measure is separate from citations received by linked publications.</p></div><figure className="number-figure"><h3>Dataset coverage in the analysis</h3>
          <Bar label="Datasets with a recorded Dataset Citation" value={metrics.datasetsWithDatasetCitations} max={metrics.citationStudyDatasets} />
          <Bar label="Datasets with no recorded Dataset Citation" value={metrics.citationStudyDatasets - metrics.datasetsWithDatasetCitations} max={metrics.citationStudyDatasets} muted />
          <figcaption>{number(metrics.datasetsWithDatasetCitations)} datasets account for {number(metrics.datasetCitations)} Dataset Citations. No recorded citation is not proof that a dataset has never been cited or used.</figcaption></figure></div>
        <Steps items={[
          { title: "Identify dataset DOIs", text: `Use the ${number(metrics.citationStudyDatasets)} dataset records included in the analysis, with one entry per dataset identifier.` },
          { title: "Read DataCite counts", text: `Match dataset DOIs to DataCite records and read the citationCount field. ${number(metrics.dataciteMatched)} records matched; ${number(metrics.citationStudyDatasets - metrics.dataciteMatched)} had no matching record.` },
          { title: "Sum the recorded counts", text: "Add the recorded citation counts across dataset identifiers. Missing records contribute no observed citations, but remain a coverage gap rather than evidence of no use." },
        ]} />
        <div className="number-notes"><div><h3>What counts as a citation?</h3><p>DataCite aggregates DOI relationships, including citation, reference, and supplement relationships. Its rules avoid counting equivalent links twice for the same DOI pair. The sum is not a count of unique citing papers across datasets.</p><a href="https://support.datacite.org/docs/consuming-citations-and-references">DataCite’s citation definitions and counting rules</a></div><div><h3>Keep the measures separate</h3><p>Dataset Citations identify relationships to dataset DOIs. Scholarly Citations measure the citation reach of linked publications. Their scopes can overlap; adding them would not produce a deduplicated count of citing papers.</p></div></div>
      </section>

      <section className="number-section" id="harvard-datasets" aria-labelledby="harvard-title">
        <div className="number-overview"><div><p className="section-kicker">HARVARD DATAVERSE REPOSITORY</p><h2 id="harvard-title">Published datasets</h2><strong className="number-total">{number(metrics.harvardDatasets)}</strong><p>The Harvard Dataverse dataset metric recorded for this preview. It is a repository-wide holdings measure, not the size of the citation-analysis cohort.</p><div className="evidence-sources"><a href="https://dataverse.harvard.edu/api/info/metrics/datasets">Repository metric response</a><a href="https://guides.dataverse.org/en/latest/api/metrics.html">Metric definitions</a></div></div>
          <figure className="number-figure"><h3>Two different scopes</h3><Bar label="Published datasets shown on the homepage" value={metrics.harvardDatasets} max={metrics.harvardDatasets} /><Bar label="Dataset records in the citation analysis" value={metrics.citationStudyDatasets} max={metrics.harvardDatasets} muted /><figcaption>Different source scopes, not a growth comparison or a citation coverage percentage. Do not substitute one denominator for the other.</figcaption></figure></div>
        <div className="number-notes"><div><h3>Read the dataset metric</h3><p>The repository’s <code>/api/info/metrics/datasets</code> endpoint returns a <code>count</code>. The metric describes released datasets, not collections or files; unpublished and deaccessioned versions are excluded.</p><p>The source endpoint can change independently of this preview’s displayed value.</p></div><div><h3>Check the query scope</h3><p>Dataset metrics support local, harvested, or combined records through the <code>dataLocation</code> filter. The original source link has no explicit filter. We do not present the recorded total as a DOI-deduplicated count across repositories.</p></div></div>
      </section>

      <aside className="numbers-record"><h2>Read the figures with their scope</h2><p>Installation counts describe the community. Dataset counts describe repository holdings. Citation totals describe recorded relationships within a defined analysis. They answer different questions, and none is a complete measure of research value.</p><a href="/">Return to the Dataverse Project</a></aside>
    </div>
  </ArchiveShell>;
}
