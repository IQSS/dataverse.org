// Latest web-public Zulip topics for the Community page, fetched in the visitor's browser from
// the GDCC Zulip archive (https://github.com/gdcc/zulip-archive, rebuilt hourly by
// zulip/zulip-archive) and linked into Zulip itself. The archive is served with
// Access-Control-Allow-Origin: * and needs no API key; Zulip's own API needs a login, and its
// anonymous endpoint has no CORS.

export const ARCHIVE = "https://gdcc.github.io/zulip-archive";
export const ZULIP = "https://dataverse.zulipchat.com";

// Zulip's narrow-URL encoding, which zulip-archive's lib/url.py copies for its file names:
// Python's quote(s, safe="") with "." in place of "%"; channel names also turn spaces into "-".
export function sanitize(s) {
  return encodeURIComponent(s)
    .replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)
    .replace(/\./g, "%2E")
    .replace(/%/g, ".");
}
export const sanitizeStream = (name, id) => `${id}-${sanitize(name.replace(/ /g, "-"))}`;

/**
 * Returns the `limit` most recently active topics as { channel, topic, latest, messages, url }.
 * Each link is anchored "with" the topic's newest message, so it keeps working if the topic is
 * renamed or moved. When the topic is its channel's newest, that id is the channel's latest_id
 * in the index; otherwise it comes from the archive's per-topic JSON, and if that download
 * fails the link omits /with/.
 */
export async function latestTopics({ fetch = globalThis.fetch, limit = 6, signal } = {}) {
  const response = await fetch(`${ARCHIVE}/zulip_json/stream_index.json`, { signal });
  if (!response.ok) throw new Error(`stream_index.json: HTTP ${response.status}`);
  const index = await response.json();
  const recent = Object.entries(index.streams)
    .flatMap(([channel, stream]) => {
      const newestDate = Math.max(...Object.values(stream.topic_data).map(data => data.latest_date));
      return Object.entries(stream.topic_data).map(([topic, data]) => ({
        channel,
        topic,
        latest: new Date(data.latest_date * 1000).toISOString(),
        messages: data.size,
        streamPart: sanitizeStream(channel, stream.id),
        topicPart: sanitize(topic),
        newestId: data.latest_date === newestDate ? stream.latest_id : undefined,
      }));
    })
    .sort((a, b) => b.latest.localeCompare(a.latest))
    .slice(0, limit);

  return Promise.all(recent.map(async ({ streamPart, topicPart, newestId, ...topic }) => {
    const base = `${ZULIP}/#narrow/channel/${streamPart}/topic/${topicPart}`;
    if (newestId) return { ...topic, url: `${base}/with/${newestId}` };
    try {
      const messages = await fetch(`${ARCHIVE}/zulip_json/${streamPart}/${topicPart}.json`, { signal });
      if (!messages.ok) throw new Error(`HTTP ${messages.status}`);
      return { ...topic, url: `${base}/with/${(await messages.json()).at(-1).id}` };
    } catch (error) {
      if (signal?.aborted) throw error;
      return { ...topic, url: base };
    }
  }));
}
