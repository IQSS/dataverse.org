import type { Metadata } from "next";
import { ArchiveShell } from "../components/SiteChrome";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact | The Dataverse Project",
  description: "How to reach the Dataverse Project: support email, security reports, community chat and mailing list, GitHub, and the Harvard Dataverse support desk.",
};

const channels = [
  { title: "General questions and installation help", detail: "Email the project team. Replies normally within one business day.", action: "support@dataverse.org", href: "mailto:support@dataverse.org" },
  { title: "Harvard Dataverse depositors and users", detail: "Questions about an account, a dataset or a collection on Harvard Dataverse go to its own support desk.", action: "support@dataverse.harvard.edu", href: "mailto:support@dataverse.harvard.edu" },
  { title: "Security issues", detail: "Report vulnerabilities privately; do not open a public issue.", action: "security@dataverse.org", href: "mailto:security@dataverse.org" },
  { title: "Community chat", detail: "Talk with developers and other installations in real time on Zulip.", action: "dataverse.zulipchat.com ↗", href: "https://dataverse.zulipchat.com/" },
  { title: "Mailing list", detail: "The dataverse-community Google Group for announcements, questions and discussion; language-specific lists also exist.", action: "dataverse-community ↗", href: "https://groups.google.com/g/dataverse-community" },
  { title: "Bugs, feature requests and code", detail: "GitHub Issues for bugs and requests; pull requests for code and documentation.", action: "github.com/IQSS/dataverse ↗", href: "https://github.com/IQSS/dataverse/issues" },
  { title: "Community calls", detail: "Open calls on the first Tuesday of each month; notes and recordings are kept on this site.", action: "Calls and recordings", href: "/community-calls" },
  { title: "Press and partnerships", detail: "The project is led by Harvard’s Institute for Quantitative Social Science (IQSS), 1737 Cambridge Street, Cambridge, MA 02138.", action: "About the project", href: "/about" },
];

export default function ContactPage() {
  return <ArchiveShell>
    <article className="archive-detail contact-page">
      <header className="archive-detail-head"><p>Dataverse Project</p><h1>Contact</h1></header>
      <div className="contact-body">
        <p className="contact-lede">Pick the channel that fits. Email reaches the team directly; chat and the mailing list reach the whole community, which is often faster for technical questions.</p>
        <ul className="contact-grid">{channels.map((channel) => <li key={channel.href}><a href={channel.href}><strong>{channel.title}</strong><span>{channel.detail}</span><b>{channel.action}</b></a></li>)}</ul>
      </div>
    </article>
  </ArchiveShell>;
}
