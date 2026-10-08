"use client";

import { useMemo, useState } from "react";

export type ArchiveIndexItem = {
  title: string;
  href: string;
  meta?: string;
  summary?: string;
  sourceHref?: string;
};

export default function ArchiveIndex({
  items,
  noun,
}: {
  items: ArchiveIndexItem[];
  noun: string;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((item) =>
      [item.title, item.meta, item.summary].some((value) =>
        value?.toLowerCase().includes(needle),
      ),
    );
  }, [items, query]);

  return (
    <>
      <div className="archive-search">
        <label htmlFor="archive-query">Search within {noun}</label>
        <div>
          <input
            id="archive-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${items.length} ${noun}`}
          />
          <span role="status" aria-live="polite">{filtered.length} results</span>
        </div>
      </div>
      <div className="archive-list">
        {filtered.map((item, index) => (
          <article className="archive-card" key={`${item.href}-${index}`}>
            <span className="archive-number">{String(index + 1).padStart(3, "0")}</span>
            <div>
              {item.meta && <p className="archive-meta">{item.meta}</p>}
              <h2><a href={item.href}>{item.title}</a></h2>
              {item.summary && <p className="archive-summary">{item.summary}</p>}
              {item.sourceHref && item.sourceHref !== item.href && (
                <a className="archive-source-link" href={item.sourceHref}>Source ↗</a>
              )}
            </div>
            <a className="archive-arrow" href={item.href} aria-label={`Open ${item.title}`}>→</a>
          </article>
        ))}
      </div>
    </>
  );
}
