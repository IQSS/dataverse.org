import type { Metadata } from "next";
import { ArchiveShell } from "../components/SiteChrome";
import { UseCaseCard } from "../components/UseCaseBanner";
import { useCases, useCaseRepo } from "../../data/use-cases";
import "./use-cases.css";

export const metadata: Metadata = {
  title: "Use cases | The Dataverse Project",
  description: "Data-sharing stories and worked scenarios showing how researchers, institutions and funders use the Harvard Dataverse Repository.",
};

export default function UseCasesPage() {
  const stories = useCases.filter((item) => item.kind === "Data sharing story");
  const scenarios = useCases.filter((item) => item.kind === "Worked scenario");
  return <ArchiveShell>
    <article className="archive-detail use-cases-page">
      <header className="archive-detail-head"><p>Dataverse Project</p><h1>Use cases</h1></header>
      <div className="use-cases-body">
        <p className="use-cases-intro">How people use the Harvard Dataverse Repository, in their own words and in worked examples. The stories are interviews with research teams who built data-sharing communities on Dataverse; the scenarios walk through what a researcher, an institution or a funder can do today. All of them are published openly in the <a href={useCaseRepo.replace(/\/tree\/.*$/, "")}>dataverse-use-cases repository</a> and on Zenodo, with support from the NIH Generalist Repository Ecosystem Initiative.</p>
        <h2>Data sharing stories</h2>
        <ul className="use-case-grid">{stories.map((item) => <UseCaseCard key={item.slug} item={item} />)}</ul>
        <h2>Worked scenarios</h2>
        <ul className="use-case-grid">{scenarios.map((item) => <UseCaseCard key={item.slug} item={item} />)}</ul>
      </div>
    </article>
  </ArchiveShell>;
}
