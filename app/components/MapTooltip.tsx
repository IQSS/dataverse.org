"use client";

import { useEffect, useRef } from "react";

// One shared hover card, filled and moved by direct DOM writes (no React re-render), so it
// appears on the first pointer event. Mouse: hover shows the card, clicking the dot opens the
// repository. Touch: the first tap shows the card, a second tap (or the card's link) opens it.
export default function MapTooltip() {
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = card.current;
    const box = el?.parentElement;
    if (!el || !box) return;
    const [title, meta, stat, desc, link] = ["strong", ".map-card-meta", ".map-card-stats", ".map-card-desc", "a"].map((q) => el.querySelector(q)!) as [HTMLElement, HTMLElement, HTMLElement, HTMLElement, HTMLAnchorElement];
    let current: SVGAElement | null = null;
    let hideTimer = 0;
    let touch = false;

    const dotOf = (event: Event) => (event.target as Element).closest<SVGAElement>(".map-repository-link");
    const show = (dot: SVGAElement) => {
      clearTimeout(hideTimer);
      current = dot;
      title.textContent = dot.dataset.name ?? "";
      meta.textContent = dot.dataset.meta ?? "";
      stat.textContent = dot.dataset.stats ?? "";
      stat.hidden = !dot.dataset.stats;
      desc.textContent = dot.dataset.desc ?? "";
      desc.hidden = !dot.dataset.desc;
      link.href = dot.getAttribute("href") ?? link.href;
      const r = dot.querySelector(".map-location-dot")!.getBoundingClientRect();
      const frame = box.getBoundingClientRect();
      el.hidden = false;
      const half = el.offsetWidth / 2;
      const x = Math.min(Math.max(r.left + r.width / 2 - frame.left, half + 8), frame.width - half - 8);
      const below = r.top - frame.top < el.offsetHeight + 16;
      el.style.left = `${x}px`;
      el.style.top = `${below ? r.bottom - frame.top + 10 : r.top - frame.top - 10}px`;
      el.classList.toggle("below", below);
    };
    const hide = () => { el.hidden = true; current = null; };
    const hideSoon = () => { clearTimeout(hideTimer); hideTimer = window.setTimeout(hide, 180); };

    const onOver = (event: PointerEvent) => { if (event.pointerType !== "touch") { const dot = dotOf(event); if (dot) show(dot); } };
    const onOut = (event: PointerEvent) => { if (dotOf(event)) hideSoon(); };
    const onDown = (event: PointerEvent) => { touch = event.pointerType === "touch"; };
    const onClick = (event: MouseEvent) => {
      const dot = dotOf(event);
      if (dot && touch && current !== dot) { event.preventDefault(); show(dot); }
    };
    const onFocus = (event: FocusEvent) => { const dot = dotOf(event); if (dot) show(dot); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") hide(); };

    box.addEventListener("pointerover", onOver);
    box.addEventListener("pointerout", onOut);
    box.addEventListener("pointerdown", onDown);
    box.addEventListener("click", onClick);
    box.addEventListener("focusin", onFocus);
    box.addEventListener("focusout", hideSoon);
    el.addEventListener("pointerenter", () => clearTimeout(hideTimer));
    el.addEventListener("pointerleave", hideSoon);
    document.addEventListener("keydown", onKey);
    return () => {
      box.removeEventListener("pointerover", onOver);
      box.removeEventListener("pointerout", onOut);
      box.removeEventListener("pointerdown", onDown);
      box.removeEventListener("click", onClick);
      box.removeEventListener("focusin", onFocus);
      box.removeEventListener("focusout", hideSoon);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // aria-hidden: each dot's accessible name already carries the name, country and year, and
  // Enter on a dot opens the repository, so the card is a visual aid only.
  return (
    <div ref={card} className="map-card" aria-hidden="true" hidden>
      <strong />
      <span className="map-card-meta" />
      <span className="map-card-stats" />
      <span className="map-card-desc" />
      <a href="/explore#explore-list-heading" target="_blank" rel="noopener noreferrer" tabIndex={-1}>Visit repository ↗</a>
    </div>
  );
}
