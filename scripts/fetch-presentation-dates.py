"""Backfill presentation dates and venues from Internet Archive copies of dataverse.org.

dataverse.org refuses automated requests, so this reads the Wayback Machine's archived
detail pages instead: one request at a time, with a pause, identified by User-Agent.
Writes data/presentation-dates.json keyed by the presentation's dataverse.org path.
Run: python3 scripts/fetch-presentation-dates.py
"""
import gzip, html, json, re, time, urllib.parse, urllib.request
from datetime import datetime
from pathlib import Path

UA = {"User-Agent": "dataverse-site-migration/1.0 (daniel.c.ebanks@gmail.com)"}
OUT = Path("data/presentation-dates.json")


def get(url):
    for attempt in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
                body = r.read()
                # Some archived copies were stored still gzip-compressed.
                return (gzip.decompress(body) if body[:2] == b"\x1f\x8b" else body).decode("utf-8", "replace")
        except Exception:
            time.sleep(5 * (attempt + 1))
    return ""


def field(text, label):
    m = re.search(rf"{label}:\s*(?:&nbsp;)?\s*</[^>]+>\s*(?:<[^>]+>\s*)*([^<]+)", text)
    return html.unescape(m.group(1)).strip() if m else None


def key(path):
    return urllib.parse.unquote(path).rstrip("/")


# One index query per URL prefix lists every archived copy; a per-page lookup took ~20 s each.
snapshots = {}
for prefix in ("dataverse.org/presentations/", "dataverse.org/publication/"):
    rows = json.loads(get(f"https://web.archive.org/cdx/search/cdx?url={prefix}&matchType=prefix&output=json&fl=original,timestamp&filter=statuscode:200&collapse=urlkey") or "[]")[1:]
    for original, stamp in rows:
        snapshots[key(urllib.parse.urlparse(original).path)] = stamp

archive = json.loads(Path("data/archive.json").read_text())
paths = sorted({urllib.parse.urlparse(p["href"]).path.rstrip("/") for p in archive["presentations"]})
done = json.loads(OUT.read_text())["dates"] if OUT.exists() else {}

for path in paths:
    if done.get(path, {}).get("date"):
        continue
    record = {"date": None, "location": None, "snapshot": None}
    stamp = snapshots.get(key(path))
    if stamp:
        page = get(f"https://web.archive.org/web/{stamp}id_/http://dataverse.org{path}")
        raw = field(page, "Presentation Date")
        if raw:
            try:
                record["date"] = datetime.strptime(re.sub(r"^\w+day,\s*", "", raw), "%B %d, %Y").date().isoformat()
            except ValueError:
                record["date_text"] = raw
        record["location"] = field(page, "Location")
        record["snapshot"] = stamp
    done[path] = record
    OUT.write_text(json.dumps({"source": "Internet Archive copies of dataverse.org presentation pages", "dates": done}, indent=1, sort_keys=True) + "\n")
    print(path, record["date"], flush=True)
    time.sleep(1.5)
