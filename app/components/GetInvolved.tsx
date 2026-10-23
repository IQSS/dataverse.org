const workingGroups = ["Containerization", "Documentation", "Internationalization", "Large Data Support", "pyDataverse", "Sensitive Data"];

export default function GetInvolved() {
  return <section className="get-involved-card" id="get-involved" aria-labelledby="get-involved-heading">
    <div className="get-involved-header">
      <h3 id="get-involved-heading">How to Get Involved</h3>
      <nav className="involvement-links" aria-label="Ways to get involved">
        <a href="/community-calls">Community Calls</a>
        <a href="https://dataverse.zulipchat.com/">Zulip Chat</a>
        <a href="https://groups.google.com/g/dataverse-dev">Dataverse Dev</a>
        <a href="https://github.com/IQSS/dataverse">Contribute on GitHub</a>
      </nav>
    </div>
    <div className="working-groups">
      <div><h4>Working Groups</h4><p>Run by the Global Dataverse Community Consortium (GDCC), the body through which installations coordinate. Anyone may join a group; no membership or fee is required.</p></div>
      <ul>{workingGroups.map(group => <li key={group}>{group}</li>)}</ul>
      <a className="working-group-source" href="/events">Community Page: Calls, Meetings, and How to Join</a>
    </div>
  </section>;
}
