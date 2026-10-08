import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ArchiveShell } from "../../components/SiteChrome";
import { findUseCase, useCases, useCaseRepo } from "../../../data/use-cases";
import "../use-cases.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return useCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = findUseCase((await params).slug);
  return { title: item ? `${item.title} | Use cases | The Dataverse Project` : "Use case not found", description: item?.summary };
}

export default async function UseCasePage({ params }: Props) {
  const item = findUseCase((await params).slug);
  if (!item) notFound();
  return <ArchiveShell>
    <article className="archive-detail use-case-detail">
      <header className="archive-detail-head">
        <p><a href="/use-cases">Use cases</a> · {item.audience} · {item.kind}</p>
        <h1>{item.title}</h1>
      </header>
      <figure className="use-case-hero"><img src={item.image} alt={item.imageAlt} /></figure>
      <div className="use-case-layout">
        <div className="use-case-prose">
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{item.body}</Markdown>
        </div>
        <aside className="archive-resources use-case-aside">
          <p>About this use case</p>
          <a href={item.doi}><span>Cite it on Zenodo</span><b>↗</b></a>
          <a href={`${useCaseRepo}/${item.slug}`}><span>Source on GitHub</span><b>↗</b></a>
          <a href="/use-cases"><span>All use cases</span><b>→</b></a>
          <p className="use-case-citation">{item.citation} {item.doi}</p>
        </aside>
      </div>
    </article>
  </ArchiveShell>;
}
