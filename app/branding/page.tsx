import type { Metadata } from "next";
import { ArchiveShell } from "../components/SiteChrome";
import "./branding.css";

export const metadata: Metadata = {
  title: "Branded as yours: a live demo | The Dataverse Project",
  description: "What a Dataverse collection looks like embedded on its owner's own website: Gary King’s dataverse, live, with the two lines of HTML that put it there.",
};

export default function BrandingPage() {
  return <ArchiveShell>
    <article className="archive-detail branding-page">
      <header className="archive-detail-head"><p><a href="/#principle">Data Branded as Yours</a></p><h1>Branded as yours, live</h1></header>
      <div className="branding-body">
        <p className="branding-lede">A Dataverse collection can live on its owner’s own website, under the owner’s name, while the data stays in the repository with its citation and preservation. Below is a real one: Gary King’s dataverse, embedded here exactly as it is on <a href="https://gking.harvard.edu/dataverse/">his own site</a>. Everything in the frame is served live from Harvard Dataverse.</p>
        <section className="branding-demo" aria-labelledby="branding-demo-heading">
          <div className="branding-demo-chrome"><span id="branding-demo-heading">gking.harvard.edu/dataverse</span><a href="https://gking.harvard.edu/dataverse/">Open the page</a></div>
          <a className="branding-shot" href="https://gking.harvard.edu/dataverse/"><img src="/branding/gking-dataverse.jpg" alt="Gary King’s website with his Dataverse collection embedded: the Harvard Dataverse search box, facets and the first of 69 datasets appear inside his own page, under his own navigation" width="1512" height="770" /></a>
          <details className="branding-live">
            <summary>Show the live embed</summary>
            <div className="branding-frame"><iframe title="Gary King’s dataverse on Harvard Dataverse" src="https://dataverse.harvard.edu/dataverse/king?widget=true" loading="lazy" /></div>
            <p className="branding-fallback">Harvard Dataverse sometimes asks the browser for a bot check that cannot run inside a frame; if so, open <a href="https://dataverse.harvard.edu/dataverse/king">the collection on Harvard Dataverse</a> directly.</p>
          </details>
        </section>
        <section className="branding-how" aria-labelledby="branding-how-heading">
          <h2 id="branding-how-heading">How it is done</h2>
          <p>The owner of a collection pastes one script tag into any page of their site. Dataverse supplies it under the collection’s Theme and Widgets settings; this is the one on Gary’s page:</p>
          <pre><code>{`<script src="https://dataverse.harvard.edu/resources/js/widgets.js?alias=king&dvUrl=https://dataverse.harvard.edu&widgetScope=king&widget=iframe&heightPx=800"></script>`}</code></pre>
          <p>The same settings page sets the collection’s logo, colours, tagline and link back to the owner’s website, so the collection carries the owner’s identity inside the repository too. A search-box widget is available as well, for a site that wants a search field rather than the full collection.</p>
          <ul className="branding-links">
            <li><a href="https://guides.dataverse.org/en/latest/user/dataverse-management.html#theme-widgets">Theme and widgets in the User Guide <span aria-hidden="true">↗</span></a></li>
            <li><a href="/explore">Installations that run the whole thing under their own name</a></li>
            <li><a href="/use-cases">Use cases</a></li>
          </ul>
        </section>
      </div>
    </article>
  </ArchiveShell>;
}
