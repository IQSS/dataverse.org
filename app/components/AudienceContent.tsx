import type { ProjectPage } from "../archive-data";

const sectionHeadings = new Set([
  "Use a Dataverse repository for publishing your authors’ data and making it citable",
  "Contact the Dataverse Project Team",
  "The Harvard Dataverse Repository for your institution",
  "Installing the Dataverse Project software",
  "Have questions?",
]);

/** Restore document structure, preserving the original prose and source links. */
export default function AudienceContent({ item }: { item: ProjectPage }) {
  const normalize = (text: string) => text.replace(/\u00a0/g, " ").trim();
  const byText = new Map(item.links.map(link => [normalize(link.text), link.href]));
  const names = [...byText.keys()].filter(Boolean).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${names.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const linked = (line: string) => line.split(pattern).map((part, i) => byText.has(part) ? <a key={i} href={byText.get(part)}>{part}</a> : part);
  const body = normalize(item.text).replace(new RegExp(`^${item.h1}\\s*`), "")
    .replace(/^\s*(Embed|Open all sections|Close all sections|expand_more)\s*$/gm, "")
    .replace(/How to set up your Journal's Dataverse Collection\s*/, "");
  const chunks = body.split(/(?=^[1-4]\. )/m);
  const paragraphs = (text: string) => text.split(/\n\s*\n/).map(normalize).filter(Boolean).map((block, i) => {
    const lines = block.split("\n").map(normalize).filter(Boolean);
    if (sectionHeadings.has(block)) return <h2 key={i}>{block}</h2>;
    if (lines.length > 1) return <ul key={i}>{lines.map((line, j) => <li key={j}>{linked(line)}</li>)}</ul>;
    return <p key={i}>{linked(block)}</p>;
  });
  return <div className="archive-prose audience-prose">
    <div className="audience-intro">{paragraphs(chunks[0])}</div>
    {chunks.length > 1 && <div className="journal-workflows">{chunks.slice(1).map((chunk, i) => {
      const newline = chunk.indexOf("\n");
      const heading = chunk.slice(0, newline).replace(/^\d\.\s*/, "");
      const content = chunk.slice(newline).trim();
      const contact = content.indexOf("Contact the Dataverse Project Team");
      return <section className="journal-workflow" key={heading}>
        <h2>{heading}</h2>{paragraphs(contact < 0 ? content : content.slice(0, contact))}
        {i === 0 && <a className="audience-guide-link" href="https://guides.dataverse.org/en/latest/user/dataverse-management.html">How to set up your Journal’s Dataverse Collection</a>}
      </section>;
    })}</div>}
    {chunks.length > 1 && <aside className="audience-contact"><h2>Contact the Dataverse Project Team</h2>{paragraphs(body.slice(body.lastIndexOf("Contact the Dataverse Project Team") + "Contact the Dataverse Project Team".length))}</aside>}
  </div>;
}
