export default function CommunityConnections() {
  return <section className="community-connections" aria-labelledby="community-connections-heading">
    <h2 id="community-connections-heading">Dataverse Project community</h2>
    <div className="community-connection-grid">
      <article>
        <h3>Community calls</h3>
        <p>On the first Tuesday of the month, the Dataverse Project hosts a Zoom call to discuss upcoming releases, contributions from the community, and other topics. All are welcome to attend!</p>
        <a href="/community-calls">Calls, notes and recordings <span aria-hidden="true">→</span></a>
      </article>
      <article>
        <h3>Zulip chat</h3>
        <p>Join the Dataverse community on Zulip.</p>
        <a href="https://dataverse.zulipchat.com/">Open Dataverse chat <span aria-hidden="true">↗</span></a>
      </article>
      <article>
        <h3>Google Group</h3>
        <p>Discuss Dataverse development in the Dataverse Dev group.</p>
        <a href="https://groups.google.com/g/dataverse-dev">Visit Dataverse Dev <span aria-hidden="true">↗</span></a>
      </article>
      <article>
        <h3>Dataverse TV</h3>
        <p>Video content from the Dataverse community.</p>
        <a href="/dataversetv">Watch Dataverse TV</a>
      </article>
    </div>
  </section>;
}
