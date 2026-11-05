import map from "../../data/installation-map.json";
import registry from "../../data/installations.json";
import counts from "../../data/installation-metrics.json";
import MapTooltip from "./MapTooltip";

const details = new Map(registry.installations.map((item) => [item.url.replace(/\/+$/, ""), item]));

const metrics = counts.installations as Record<string, { datasets?: number; files?: number; downloads?: number }>;
const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
const full = new Intl.NumberFormat("en-US");

// Datasets, files and downloads as the installation's own metrics API last reported them (refreshed daily).
function stats(url: string) {
  const u = new URL(url);
  const m = metrics[(u.host + u.pathname).replace(/\/+$/, "")] ?? metrics[u.host];
  if (!m) return "";
  const n = (v: number) => (v >= 100000 ? compact.format(v) : full.format(v));
  return [m.datasets != null && `${n(m.datasets)} datasets`, m.files != null && `${n(m.files)} files`, m.downloads != null && `${n(m.downloads)} downloads`].filter(Boolean).join(" · ");
}

// First sentence, or the first 200 characters, so the hover card stays short.
function blurb(text = "") {
  const first = text.match(/^.{20,200}?[.!?](\s|$)/)?.[0].trim();
  return first ?? (text.length > 200 ? `${text.slice(0, 197).trimEnd()}…` : text);
}

// Text alternative for the map: where the dots are, from the same data that draws them.
function mapSummary() {
  const byContinent = new Map<string, number>();
  for (const { url } of map.installations) {
    const continent = details.get(url.replace(/\/+$/, ""))?.continent;
    if (continent) byContinent.set(continent, (byContinent.get(continent) ?? 0) + 1);
  }
  const regions = [...byContinent].sort((a, b) => b[1] - a[1]).map(([continent, n]) => `${n} in ${continent}`).join(", ");
  const countries = new Set(map.installations.map((item) => item.country)).size;
  return `World map showing the locations of ${map.installations.length} Dataverse installations in ${countries} countries: ${regions}. Each location is a dot that links to its repository and opens in a new tab. Where dots overlap, use Tab to reach each repository.`;
}

export default function InstallationMap({ hideDirectory = false }: { hideDirectory?: boolean }) {
  return <div className="ecosystem-map-panel">
    <div className="map-panel-heading"><h3>Installations Around the World</h3><a href="/explore#explore-list-heading">Full list of installations</a></div>
    <p className="sr-only" id="installation-map-description">{mapSummary()}</p>
    <div className="installation-map-container">
      <svg className="installation-map" viewBox="0 0 1000 440" role="group" aria-labelledby="installation-map-title" aria-describedby="installation-map-description">
        <title id="installation-map-title">Dataverse installations around the world</title>
        <g className="map-land" aria-hidden="true">{map.paths.map((path, index) => <path d={path} key={index}/>)}</g>
        <g className="map-locations">{map.installations.map(installation => { const info = details.get(installation.url.replace(/\/+$/, "")); return <a className="map-repository-link" key={installation.name} href={installation.url} target="_blank" rel="noopener noreferrer" data-name={installation.name} data-meta={`${installation.country}${info?.launch_year ? ` · since ${info.launch_year}` : ""}`} data-desc={blurb(info?.description)} data-stats={stats(installation.url)} aria-label={`${installation.name} — ${installation.country}${info?.launch_year ? `, since ${info.launch_year}` : ""} (opens in a new tab)`}>
          <circle className="map-location-halo" cx={installation.point[0]} cy={installation.point[1]} r="7" aria-hidden="true"/>
          <circle className="map-location-dot" cx={installation.point[0]} cy={installation.point[1]} r="4"/>
        </a>; })}</g>
      </svg>
      <MapTooltip />
    </div>
    {!hideDirectory && <details className="map-directory" id="installation-directory">
      <summary>Browse all {map.installations.length} repositories (in alphabetical order)</summary>
      <ul>{[...map.installations].sort((a, b) => a.name.localeCompare(b.name)).map(installation => <li key={installation.name}><a href={installation.url}>{installation.name}</a> — {installation.country}</li>)}</ul>
    </details>}
  </div>;
}
