"use client";

import { useEffect, useState } from "react";

/** Local-only QA aid. Never rendered by the production layout. */
export default function AccessibilityAudit() {
  const [report, setReport] = useState<string | null>(null);
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("audit")) return;
    let cancelled = false;
    import("axe-core").then(async ({ default: axe }) => {
      const results = await axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } });
      if (!cancelled) setReport(JSON.stringify({
        violations: results.violations.map(({ id, description, nodes }) => ({ id, description, nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })) })),
        incomplete: results.incomplete.map(({ id, nodes }) => ({ id, count: nodes.length, examples: nodes.slice(0, 3).map(({ target, failureSummary }) => ({ target, failureSummary })) })),
        passes: results.passes.length,
      }));
    }).catch(error => { if (!cancelled) setReport(JSON.stringify({ error: String(error) })); });
    return () => { cancelled = true; };
  }, []);
  return report ? <pre id="accessibility-audit-results" hidden>{report}</pre> : null;
}
