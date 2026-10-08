const guide = "https://guides.dataverse.org/en/latest/admin/integrations.html";

const integrations: { name: string; anchor?: string; href?: string; logo?: string; dark?: boolean; note?: string }[] = [
  { name: "RSpace", anchor: "rspace", logo: "rspace.svg" },
  { name: "Google Data Commons", href: "/roadmap", logo: "data-commons.svg", note: "Roadmap collaboration" },
  { name: "Open Science Framework (OSF)", anchor: "open-science-framework-osf", logo: "osf-icon.png" },
  { name: "GitHub", anchor: "github", logo: "GitHub_Lockup_Black.svg" },
  { name: "Dropbox", anchor: "dropbox", logo: "Wordmark_Color_128.svg" },
  { name: "Open Journal Systems (OJS)", anchor: "open-journal-systems-ojs-and-ops", logo: "ojs.png" },
  { name: "Open Preprint Systems (OPS)", anchor: "open-journal-systems-ojs-and-ops", logo: "ops.png" },
  { name: "Amnesia", anchor: "amnesia", logo: "amnesia.svg" },
  { name: "SampleDB", anchor: "sampledb", logo: "sampledb.svg" },
  { name: "REDCap", anchor: "redcap", logo: "redcap.svg", dark: true },
  { name: "GitLab", anchor: "gitlab", logo: "gitlab.svg" },
  { name: "iRODS", anchor: "irods", logo: "irods.svg" },
  { name: "Integrations Dashboard", anchor: "integrations-dashboard", note: "In development" },
  { name: "Globus", anchor: "globus", logo: "globus.svg", dark: true },
  { name: "DataLad", anchor: "datalad", logo: "datalad.svg" },
  { name: "Open OnDemand", anchor: "open-ondemand", logo: "open-ondemand-light.png" },
  { name: "Galaxy", anchor: "galaxy", logo: "galaxy.png" },
  { name: "OpenScholar", anchor: "openscholar", logo: "openscholar.png" },
  { name: "Data Explorer", anchor: "data-explorer", logo: "data-explorer.svg" },
  { name: "Compute Button", anchor: "compute-button", note: "Experimental" },
  { name: "Binder", anchor: "binder", logo: "binder.svg" },
  { name: "Renku", anchor: "renku", logo: "renku-wordmark.svg" },
  { name: "Avgidea Data Search", anchor: "avgidea-data-search", logo: "avgidea.png" },
  { name: "JupyterHub", anchor: "jupyterhub", logo: "jupyterhub.svg" },
  { name: "Rclone", anchor: "rclone", logo: "rclone.svg" },
  { name: "Geodisy", anchor: "geodisy", logo: "geodisy.svg" },
  { name: "DataONE", anchor: "dataone", logo: "dataone.png" },
  { name: "Archivematica", anchor: "archivematica", logo: "archivematica.png" },
  { name: "RDA BagIt (BagPack) Archiving", anchor: "rda-bagit-bagpack-archiving", logo: "rda.png" },
];

export default function IntegrationsBanner() {
  return <section className="partner-banner integrations-banner" id="integrations" aria-labelledby="integrations-heading">
    <div className="integration-heading"><h2 id="integrations-heading">Integrations</h2><a href={guide}>Explore the integrations guide</a></div>
    <div className="partner-scroll" tabIndex={0} role="region" aria-label="Integrations, scroll horizontally to see all tools">
      <ul className="partner-grid integration-grid">
        {integrations.map(integration => <li key={integration.name}>
          <a href={integration.href || `${guide}#${integration.anchor}`} className={integration.dark ? "partner-on-dark" : undefined}>
            <span className="partner-logo-frame">{integration.logo ? <img src={`/integrations/${integration.logo}`} alt="" loading="lazy" /> : <span className="integration-text-mark">{integration.name}</span>}</span>
            <span className="partner-name">{integration.name}</span>
            {integration.note && <span className="integration-note">{integration.note}</span>}
          </a>
        </li>)}
      </ul>
    </div>
  </section>;
}
