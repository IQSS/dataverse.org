import archiveJson from "../data/archive.json";
import { cleanImportedText, cleanImportedLinks } from "./archive-cleanup";

export type LinkItem = { text: string; href: string };
export type ImageItem = { src: string; alt: string };
export type BlogPost = {
  title: string;
  href: string;
  text: string;
  links: LinkItem[];
  images: ImageItem[];
  localPath: string;
};
export type CitationRecord = {
  title: string;
  href: string;
  citation: string;
  year: string;
  abstract: string;
  resources: LinkItem[];
  sourcePage: number;
  sourceIndex: number;
  localPath: string;
};
export type EventRecord = {
  title: string;
  description: string;
  href: string;
  localPath: string;
};
export type ReportRecord = EventRecord;
export type ProjectPage = {
  url: string;
  title: string;
  h1: string;
  text: string;
  links: LinkItem[];
  images: ImageItem[];
  localPath: string;
};

type RawArchive = {
  source: string;
  capturedAt: string;
  counts: Record<string, number>;
  blogPosts: Omit<BlogPost, "localPath">[];
  presentations: Omit<CitationRecord, "localPath">[];
  publications: Omit<CitationRecord, "localPath">[];
  events: Omit<EventRecord, "localPath">[];
  reports: Omit<ReportRecord, "localPath">[];
  pages: Omit<ProjectPage, "localPath">[];
};

const raw = archiveJson as RawArchive;

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 110);
}

export function normalizePath(path: string) {
  let decoded = path;
  try {
    decoded = decodeURIComponent(path);
  } catch {
    decoded = path;
  }
  decoded = decoded.replace(/\u00a0/g, " ").replace(/\/$/, "") || "/";
  return decoded;
}

function pathFromDataverseUrl(href: string) {
  try {
    const url = new URL(href);
    if (url.hostname === "dataverse.org") return normalizePath(url.pathname);
  } catch {
    return "";
  }
  return "";
}

function citationPath(
  item: Omit<CitationRecord, "localPath">,
  collection: "presentations" | "publications",
  index: number,
) {
  const original = pathFromDataverseUrl(item.href);
  if (/^\/(publication|presentations|publications)\//.test(original)) return original;
  return `/${collection}/${slugify(item.title) || `record-${index + 1}`}`;
}

export const blogPosts: BlogPost[] = raw.blogPosts.map((item) => ({
  ...item,
  localPath: pathFromDataverseUrl(item.href),
}));

export const presentations: CitationRecord[] = raw.presentations.map((item, index) => ({
  ...item,
  localPath: citationPath(item, "presentations", index),
}));

export const publications: CitationRecord[] = raw.publications.map((item, index) => ({
  ...item,
  localPath: citationPath(item, "publications", index),
}));

export const events: EventRecord[] = raw.events.map((item) => ({
  ...item,
  localPath: `/events/${slugify(item.title)}`,
}));

export const reports: ReportRecord[] = raw.reports.map((item) => ({
  ...item,
  localPath: `/reports/${slugify(item.title)}`,
}));

export const projectPages: ProjectPage[] = raw.pages.map((item) => ({
  ...item,
  text: cleanImportedText(item.text),
  links: cleanImportedLinks(item),
  localPath: pathFromDataverseUrl(item.url),
}));

export const archiveMeta = {
  source: raw.source,
  capturedAt: raw.capturedAt,
  counts: raw.counts,
};

export function findRoute(path: string) {
  const normalized = normalizePath(path);
  const blog = blogPosts.find((item) => normalizePath(item.localPath) === normalized);
  if (blog) return { kind: "blog" as const, item: blog };
  const presentation = presentations.find(
    (item) => normalizePath(item.localPath) === normalized,
  );
  if (presentation) return { kind: "presentation" as const, item: presentation };
  const publication = publications.find(
    (item) => normalizePath(item.localPath) === normalized,
  );
  if (publication) return { kind: "publication" as const, item: publication };
  const event = events.find((item) => normalizePath(item.localPath) === normalized);
  if (event) return { kind: "event" as const, item: event };
  const report = reports.find((item) => normalizePath(item.localPath) === normalized);
  if (report) return { kind: "report" as const, item: report };
  const page = projectPages.find((item) => normalizePath(item.localPath) === normalized);
  if (page) return { kind: "page" as const, item: page };
  return null;
}

export function allArchivePaths() {
  return [
    "/blog",
    "/presentations",
    "/publications",
    "/events",
    "/reports",
    ...blogPosts.map((item) => item.localPath),
    ...presentations.map((item) => item.localPath),
    ...publications.map((item) => item.localPath),
    ...events.map((item) => item.localPath),
    ...reports.map((item) => item.localPath),
    ...projectPages.map((item) => item.localPath).filter((path) => path !== "/"),
  ].filter((path, index, all) => path && all.indexOf(path) === index);
}
