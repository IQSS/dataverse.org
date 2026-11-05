"use client";

import { useEffect, useState } from "react";
import { latestTopics, ZULIP } from "../zulip-topics.mjs";

type Topic = { channel: string; topic: string; latest: string; messages: number; url: string };

const day = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

// Recently active web-public Zulip topics, fetched in the visitor's browser once the page loads.
// The section stays hidden until the list arrives, and stays hidden if JavaScript is off or the
// archive cannot be reached.
export default function ZulipLatest() {
  const [topics, setTopics] = useState<Topic[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    latestTopics({ signal: controller.signal }).then(setTopics).catch(() => {});
    return () => controller.abort();
  }, []);
  return <section className="zulip-latest" id="zulip-latest" aria-labelledby="zulip-latest-heading" hidden={!topics.length}>
    <h2 id="zulip-latest-heading">Latest from Zulip</h2>
    <ol className="zulip-topic-list">
      {topics.map(topic => <li key={topic.url}>
        <a href={topic.url}>{topic.topic}</a>
        <span className="zulip-topic-meta">#{topic.channel} · {topic.messages} {topic.messages === 1 ? "message" : "messages"} · last active <time dateTime={topic.latest}>{day(topic.latest)}</time></span>
      </li>)}
    </ol>
    <a className="zulip-latest-more" href={ZULIP}>Browse the full Zulip archive <span aria-hidden="true">↗</span></a>
  </section>;
}
