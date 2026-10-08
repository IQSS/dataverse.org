import type { ReactNode } from "react";

type Link = { text: string; href: string };

const headings = new Set(["The Project", "The Strategic Goals", "The Collaboration", "The History", "The Team", "Core Development Team", "Data Curation Team", "Dataverse Ambassador", "Past Dataverse Project Contributors", "The Name", "The Funding"]);
const peopleHeadings = new Set(["The Team", "Core Development Team", "Data Curation Team", "Dataverse Ambassador", "Past Dataverse Project Contributors"]);
const shownHeading: Record<string, string> = { "The Team": "Project Leadership" };

/** Preserve the imported wording while restoring headings and inline links; names under the people headings render as single-spaced lists. */
export default function AboutContent({ text, links }: { text: string; links: Link[] }) {
  const byText = new Map(links.map(link => [link.text, link.href]));
  const names = [...byText.keys()].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${names.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const linked = (line: string) => line.split(pattern).map((part, i) => byText.has(part) ? <a key={i} href={byText.get(part)}>{part}</a> : part);
  const blocks: ReactNode[] = [];
  let section = "";
  let people: string[] = [];
  const flush = () => {
    if (people.length) blocks.push(<ul key={blocks.length} className="name-list">{people.map((line, i) => <li key={i}>{linked(line)}</li>)}</ul>);
    people = [];
  };
  for (const line of text.replace(/^About\s*/, "").split(/\n/).map(line => line.trim()).filter(Boolean)) {
    if (headings.has(line)) {
      flush();
      section = line;
      blocks.push(<h2 key={blocks.length} id={line === "The Team" ? "team" : undefined}>{shownHeading[line] ?? line}</h2>);
    } else if (peopleHeadings.has(section) && !/[.!?]$/.test(line)) {
      people.push(line);
    } else {
      flush();
      section = "";
      blocks.push(<p key={blocks.length}>{linked(line)}</p>);
    }
  }
  flush();
  return <div className="archive-prose about-prose">{blocks}</div>;
}
