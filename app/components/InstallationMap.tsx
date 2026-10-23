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

export default function InstallationMap({ hideDirectory = false }: { hideDirectory?: boolean }) {
  return <div className="ecosystem-map-panel">
    <div className="map-panel-heading"><h3>Installations Around the World</h3><a href="/explore#explore-list-heading">Full list of installations</a></div>
    <div className="installation-map-container">
      <svg className="installation-map" viewBox="0 0 1000 440" role="group" aria-labelledby="installation-map-title" aria-describedby="installation-map-description">
        <title id="installation-map-title">Dataverse installations around the world</title>
        <desc id="installation-map-description">Locations of {map.installations.length} installations in the Dataverse community registry, across six continents. Select a dot to open its repository in a new tab. Use Tab to reach individual repositories where dots overlap.</desc>
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
