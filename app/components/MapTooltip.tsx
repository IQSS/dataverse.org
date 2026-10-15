"use client";

import { useEffect, useRef } from "react";

// One shared tooltip, moved by direct DOM writes (no React re-render), so it shows on the
// first pointer event. The native <title> tooltip waits about a second and cannot be sped up.
export default function MapTooltip() {
  const tip = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tip.current;
    const box = el?.parentElement;
    if (!el || !box) return;
    const show = (event: Event) => {
      const link = (event.target as Element).closest<SVGAElement>(".map-repository-link");
      if (!link) return;
      const dot = link.querySelector(".map-location-dot")!.getBoundingClientRect();
      const frame = box.getBoundingClientRect();
      el.textContent = link.dataset.name ?? "";
      el.style.left = `${dot.left + dot.width / 2 - frame.left}px`;
      el.style.top = `${dot.top - frame.top}px`;
      el.hidden = false;
    };
    const hide = (event: Event) => {
      if ((event.target as Element).closest(".map-repository-link")) el.hidden = true;
    };
    box.addEventListener("pointerover", show);
    box.addEventListener("focusin", show);
    box.addEventListener("pointerout", hide);
    box.addEventListener("focusout", hide);
    return () => {
      box.removeEventListener("pointerover", show);
      box.removeEventListener("focusin", show);
      box.removeEventListener("pointerout", hide);
      box.removeEventListener("focusout", hide);
    };
  }, []);

  return <div ref={tip} className="map-tip" aria-hidden="true" hidden />;
}
