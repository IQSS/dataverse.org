import { blogPosts, presentations, publications, events, reports, projectPages } from "./archive-data";
import { useCases } from "../data/use-cases";
import installations from "../data/installations.json";

export type SearchEntry = { title: string; path: string; kind: string; meta?: string; snippet: string; text: string };

const clip = (value: string, n: number) => value.replace(/\s+/g, " ").trim().slice(0, n);

const sitePages: [string, string, string][] = [
  ["Explore the Dataverse", "/explore", "Harvard Dataverse, the installation map, the institution spotlight and the full list of 150+ installations."],
  ["Software", "/software", "Architecture, APIs, metadata standards, storage, authentication, deployment, and how to run or extend the Dataverse software."],
  ["Research projects", "/research-projects", "Trusted Data Collaboration, the Generalist Repository Ecosystem Initiative (GREI), and AI metadata enrichment."],
  ["Contact", "/contact", "How to reach the Dataverse Project: support, mailing list, community chat, security reports."],
  ["Data Branded as Yours", "/branding", "Embed a collection on your own website with your logo, colours and address; live example of a researcher's dataverse."],
  ["Numbers", "/numbers", "How every headline number on the site is computed: installations, scholarly citations, datasets, usage, Harvard figures."],
  ["Roadmap", "/roadmap", "The big picture for FY27 and the development timeline."],
  ["Releases", "/releases", "Dataverse software releases."],
  ["Community calls", "/community-calls", "Monthly community calls."],
  ["Use cases", "/use-cases", "Data-sharing stories and case studies from the Harvard Dataverse Repository."],
];

const installationNames = (installations as { name: string; country?: string }[]).map((i) => `${i.name} ${i.country ?? ""}`).join(" ");

export const searchEntries: SearchEntry[] = [
  ...sitePages.map(([title, path, snippet]) => ({ title, path, kind: "Site", snippet, text: path === "/explore" ? `${snippet} ${installationNames}` : snippet })),
  ...useCases.map((u) => ({ title: u.title, path: `/use-cases/${u.slug}`, kind: "Use case", meta: u.audience, snippet: clip(u.summary, 220), text: clip(u.body, 1500) })),
  ...projectPages.filter((p) => p.localPath && p.localPath !== "/").map((p) => ({ title: p.h1 || p.title.replace(/ \| The Dataverse Project$/, ""), path: p.localPath, kind: "Page", snippet: clip(p.text, 220), text: clip(p.text, 1500) })),
  ...blogPosts.filter((b) => b.localPath).map((b) => ({ title: b.title, path: b.localPath, kind: "Blog", snippet: clip(b.text, 220), text: clip(b.text, 1500) })),
  ...presentations.map((c) => ({ title: c.title, path: c.localPath, kind: "Presentation", meta: c.year, snippet: clip(c.abstract || c.citation, 220), text: clip(`${c.citation} ${c.abstract}`, 1500) })),
  ...publications.map((c) => ({ title: c.title, path: c.localPath, kind: "Publication", meta: c.year, snippet: clip(c.abstract || c.citation, 220), text: clip(`${c.citation} ${c.abstract}`, 1500) })),
  ...events.map((e) => ({ title: e.title, path: e.localPath, kind: "Community meeting", snippet: clip(e.description, 220), text: clip(e.description, 1500) })),
  ...reports.map((r) => ({ title: r.title, path: r.localPath, kind: "Report", snippet: clip(r.description, 220), text: clip(r.description, 1500) })),
].filter((e, i, all) => e.path && all.findIndex((o) => o.path === e.path) === i);
