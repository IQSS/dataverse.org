import InstallationMap from "./components/InstallationMap";
import PartnerBanner from "./components/PartnerBanner";
import GetInvolved from "./components/GetInvolved";
import IntegrationsBanner from "./components/IntegrationsBanner";
import InstitutionBanner from "./components/InstitutionBanner";
import JournalBanner from "./components/JournalBanner";
import { headlineMetrics as metrics, formatMetric as number } from "../data/headline-metrics";

export default function Home() {
  return <div>
    <header className="site-header">
      <a className="brand" href="/" aria-label="Dataverse Project home"><img className="dataverse-logo" src="/dataverse-project-logo.svg" alt="The Dataverse Project"/></a>
      <nav aria-label="Main navigation"><a href="/about">About</a><a className="people-button" href="https://people.dataverse.org/">People</a><a href="/events">Community</a><a href="/best-practices/data-citation">Best Practices</a><a href="/software-features">Software</a><a href="/roadmap">Roadmap</a><a href="/releases">Releases</a><a href="/trusted-data-collaboration">Research Projects</a><a href="/contact">Contact</a><a href="https://guides.dataverse.org/en/6.10.1/user/">User Guide ↗</a></nav>
      <a className="outline-button" href="https://dataverse.harvard.edu/">Explore Harvard Dataverse ↗</a>
    </header>

    <main id="main-content" tabIndex={-1}>
    <section className="hero" id="top">
      <h1>Share data to<br/><span className="accent">Advance<br/>Research</span></h1>
      <p className="hero-copy">Dataverse is an open-source software project and a global community that institutions use to operate their own research data repositories, housing research data you can trust and use.</p>
      <div className="hero-actions"><a className="primary-button" href="#project">Discover the project <span aria-hidden="true">→</span></a><a className="text-link" href="https://guides.dataverse.org/en/latest/container/running/demo.html#quickstart">Run Dataverse <span aria-hidden="true">↗</span></a></div>
      <div className="hero-poster" role="group" aria-label="Dataverse project principles"><div className="hero-callout-heading"><b>Data for<br/>Research</b><img src="/dataverse-rings.svg" alt="" className="dataverse-rings"/></div><div className="hero-principles"><a href="https://guides.dataverse.org/en/latest/user/dataset-management.html">SHARE</a><a href="/book/preservation-plan">PRESERVE</a><a href="/best-practices/data-citation">CITE</a><a href="/installations">DISCOVER</a></div></div>
    </section>

    <section className="verified-stats" aria-label="Dataverse headline numbers">
      <article><span>THE GLOBAL COMMUNITY</span><a className="metric-number-link" href="/numbers#installations" aria-label="How we count 150+ Dataverse installations"><strong>{metrics.installations}</strong></a><p>Dataverse installations around the world</p><a className="metric-method-link" href="/numbers#installations">How we count installations</a></article>
      <article className="stat-emphasis"><span>CITATIONS</span><a className="metric-number-link" href="/numbers#scholarly-citations" aria-label={`${number(metrics.scholarlyCitations)} scholarly citations — how we count`}><strong>{number(metrics.scholarlyCitations)}</strong></a><p>scholarly citations connected to Harvard Dataverse datasets</p><a className="metric-method-link" href="/numbers#scholarly-citations">How we count Scholarly Citations</a></article>
      <article><span>TOTAL DATASETS IN THE NETWORK</span><a className="metric-number-link" href="/numbers#network-datasets" aria-label={`${number(metrics.networkDatasets)}+ datasets across the network — how we count`}><strong>{number(metrics.networkDatasets)}+</strong></a><p>published datasets reported across the network</p><a className="metric-method-link" href="/numbers#network-datasets">How we count network datasets</a></article>
    </section>

    <section className="project-section" id="project">
      <div className="section-kicker">THE DATAVERSE RESEARCH DATA ECOSYSTEM</div>
      <div className="section-grid"><h2>Open-source infrastructure for research data.</h2><div className="section-intro"><p>Dataverse is not a single repository. It is an open-source software project and a global community that institutions use to operate their own research data repositories.</p><p>Each installation is locally governed and distinct—while sharing code, standards, and a commitment to durable, citable research.</p></div></div>
      <div className="model-grid">
        <article><div className="model-icon code-icon">{`</>`}</div><h3>The open-source project</h3><p>Community-built software for sharing, preserving, citing, exploring, and analyzing research data.</p><a href="https://github.com/IQSS/dataverse">View the source ↗</a></article>
        <article className="featured"><div className="model-icon harvard-icon">H</div><h3>Harvard Dataverse</h3><p>The original, flagship installation—and the most open: researchers worldwide, across disciplines, can deposit data.</p><a href="https://dataverse.harvard.edu/">Visit the repository ↗</a></article>
        <article><div className="model-icon globe-icon">●</div><h3>150+ installations</h3><p>National, regional, and institutional repositories run independently across six continents.</p><a href="https://dataverse.org/installations">Explore the global map ↗</a></article>
      </div>
      <InstallationMap />
      <GetInvolved />
      <InstitutionBanner embedded />
    </section>

    <section className="harvard-section" id="research">
      <div className="harvard-copy"><div className="section-kicker light">WORLD’S LARGEST GENERAL PURPOSE RESEARCH DATA REPOSITORY</div><h2>Open to Harvard.<br/>Open to <span className="accent">everyone.</span></h2><p>Harvard Dataverse is where the project began—but it is one peer in a worldwide network.</p><a className="mint-button" href="https://dataverse.harvard.edu/">Explore Harvard Dataverse →</a></div>
      <figure className="ecosystem-figure" aria-label="The connected Dataverse project ecosystem">
        <figcaption>Dataverse Project Ecosystem</figcaption>
        <div className="ecosystem-scroll" tabIndex={0} role="group" aria-label="Linked ecosystem diagram">
        <div className="ecosystem-diagram">
        <svg className="ecosystem-connections" viewBox="0 0 600 760" preserveAspectRatio="none" aria-hidden="true">
          <path d="M300 380 L300 91.2 M300 380 L120 212.8 M300 380 L480 212.8 M300 380 L90 456 M300 380 L510 456 M300 380 L192 653.6 M300 380 L408 653.6" />
        </svg>
        <a className="ecosystem-node node-center" href="/about"><small>OPEN-SOURCE</small><strong>DATAVERSE<br/>PROJECT</strong></a>
        <a className="ecosystem-node node-harvard" href="https://dataverse.harvard.edu/"><strong>Harvard<br/>Dataverse</strong><span>Flagship repository ↗</span></a>
        <a className="ecosystem-node node-installations" href="/installations"><strong>150+<br/>Installations</strong><span>Independent repositories →</span></a>
        <a className="ecosystem-node node-community" href="https://www.gdcc.io/"><strong>GDCC / Global<br/>Community</strong><span>Coordinate and contribute ↗</span></a>
        <a className="ecosystem-node node-software" href="https://github.com/IQSS/dataverse"><strong>Software<br/>Project</strong><span>Build in the open ↗</span></a>
        <a className="ecosystem-node node-researchers" href="https://guides.dataverse.org/en/latest/user/"><strong>Researchers</strong><span>Share and discover ↗</span></a>
        <a className="ecosystem-node node-integrations" href="https://guides.dataverse.org/en/latest/admin/integrations.html"><strong>Integrations</strong><span>Explore connected tools</span></a>
        <a className="ecosystem-node node-partners" href="#partners"><strong>Partners</strong><span>Meet our partners</span></a>
        </div>
        </div>
      </figure>
    </section>

    <section className="collection-section" aria-labelledby="collection-heading">
      <div className="section-kicker">DATAVERSE COLLECTIONS</div>
      <h2 id="collection-heading">Branded as Yours</h2>
      <p className="collection-intro">Credit belongs to the people who create the data. A Dataverse collection gives your research group, institution, or journal its own identity within a shared repository.</p>
      <div className="collection-grid">
        <article><h3>Your collection, your identity</h3><p>Add your logo, colors, and website link. Embed your collection on your own site while keeping datasets citable and discoverable.</p><a href="https://guides.dataverse.org/en/6.10.1/user/dataverse-management.html#theme">Brand a collection ↗</a></article>
        <article><h3>Data governance</h3><p>Assign contributor and curator roles, set metadata requirements, and manage file access and terms of use within your repository’s policies.</p><a href="https://guides.dataverse.org/en/6.10.1/user/dataverse-management.html#roles-permissions">Manage roles and permissions ↗</a></article>
        <article><h3>Workflows we support</h3><p>Deposit and describe data, submit for curation, share drafts for review, publish a citable dataset, and release new versions.</p><a href="https://guides.dataverse.org/en/6.10.1/user/dataset-management.html">Explore dataset workflows ↗</a></article>
      </div>
    </section>

    <section className="harvard-metrics-bottom"><div><span>HARVARD DATAVERSE REPOSITORY</span><a className="metric-number-link" href="/numbers#harvard-datasets" aria-label={`${number(metrics.harvardDatasets)} Harvard Dataverse datasets — how we count`}><strong>{number(metrics.harvardDatasets)}</strong></a><p>published datasets</p><a className="metric-method-link" href="/numbers#harvard-datasets">How we count Harvard datasets</a></div></section>

    <section className="pathways" id="software"><div className="section-kicker">FOR YOUR COMMUNITY</div><h2>Dataverse is yours<br/><span className="accent">to use and shape.</span></h2><div className="path-grid community-values">
      <a href="/researchers"><span>RESEARCHERS &amp; LABS</span><b>Share data. Receive credit.</b><p>Publish citable data, organize a lab collection, and find data to reuse.</p><span className="path-arrow" aria-hidden="true">→</span></a>
      <a href="https://guides.dataverse.org/en/6.10.1/user/"><span>DATA STEWARDS</span><b>Curate with control.</b><p>Manage metadata, review submissions, and assign access and permissions.</p><span className="path-arrow" aria-hidden="true">→</span></a>
      <a href="/institutions"><span>UNIVERSITIES &amp; GOVERNMENTS</span><b>Build durable infrastructure.</b><p>Run an independently governed repository or create a branded collection.</p><span className="path-arrow" aria-hidden="true">→</span></a>
      <a href="/journals"><span>JOURNALS</span><b>Connect findings to data.</b><p>Support data review and link publications to their underlying datasets.</p><span className="path-arrow" aria-hidden="true">→</span></a>
      <a href="https://support.dataverse.harvard.edu/use-cases-harvard-dataverse-repository"><span>FUNDERS</span><b>Find the research you support.</b><p>Use funding metadata to discover datasets associated with your grants.</p><span className="path-arrow" aria-hidden="true">→</span></a>
      <a href="/roadmap"><span>DEVELOPERS &amp; CONTRIBUTORS</span><b>Shape what comes next.</b><p>Follow the roadmap, explore release milestones, and contribute to shared software.</p><span className="path-arrow" aria-hidden="true">→</span></a>
    </div></section>

    <JournalBanner />
    <IntegrationsBanner />
    <PartnerBanner />
    </main>
    <footer><div className="brand footer-brand"><img className="iqss-logo" src="/iqss-logo.jpg" alt="IQSS"/><span><b>Dataverse</b><small>Open research, connected</small></span></div><p>An open-source project led by Harvard IQSS<br/>and built with a global community.</p><div><a href="/about">About</a><a href="/installations">Installations</a><a href="/blog">Blog</a><a href="/presentations">Presentations</a><a href="/publications">Publications</a><a href="/reports">Reports</a><a href="https://accessibility.huit.harvard.edu/digital-accessibility-policy">Accessibility</a></div></footer>
  </div>;
}
