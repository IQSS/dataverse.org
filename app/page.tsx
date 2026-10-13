import PartnerBanner from "./components/PartnerBanner";
import InstallationMap from "./components/InstallationMap";
import GetInvolved from "./components/GetInvolved";
import UseCaseBanner from "./components/UseCaseBanner";
import "./use-cases/use-cases.css";
import IntegrationsBanner from "./components/IntegrationsBanner";
import InstitutionBanner from "./components/InstitutionBanner";
import JournalBanner from "./components/JournalBanner";
import TechnicalPanel from "./components/TechnicalPanel";
import { headlineMetrics as metrics, formatMetric as number } from "../data/headline-metrics";

export default function Home() {
  return <div>
    <header className="site-header">
      <a className="brand" href="/" aria-label="Dataverse Project home"><img className="dataverse-logo" src="/dataverse-project-logo.svg" alt="The Dataverse Project"/></a>
      <nav aria-label="Main navigation"><a href="/about">About</a><a href="https://people.dataverse.org/">People</a><a href="/events">Community</a><a href="/best-practices/data-citation">Best Practices</a><a href="/use-cases">Use Cases</a><a href="/software">Software</a><a href="/roadmap">Roadmap</a><a href="/releases">Releases</a><a href="/research-projects">Research Projects</a><a href="/contact">Contact</a><a href="https://guides.dataverse.org/en/6.10.1/user/">User Guide ↗</a></nav>
      <a className="outline-button" href="/explore">Explore the Dataverse</a>
    </header>

    <main id="main-content" tabIndex={-1}>
    <section className="hero" id="top">
      <h1>Share data to<br/><span className="accent">Advance<br/>Research</span></h1>
      <p className="hero-copy">Dataverse is a global community formed around the open source software and protocols. More than 150 institutions run their own Dataverse installations; Harvard Dataverse is the founding installation.</p>
      <div className="hero-actions"><a className="primary-button" href="/explore">Explore the Dataverse <span aria-hidden="true">→</span></a><a className="text-link" href="/use-cases">See it in use <span aria-hidden="true">→</span></a></div>
      <div className="hero-poster" role="group" aria-label="Dataverse project principles"><div className="hero-callout-heading"><b>Data for<br/>Research</b><img src="/dataverse-rings.svg" alt="" className="dataverse-rings"/></div><div className="hero-principles"><a href="#principle">SHARE</a><a href="/explore">PRESERVE</a><a href="/best-practices/data-citation">CITE</a><a href="/use-cases">DISCOVER</a></div></div>
    </section>

    <section className="verified-stats" aria-label="Dataverse headline numbers">
      <article><span>A PERMANENT COMMITMENT</span><a className="metric-number-link" href="/numbers#installations" aria-label="150+ institutions running Dataverse — source and details"><strong>{metrics.installations}</strong></a><p>global institutions made a permanent commitment to preserve open research data</p><a className="metric-method-link" href="/numbers#installations">Source / details</a></article>
      <article className="stat-emphasis"><span>CITATIONS</span><a className="metric-number-link" href="/numbers#scholarly-citations" aria-label={`${number(metrics.scholarlyCitations)} scholarly citations — source and details`}><strong>{number(metrics.scholarlyCitations)}</strong></a><p>scholarly citations connected to Harvard Dataverse datasets</p><a className="metric-method-link" href="/numbers#scholarly-citations">Source / details</a></article>
      <article><span>DATASETS ACROSS THE NETWORK</span><a className="metric-number-link" href="/numbers#network-datasets" aria-label={`${number(metrics.networkDatasets)}+ datasets across the network — source and details`}><strong>{number(metrics.networkDatasets)}+</strong></a><p>published datasets reported by the network’s repositories</p><a className="metric-method-link" href="/numbers#network-datasets">Source / details</a></article>
    </section>

    <section className="verified-stats usage-stats" aria-label="Harvard Dataverse usage since 2020">
      <article><span>UNIQUE VISITORS</span><a className="metric-number-link" href="/numbers#usage" aria-label={`${number(metrics.harvardUniqueViewsPeople)} unique dataset views by people — source and details`}><strong>{number(metrics.harvardUniqueViewsPeople)}</strong></a><p>on Harvard Dataverse since 2020</p><a className="metric-method-link" href="/numbers#usage">Source / details</a></article>
      <article><span>UNIQUE DOWNLOADS · BY PEOPLE</span><a className="metric-number-link" href="/numbers#usage" aria-label={`${number(metrics.harvardUniqueDownloadsPeople)} unique downloads by people — source and details`}><strong>{number(metrics.harvardUniqueDownloadsPeople)}</strong></a><p>on Harvard Dataverse since 2020</p><a className="metric-method-link" href="/numbers#usage">Source / details</a></article>
      <article><span>DATASET VIEWS · ALL TRAFFIC</span><a className="metric-number-link" href="/numbers#usage" aria-label={`${number(metrics.harvardViews)} dataset views in total — source and details`}><strong>{number(metrics.harvardViews)}</strong></a><p>on Harvard Dataverse since 2020</p><a className="metric-method-link" href="/numbers#usage">Source / details</a></article>
    </section>

    <section className="collection-section" id="principle" aria-labelledby="collection-heading">
      <div className="section-kicker">FOUNDING PRINCIPLE</div>
      <h2 id="collection-heading"><span className="accent">Data Branded as <a className="accent-link" href="/branding">Yours</a></span></h2>
      <p className="collection-intro">All credit goes to the data creator, author, and institution. That is the founding principle, set out in <a href="https://doi.org/10.1177/0049124107306660">King (2007), “An Introduction to the Dataverse Network as an Infrastructure for Data Sharing”</a>.</p>
      <div className="collection-grid">
        <article><h3>Your collection, your identity</h3><p>Your logo, colours and web address, with the collection embedded on your own site.</p><a href="/branding">See a live example →</a></article>
        <article><h3>Yours to use and shape</h3><p>Everyone builds it. You customize it. It is branded as yours.</p><a href="/use-cases">How institutions put it to work →</a></article>
        <article><h3>Governance you control</h3><p>Assign contributor and curator roles, set metadata requirements, manage access and terms of use, and publish citable datasets and new versions under your own rules.</p><a href="/software">What the software provides →</a></article>
      </div>
    </section>

    <section className="harvard-section" id="research">
      <div className="harvard-copy"><div className="section-kicker light">THE FOUNDING REPOSITORY</div><h2>Open to Harvard.<br/>Open to <span className="accent">everyone.</span></h2><p>Harvard Dataverse is where the project began and remains one of the largest repositories of open research data in the world: researchers from any institution and any discipline can deposit, and every dataset is cited and preserved. It is one repository among the 150+, run on the same software as all the others.</p><div className="harvard-actions"><a className="mint-button" href="/explore">Explore the Dataverse <span aria-hidden="true">→</span></a><a className="metric-method-link light-link" href="https://support.dataverse.harvard.edu/about">Source: about Harvard Dataverse ↗</a></div></div>
      <div className="harvard-facts" role="group" aria-label="Harvard Dataverse in numbers">
        <div><b>{number(metrics.harvardDatasets)}</b><span>published datasets</span></div>
        <div><b>{number(metrics.scholarlyCitations)}</b><span>scholarly citations</span></div>
        <div><b>{number(metrics.harvardUniqueDownloadsPeople)}</b><span>unique downloads by people since 2020</span></div>
        <a className="metric-method-link" href="/numbers">Source / details</a>
      </div>
    </section>

    <section className="project-section community-section" id="community">
      <div className="section-kicker">A GLOBAL COMMUNITY</div>
      <div className="section-grid"><h2>Built, run and improved by the Dataverse Research Community.</h2><div className="section-intro"><p>Developers, data curators, librarians and researchers from the 150+ installations contribute code, documentation, translations and support. They meet every year at the Dataverse Community Meeting, talk monthly on community calls, and coordinate through the Global Dataverse Community Consortium (GDCC), the body through which installations share work on containers, documentation, large and sensitive data, and more.</p><p>The project is led from Harvard’s Institute for Quantitative Social Science, which built the first release in 2006 and still maintains the software with the community.</p><a className="metric-method-link" href="/about#team">Who leads it →</a></div></div>
      <figure className="ecosystem-figure community-figure" aria-label="The connected Dataverse project ecosystem">
        <figcaption>Dataverse Project Ecosystem</figcaption>
        <div className="ecosystem-scroll" tabIndex={0} role="group" aria-label="Linked ecosystem diagram">
        <div className="ecosystem-diagram">
        <svg className="ecosystem-connections" aria-hidden="true">
          {[[50, 14], [20, 22], [80, 22], [9, 56], [91, 56], [24, 82], [76, 82]].map(([x, y]) => <line key={`${x}-${y}`} x1="50%" y1="50%" x2={`${x}%`} y2={`${y}%`} />)}
        </svg>
        <a className="ecosystem-node node-center" href="/about"><small>OPEN-SOURCE</small><strong>DATAVERSE<br/>PROJECT</strong></a>
        <a className="ecosystem-node node-harvard" href="#research"><strong>Harvard<br/>Dataverse</strong><span>Founding installation</span></a>
        <a className="ecosystem-node node-installations" href="/explore"><strong>150+<br/>Installations</strong><span>Independent repositories →</span></a>
        <a className="ecosystem-node node-community" href="/events"><strong>Global<br/>Community</strong><span>GDCC, meetings, calls →</span></a>
        <a className="ecosystem-node node-software" href="/software"><strong>Software<br/>Project</strong><span>Technical details →</span></a>
        <a className="ecosystem-node node-researchers" href="/use-cases"><strong>Researchers</strong><span>Use cases →</span></a>
        <a className="ecosystem-node node-integrations" href="#integrations"><strong>Integrations</strong><span>Connected tools</span></a>
        <a className="ecosystem-node node-partners" href="#partners"><strong>Support</strong><span>Funders and partners</span></a>
        </div>
        </div>
      </figure>
      <InstallationMap hideDirectory />
      <InstitutionBanner embedded />
      <GetInvolved />
    </section>

    <UseCaseBanner />

    <JournalBanner />

    <TechnicalPanel />
    <IntegrationsBanner />
    <PartnerBanner />
    </main>
    <footer><div className="brand footer-brand"><img className="iqss-logo" src="/iqss-logo.jpg" alt="IQSS"/><span><b>Dataverse</b><small>Open research, connected</small></span></div><p>An open-source project led by Harvard IQSS<br/>and built with a global community.</p><div><a href="/about">About</a><a href="/explore">Explore</a><a href="/blog">Blog</a><a href="/presentations">Presentations</a><a href="/publications">Publications</a><a href="/software">Software</a><a href="/contact">Contact</a><a href="https://accessibility.huit.harvard.edu/digital-accessibility-policy">Accessibility</a></div></footer>
  </div>;
}
