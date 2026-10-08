const workingGroups = [
  { name: "Containerization", href: "https://ct.gdcc.io/" },
  { name: "Documentation", href: "https://www.gdcc.io/working-groups/documentation.html" },
  { name: "Internationalization", href: "https://www.gdcc.io/working-groups/internationalization.html" },
  { name: "Large Data Support", href: "https://www.gdcc.io/working-groups/large-data-support.html" },
  { name: "pyDataverse", href: "https://py.gdcc.io/" },
  { name: "Sensitive Data", href: "https://www.gdcc.io/working-groups/sensitive-data.html" },
];

export default function GetInvolved() {
  return <section className="get-involved-card" id="get-involved" aria-labelledby="get-involved-heading">
    <div className="get-involved-header">
      <h3 id="get-involved-heading">How to Get Involved</h3>
      <nav className="involvement-links" aria-label="Ways to get involved">
        <a href="/community-calls">Community calls</a>
        <a href="https://dataverse.zulipchat.com/">Zulip chat</a>
        <a href="https://groups.google.com/g/dataverse-dev">Dataverse Dev</a>
        <a href="https://github.com/IQSS/dataverse">Contribute on GitHub</a>
      </nav>
    </div>
    <div className="working-groups">
      <div><h4>GDCC working groups</h4><p>Everyone is welcome to join our groups. No fee (GDCC or otherwise) is required to join a group.</p></div>
      <ul>{workingGroups.map(group => <li key={group.name}><a href={group.href}>{group.name}</a></li>)}</ul>
      <a className="working-group-source" href="https://www.gdcc.io/working-groups.html">All working groups and past groups</a>
    </div>
  </section>;
}
