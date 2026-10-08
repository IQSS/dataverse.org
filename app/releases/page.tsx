import type { Metadata } from "next";
import { ArchiveShell } from "../components/SiteChrome";
import releases from "../../data/releases.json";
import "./releases.css";

export const metadata: Metadata = {
  title: "Release timeline | The Dataverse Project",
  description: "Explore Dataverse software releases from 2015 to 2026, with dates and links to release notes.",
};

const source = "https://groups.google.com/g/dataverse-community/c/EWYo5x8f8Cc/m/mBeE_yvcBgAJ";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const years = Array.from({ length: 12 }, (_, i) => 2015 + i);
const label = (tag: string) => tag.replace(/^v/, "");
const releaseUrl = (tag: string) => `https://github.com/IQSS/dataverse/releases/tag/${tag}`;
const dateLabel = (date: string) => new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const inYear = (year: number) => releases.filter(r => r.date.startsWith(String(year))).sort((a, b) => a.date.localeCompare(b.date) || label(a.tag).localeCompare(label(b.tag), undefined, { numeric: true }));

function ReleaseChart() {
  return <figure className="release-chart" aria-labelledby="release-chart-title">
    <div className="release-chart-heading">
      <div><h2 id="release-chart-title">Every release, year by year</h2><p>Each point is a release. Select a version for its release notes.</p></div>
      <div className="release-legend" role="group" aria-label="Version series">{[4, 5, 6].map(series => <span key={series}><i className={`series-${series}`} aria-hidden="true" />{series}.x</span>)}</div>
    </div>
    <div className="release-chart-scroll" tabIndex={0} role="group" aria-label="Release timeline, 2015 through 2026. Scroll horizontally on small screens. Full dates are listed below.">
      <svg viewBox="0 0 1100 1024" className="release-chart-svg" aria-labelledby="release-chart-title release-chart-desc">
        <desc id="release-chart-desc">79 Dataverse software releases, from version 4.0 on May 20, 2015 to version 6.12 on September 17, 2026. Rows represent years; columns represent months. Dates follow the community timeline’s Git-tag history.</desc>
        {months.map((month, i) => <g key={month}><line className="release-month-line" x1={100 + i * 76} x2={100 + i * 76} y1="45" y2="989" /><text className="release-month" x={138 + i * 76} y="26" textAnchor="middle">{month}</text></g>)}
        <text className="release-count-label" x="1060" y="26" textAnchor="middle">Releases</text>
        {years.map((year, row) => {
          const entries = inYear(year);
          const y = 83 + row * 79;
          const laneEnds = [-Infinity, -Infinity];
          return <g key={year}>
            <rect className="release-year-band" x="0" y={y - 37} width="1100" height="75" rx="4" fill={row % 2 === 0 ? "#fff6f0" : "#fff"} />
            <text className="release-year-label" x="23" y={y + 5}>{year}</text>
            <line className="release-year-line" x1="100" x2="1012" y1={y} y2={y} />
            <text className="release-count" x="1060" y={y + 5} textAnchor="middle">{entries.length}</text>
            {entries.map(release => {
              const date = new Date(`${release.date}T12:00:00Z`);
              const month = date.getUTCMonth();
              const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
              const x = 100 + (month + (date.getUTCDate() - 1) / days) * 76;
              const halfLabel = label(release.tag).length * 3.6 + 4;
              const lane = x - halfLabel > laneEnds[0] ? 0 : 1;
              laneEnds[lane] = x + halfLabel;
              const series = label(release.tag).split(".")[0];
              return <a key={release.tag} href={releaseUrl(release.tag)} className={`release-point series-${series}`} aria-label={`Dataverse ${label(release.tag)}, ${dateLabel(release.date)}. Release notes.`}>
                <title>{`Dataverse ${label(release.tag)} · ${dateLabel(release.date)}`}</title>
                <circle className="release-hit-area" cx={x} cy={y} r="15" />
                <circle className="release-dot" cx={x} cy={y} r="5" />
                <text x={x} y={y + (lane === 0 ? -15 : 27)} textAnchor="middle">{label(release.tag)}</text>
              </a>;
            })}
          </g>;
        })}
      </svg>
    </div>
    <figcaption>2015 begins with Dataverse 4.0; 2026 includes releases through 6.12. Dates follow the original community timeline, not necessarily the publication date of the GitHub release notes.</figcaption>
  </figure>;
}

export default function ReleasesPage() {
  return <ArchiveShell>
    <section className="release-hero">
      <a className="roadmap-back" href="/">Dataverse Project</a>
      <div className="section-kicker">SOFTWARE</div>
      <h1>Release timeline</h1>
      <p>Dataverse software releases from 2015 to 2026.</p>
      <div className="release-intro"><p>Dataverse plans to release quarterly, with additional hotfix releases when critical bugs need attention.</p><a href="/roadmap">See what’s ahead in the roadmap <span aria-hidden="true">→</span></a></div>
    </section>
    <section className="release-content" aria-label="Dataverse release history">
      <ReleaseChart />
      <section className="release-directory" aria-labelledby="release-directory-title">
        <div className="release-directory-heading"><h2 id="release-directory-title">Dates &amp; release notes</h2><p>Browse the full history by year.</p></div>
        {[...years].reverse().map(year => <details className="release-year-details" key={year} open={year === 2026}>
          <summary><span>{year}</span><span>{inYear(year).length} releases</span></summary>
          <ul>{[...inYear(year)].reverse().map(release => <li key={release.tag}><a href={releaseUrl(release.tag)}><strong>Dataverse {label(release.tag)}</strong><time dateTime={release.date}>{dateLabel(release.date)}</time><span className="release-notes-link">Release notes ↗</span></a></li>)}</ul>
        </details>)}
      </section>
      <aside className="release-source" aria-label="Timeline sources"><h2>About this timeline</h2><p>Adapted from the release-history data shared by Philip Durbin in the <a href={source}>Dataverse Users Community</a>. All 79 versions and their source dates are preserved. The source uses Git-tag history; GitHub release notes can be published later.</p><p>For release planning, see the <a href="https://guides.dataverse.org/en/6.12/developers/making-releases.html#introduction">release process</a> and <a href="https://github.com/IQSS/dataverse/milestones">technical milestones</a>. Always review a version’s release notes before upgrading.</p></aside>
    </section>
  </ArchiveShell>;
}
