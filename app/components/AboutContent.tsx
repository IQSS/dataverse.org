type Link = { text: string; href: string };

const headings = new Set(["The Project", "The Strategic Goals", "The Collaboration", "The History", "The Team", "Core Development Team", "Data Curation Team", "Dataverse Ambassador", "Past Dataverse Project Contributors", "The Name", "The Funding"]);

/** Preserve the imported wording while restoring headings and inline links. */
export default function AboutContent({ text, links }: { text: string; links: Link[] }) {
  const byText = new Map(links.map(link => [link.text, link.href]));
  const names = [...byText.keys()].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${names.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const linked = (line: string) => line.split(pattern).map((part, i) => byText.has(part) ? <a key={i} href={byText.get(part)}>{part}</a> : part);
  return <div className="archive-prose about-prose">
    {text.replace(/^About\s*/, "").split(/\n/).map(line => line.trim()).filter(Boolean).map((line, i) => {
      if (headings.has(line)) return <h2 key={i} id={line === "The Team" ? "team" : undefined}>{line}</h2>;
      return <p key={i}>{linked(line)}</p>;
    })}
  </div>;
}
