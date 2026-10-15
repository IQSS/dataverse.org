"use client";

import { useMemo, useState } from "react";
import type { SearchEntry } from "../search-data";

type Indexed = SearchEntry & { haystack: string; titleLower: string };

const tokens = (value: string) => value.toLowerCase().match(/[a-z0-9]+/g) ?? [];

function score(entry: Indexed, terms: string[]) {
  let total = 0;
  for (const term of terms) {
    const inTitle = entry.titleLower.includes(term);
    const inText = entry.haystack.includes(term);
    if (!inTitle && !inText) return 0;
    total += inTitle ? 3 : 1;
  }
  return total;
}

export default function SearchBox({ entries }: { entries: SearchEntry[] }) {
  const [query, setQuery] = useState("");
  const index = useMemo<Indexed[]>(() => entries.map((e) => ({ ...e, titleLower: e.title.toLowerCase(), haystack: `${e.title} ${e.snippet} ${e.text}`.toLowerCase() })), [entries]);

  const terms = tokens(query);
  const key = terms.join(" ");
  const results = useMemo(() => {
    const t = tokens(key);
    if (!t.length) return [];
    return index.map((e) => ({ e, s: score(e, t) })).filter((r) => r.s > 0).sort((a, b) => b.s - a.s || a.e.title.localeCompare(b.e.title)).slice(0, 50).map((r) => r.e);
  }, [index, key]);

  return (
    <div className="site-search">
      <form role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="site-search-input">Search the site</label>
        <input id="site-search-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “citation”, “Borealis”, or “FAIR”" autoComplete="off" />
      </form>
      <p className="site-search-status" aria-live="polite">{terms.length ? `${results.length} result${results.length === 1 ? "" : "s"} for “${query.trim()}”` : `${index.length} pages, blog posts, presentations, publications and use cases, searched as you type.`}</p>
      <ol className="site-search-results">
        {results.map((r) => <li key={r.path}><a href={r.path}><span className="site-search-kind">{r.kind}{r.meta ? ` · ${r.meta}` : ""}</span><strong>{r.title}</strong><span className="site-search-snippet">{r.snippet}</span></a></li>)}
      </ol>
    </div>
  );
}
