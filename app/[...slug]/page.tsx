import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  allArchivePaths,
  findRoute,
  normalizePath,
} from "../archive-data";
import {
  BlogDetailPage,
  BlogIndexPage,
  CitationDetailPage,
  CitationIndexPage,
  EventDetailPage,
  EventIndexPage,
  ProjectContentPage,
  ReportDetailPage,
  ReportIndexPage,
} from "../components/ArchiveViews";

type RouteProps = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return allArchivePaths().map((path) => ({
    slug: normalizePath(path).split("/").filter(Boolean),
  }));
}

function pathFromSlug(slug: string[]) {
  return normalizePath(`/${slug.join("/")}`);
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const path = pathFromSlug(slug);
  const indexTitles: Record<string, string> = {
    "/blog": "Blog",
    "/presentations": "Presentations",
    "/publications": "Publications",
    "/events": "Community",
    "/reports": "Reports",
    "/journals": "Journals and Proceedings",
  };
  const route = findRoute(path);
  const title = indexTitles[path] || route?.item.title || "Dataverse Project";
  return {
    title: `${title} — Dataverse Project`,
    description: "Dataverse Project website.",
  };
}

export default async function ArchiveRoute({ params }: RouteProps) {
  const { slug } = await params;
  const path = pathFromSlug(slug);
  if (path === "/blog") return <BlogIndexPage />;
  if (path === "/presentations") return <CitationIndexPage kind="presentations" />;
  if (path === "/publications") return <CitationIndexPage kind="publications" />;
  if (path === "/events") return <EventIndexPage />;
  if (path === "/reports") return <ReportIndexPage />;

  const route = findRoute(path);
  if (!route) notFound();
  if (route.kind === "blog") return <BlogDetailPage item={route.item} />;
  if (route.kind === "presentation") return <CitationDetailPage item={route.item} kind="Presentation" />;
  if (route.kind === "publication") return <CitationDetailPage item={route.item} kind="Publication" />;
  if (route.kind === "event") return <EventDetailPage item={route.item} />;
  if (route.kind === "report") return <ReportDetailPage item={route.item} />;
  return <ProjectContentPage item={route.item} />;
}
