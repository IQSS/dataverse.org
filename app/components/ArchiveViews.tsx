import ArchiveIndex, { type ArchiveIndexItem } from "./ArchiveIndex";
import { ArchiveShell } from "./SiteChrome";
import CommunityConnections from "./CommunityConnections";
import AboutContent from "./AboutContent";
import InstitutionBanner from "./InstitutionBanner";
import AudienceContent from "./AudienceContent";
import JournalBanner from "./JournalBanner";
import {
  blogPosts,
  events,
  presentations,
  projectPages,
  publications,
  reports,
  type BlogPost,
  type CitationRecord,
  type EventRecord,
  type ProjectPage,
  type ReportRecord,
} from "../archive-data";

function ArchiveHero({
  eyebrow,
  title,
  description,
  count,
}: {
  eyebrow: string;
  title: string;
  description: string;
  count?: number;
}) {
  return (
    <section className="archive-hero">
      <p className="archive-eyebrow">{eyebrow}</p>
      <div className="archive-hero-grid">
        <h1>{title}</h1>
        <div>
          <p>{description}</p>
          {typeof count === "number" && <strong>{count}</strong>}
        </div>
      </div>
    </section>
  );
}

function textBlocks(text: string, title?: string) {
  let cleaned = text.replace(/\r/g, "").trim();
  if (title && cleaned.startsWith(title)) cleaned = cleaned.slice(title.length).trim();
  return cleaned
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

function externalSource(href: string) {
  try {
    return new URL(href).hostname === "dataverse.org" ? undefined : href;
  } catch {
    return undefined;
  }
}

function TextContent({ text, title }: { text: string; title?: string }) {
  const blocks = textBlocks(text, title);
  return (
    <div className="archive-prose">
      {blocks.map((block, index) => {
        const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
        const isList = lines.length > 0 && lines.every((line) => /^[-•]/.test(line));
        if (isList) {
          return <ul key={index}>{lines.map((line) => <li key={line}>{line.replace(/^[-•]\s*/, "")}</li>)}</ul>;
        }
        return <p key={index}>{block}</p>;
      })}
    </div>
  );
}

function ResourceLinks({
  links,
}: {
  links: { text: string; href: string }[];
}) {
  const usable = links.filter((link) => link.href && link.text);
  if (!usable.length) return null;
  return (
    <aside className="archive-resources">
      <p>Links and files</p>
      {usable.map((link, index) => (
        <a key={`${link.href}-${index}`} href={link.href}>
          <span>{link.text}</span><b>↗</b>
        </a>
      ))}
    </aside>
  );
}

function DetailLayout({
  category,
  title,
  meta,
  children,
  links = [],
  beforeContent,
}: {
  category: string;
  title: string;
  meta?: string;
  children: React.ReactNode;
  links?: { text: string; href: string }[];
  beforeContent?: React.ReactNode;
}) {
  const deduped = links.filter(
    (link, index, all) => all.findIndex((candidate) => candidate.href === link.href) === index,
  );
  return (
    <ArchiveShell>
      <article className="archive-detail">
        <header className="archive-detail-head">
          <p>{category}</p>
          <h1>{title}</h1>
          {meta && <div className="archive-detail-meta">{meta}</div>}
        </header>
        {beforeContent}
        <div className="archive-detail-grid">
          <div>{children}</div>
          <ResourceLinks links={deduped} />
        </div>
      </article>
    </ArchiveShell>
  );
}

export function BlogIndexPage() {
  const items: ArchiveIndexItem[] = blogPosts.map((post) => {
    const blocks = textBlocks(post.text, post.title);
    const date = blocks[0] && /^[A-Z][a-z]+ \d{2}, \d{4}$/.test(blocks[0]) ? blocks[0] : "";
    const summary = blocks[date ? 1 : 0] || "";
    return { title: post.title, href: post.localPath, meta: date, summary };
  });
  return (
    <ArchiveShell>
      <ArchiveHero
        eyebrow="Dataverse Project"
        title="Blog"
        description="News, releases, community stories, and project updates from the Dataverse Project."
        count={blogPosts.length}
      />
      <ArchiveIndex items={items} noun="blog posts" />
    </ArchiveShell>
  );
}

export function CitationIndexPage({ kind }: { kind: "presentations" | "publications" }) {
  const records = kind === "presentations" ? presentations : publications;
  const title = kind === "presentations" ? "Presentations" : "Publications";
  const description = kind === "presentations"
    ? "Presentations by Dataverse Project team members and the global Dataverse community."
    : "Research and scholarship about Dataverse, data sharing, preservation, citation, and reproducibility.";
  const items: ArchiveIndexItem[] = records.map((record) => ({
    title: record.title,
    href: record.localPath,
    meta: record.year,
    summary: record.citation,
    sourceHref: externalSource(record.href),
  }));
  return (
    <ArchiveShell>
      <ArchiveHero eyebrow="Dataverse Project" title={title} description={description} count={records.length} />
      <ArchiveIndex items={items} noun={kind} />
    </ArchiveShell>
  );
}

export function EventIndexPage() {
  const items: ArchiveIndexItem[] = events.map((event) => ({
    title: event.title,
    href: event.localPath,
    summary: event.description,
    sourceHref: event.href,
  }));
  return (
    <ArchiveShell>
      <ArchiveHero
        eyebrow="Dataverse Project community"
        title="Community"
        description="Community calls, conversations, and annual Dataverse Community Meetings."
      />
      <CommunityConnections />
      <section className="community-meetings" aria-labelledby="community-meetings-heading">
      <h2 id="community-meetings-heading">Community Meetings</h2>
      <ArchiveIndex items={items} noun="events" />
      </section>
    </ArchiveShell>
  );
}

export function ReportIndexPage() {
  const items: ArchiveIndexItem[] = reports.map((report) => ({
    title: report.title,
    href: report.localPath,
    summary: report.description,
    sourceHref: report.href,
  }));
  return (
    <ArchiveShell>
      <ArchiveHero
        eyebrow="Dataverse Project"
        title="Reports"
        description="Reports presenting highlights of the annual progress made by the Dataverse Project team towards key ongoing and project activities."
        count={reports.length}
      />
      <ArchiveIndex items={items} noun="reports" />
    </ArchiveShell>
  );
}

export function BlogDetailPage({ item }: { item: BlogPost }) {
  const blocks = textBlocks(item.text, item.title);
  const date = blocks[0] && /^[A-Z][a-z]+ \d{2}, \d{4}$/.test(blocks[0]) ? blocks.shift() : "";
  const body = blocks.join("\n\n").replace(/\n\s*Share on:[\s\S]*$/, "").trim();
  return (
    <DetailLayout category="Blog" title={item.title} meta={date} links={item.links}>
      {item.images.length > 0 && (
        <div className="archive-image-grid">
          {item.images.map((image) => <img key={image.src} src={image.src} alt={image.alt} />)}
        </div>
      )}
      <TextContent text={body} />
    </DetailLayout>
  );
}

export function CitationDetailPage({
  item,
  kind,
}: {
  item: CitationRecord;
  kind: "Presentation" | "Publication";
}) {
  return (
    <DetailLayout category={kind} title={item.title} meta={item.year} links={item.resources}>
      <p className="citation-full">{item.citation}</p>
      {item.abstract && <section className="abstract-block"><h2>Abstract</h2><p>{item.abstract}</p></section>}
    </DetailLayout>
  );
}

export function EventDetailPage({ item }: { item: EventRecord }) {
  return (
    <DetailLayout category="Community event" title={item.title} links={item.href ? [{ text: "Visit event website", href: item.href }] : []}>
      <TextContent text={item.description} />
    </DetailLayout>
  );
}

export function ReportDetailPage({ item }: { item: ReportRecord }) {
  return (
    <DetailLayout category="Report" title={item.title} links={item.href ? [{ text: "View report PDF", href: item.href }] : []}>
      <TextContent text={item.description} />
    </DetailLayout>
  );
}

export function ProjectContentPage({ item }: { item: ProjectPage }) {
  const heading = item.h1 || item.title.replace(/ \| The Dataverse Project$/, "");
  return (
    <DetailLayout category="Dataverse Project" title={heading} links={item.links} beforeContent={item.localPath === "/institutions" ? <InstitutionBanner compact /> : item.localPath === "/journals" ? <JournalBanner compact /> : undefined}>
      {item.images.length > 0 && (
        <div className="archive-image-grid page-images">
          {item.images.map((image) => <img key={image.src} src={image.src} alt={image.alt} />)}
        </div>
      )}
      {item.localPath === "/about" ? <AboutContent text={item.text} links={item.links} /> : ["/journals", "/institutions"].includes(item.localPath) ? <AudienceContent item={item} /> : <TextContent text={item.text} title={heading} />}
    </DetailLayout>
  );
}

export const retainedProjectPageCount = projectPages.length;
