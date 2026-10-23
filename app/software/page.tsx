import type { Metadata } from "next";
import { ArchiveShell } from "../components/SiteChrome";
import "./software.css";

export const metadata: Metadata = {
  title: "Software | The Dataverse Project",
  description: "What the Dataverse software is made of: architecture, APIs, metadata standards, storage and large-data options, authentication, deployment, and how to run or extend it.",
};

const sections = [
  {
    title: "Dataverse Software",
    items: [
      ["Purpose", "A web application for publishing, preserving, citing, exploring and analysing research data. Each installation hosts collections (called Dataverse collections), each collection holds datasets, and each dataset holds files, metadata and a version history."],
      ["License", "Apache License 2.0. Source, issues and releases are on GitHub under IQSS/dataverse; development happens in the open with a quarterly release cadence."],
      ["Languages", "Java (Jakarta EE) on the Payara application server, with a React front end (the modern Dataverse interface) under active development alongside the current JSF interface."],
    ],
  },
  {
    title: "Architecture",
    items: [
      ["Application", "Payara (Jakarta EE) running the Dataverse WAR; horizontal scaling by running several application servers against one database."],
      ["Database", "PostgreSQL for all application state, with Flyway-managed schema migrations."],
      ["Search", "Apache Solr indexes datasets, files and collections; faceted search, permission-aware results, and per-installation facet configuration."],
      ["Storage", "Pluggable file stores: local filesystem, Amazon S3 and S3-compatible object stores, Swift, Globus-managed storage, and remote stores for files that stay where they are. Several stores can be mixed in one installation."],
      ["Containers", "Official container images and a Docker Compose setup for development and demos; a community containerization working group maintains them."],
    ],
  },
  {
    title: "Metadata and Standards",
    items: [
      ["Metadata blocks", "Citation, geospatial, social science, astronomy, life sciences, journal and custom blocks; installations add fields and controlled vocabularies without code changes."],
      ["Standards", "DDI, Dublin Core, DataCite, schema.org JSON-LD and Croissant for datasets; OAI-PMH for harvesting between installations and with other repositories; OAI-ORE and BagIt for archival export."],
      ["Persistent identifiers", "DOIs through DataCite or Crossref, Handles, or PermaLinks; identifiers at the dataset level and optionally per file."],
      ["Citations and metrics", "A formal data citation on every dataset; Make Data Count usage statistics; file-level and dataset-level download counts."],
    ],
  },
  {
    title: "Data and Files",
    items: [
      ["Tabular data", "Ingest of CSV, Excel, SPSS, Stata, R and SAS files into a preservation format with variable-level metadata (DDI) and a universal numerical fingerprint (UNF)."],
      ["Large data", "Direct upload to S3, Globus transfer, multi-file zip handling, and remote file references for datasets too large to copy; used in production for multi-terabyte datasets."],
      ["Previews and tools", "External tools and previewers for images, text, spreadsheets, maps, notebooks and more; tools can be configured per file type and launched from the dataset page."],
      ["Versions and provenance", "Every published change creates a new dataset version; file-level provenance can be captured and displayed."],
    ],
  },
  {
    title: "Access, Identity and Governance",
    items: [
      ["Authentication", "Built-in accounts, Shibboleth/SAML federations, OpenID Connect (including ORCID, GitHub and institutional providers), and API tokens."],
      ["Roles and permissions", "Fine-grained roles on collections, datasets and files; guestbooks, terms of use, embargoes, restricted files with access requests, and anonymised review links for peer review."],
      ["Sensitive data", "Restricted and embargoed files, access-request workflows, and a community working group on sensitive-data support."],
      ["Internationalisation", "The interface ships in multiple languages maintained by the community."],
    ],
  },
  {
    title: "Interfaces and Integrations",
    items: [
      ["APIs", "A native REST API for everything the interface can do, plus SWORD, Search, Metrics and Data Access APIs; client libraries such as pyDataverse (Python), dataverse-client-r (R) and Java."],
      ["Integrations", "Connections to tools researchers already use: Jupyter and Binder, RSpace, Open Science Framework, DataLad, Globus, Archivematica, Whole Tale, Amnesia, and journal systems such as OJS. See the integrations strip on the home page."],
      ["Harvesting", "Installations harvest each other's metadata over OAI-PMH, which is how Harvard Dataverse lists datasets from across the network."],
    ],
  },
];

const links = [
  { label: "Run It in Five Minutes (Container Quickstart)", href: "https://guides.dataverse.org/en/latest/container/running/demo.html#quickstart" },
  { label: "Try the Demo Site", href: "https://demo.dataverse.org/" },
  { label: "Installation Guide", href: "https://guides.dataverse.org/en/latest/installation/" },
  { label: "API Guide", href: "https://guides.dataverse.org/en/latest/api/" },
  { label: "Developer Guide", href: "https://guides.dataverse.org/en/latest/developers/" },
  { label: "Admin Feature List", href: "https://guides.dataverse.org/en/latest/admin/features.html" },
  { label: "Source on GitHub", href: "https://github.com/IQSS/dataverse" },
];

export default function SoftwarePage() {
  return <ArchiveShell>
    <article className="archive-detail software-page">
      <header className="archive-detail-head"><p>Dataverse Project</p><h1>The Software</h1></header>
      <div className="software-body">
        <p className="software-lede">The technical detail behind the project, for people who run repositories, write integrations, or want to know what they are adopting. Everything here is open source and documented in the <a href="https://guides.dataverse.org/">Dataverse Guides</a>, which remain the reference; this page is the map. <a href="/releases">Releases</a> and the <a href="/roadmap">roadmap</a> show what is shipping and what comes next.</p>
        <div className="software-grid">
          {sections.map((section) => <section key={section.title} aria-labelledby={`software-${section.title.replace(/\W+/g, "-").toLowerCase()}`}>
            <h2 id={`software-${section.title.replace(/\W+/g, "-").toLowerCase()}`}>{section.title}</h2>
            <dl>{section.items.map(([term, text]) => <div key={term}><dt>{term}</dt><dd>{text}</dd></div>)}</dl>
          </section>)}
        </div>
        <section className="software-links" aria-labelledby="software-links-heading">
          <h2 id="software-links-heading">Get Your Hands on It</h2>
          <ul>{links.map((link) => <li key={link.href}><a href={link.href}>{link.label} <span aria-hidden="true">↗</span></a></li>)}</ul>
        </section>
      </div>
    </article>
  </ArchiveShell>;
}
