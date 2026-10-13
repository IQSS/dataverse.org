import map from "../../data/installation-map.json";

export default function InstallationMap({ hideDirectory = false }: { hideDirectory?: boolean }) {
  return <div className="ecosystem-map-panel">
    <div className="map-panel-heading"><h3>Where the installations are</h3><a href="/explore#explore-list-heading">Full list of installations</a></div>
    <a className="map-skip" href={hideDirectory ? "/explore#explore-list-heading" : "#installation-directory"}>Go to the repository list</a>
    <div className="installation-map-container">
      <svg className="installation-map" viewBox="0 0 1000 440" role="group" aria-labelledby="installation-map-title" aria-describedby="installation-map-description">
        <title id="installation-map-title">Dataverse installations around the world</title>
        <desc id="installation-map-description">Locations of {map.installations.length} installations in the Dataverse community registry, across six continents. Select a dot to open its repository in a new tab. Use Tab to reach individual repositories where dots overlap.</desc>
        <g className="map-land" aria-hidden="true">{map.paths.map((path, index) => <path d={path} key={index}/>)}</g>
        <g className="map-locations">{map.installations.map(installation => <a className="map-repository-link" key={installation.name} href={installation.url} target="_blank" rel="noopener noreferrer" aria-label={`${installation.name} — ${installation.country} (opens in a new tab)`}>
          <title>{`${installation.name} — ${installation.country}`}</title>
          <circle className="map-location-halo" cx={installation.point[0]} cy={installation.point[1]} r="7" aria-hidden="true"/>
          <circle className="map-location-dot" cx={installation.point[0]} cy={installation.point[1]} r="4"/>
        </a>)}</g>
      </svg>
    </div>
    {!hideDirectory && <details className="map-directory" id="installation-directory">
      <summary>Browse all {map.installations.length} repositories (in alphabetical order)</summary>
      <ul>{[...map.installations].sort((a, b) => a.name.localeCompare(b.name)).map(installation => <li key={installation.name}><a href={installation.url}>{installation.name}</a> — {installation.country}</li>)}</ul>
    </details>}
    <p className="map-credit">Locations from the community registry of Dataverse installations.</p>
  </div>;
}
