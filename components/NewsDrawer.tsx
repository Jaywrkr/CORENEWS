"use client";

import { useEffect } from "react";
import type { NewsItem } from "@/scripts/fetch-news";
import { getCategory } from "@/data/categories";
import { SeverityBadge } from "./SeverityBadge";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function NewsDrawer({
  item,
  onClose,
}: {
  item: NewsItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;

  const category = getCategory(item.category);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-black/20"
      />

      <aside
        role="dialog"
        aria-modal="true"
        className="relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-ink-100 bg-white animate-[slide-in_0.2s_ease-out]"
      >
        <div className="flex items-start justify-between px-06 pt-06">
          <div className="flex items-center gap-03 text-xs">
            <span className="kicker text-ink-500">{category?.label ?? "Core"}</span>
            <SeverityBadge severity={item.severity} />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar panel"
            className="text-ink-400 transition-colors hover:text-navy-950"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 px-06 py-04">
          <time className="font-mono text-xs text-ink-400">{formatDate(item.publishedAt)}</time>

          <h2 className="mt-02 font-serif text-2xl font-semibold leading-tight text-navy-950">
            {item.title}
          </h2>

          <p className="mt-02 text-sm text-ink-500">{item.source}</p>

          <p className="mt-05 text-base leading-relaxed text-ink-800">{item.summary}</p>

          <div className="mt-05 border-l-2 border-ink-200 pl-04">
            <p className="kicker mb-01 text-ink-400">Por qué le importa a Core</p>
            <p className="text-sm leading-relaxed text-ink-700">{item.relevance}</p>
          </div>

          {item.tags.length > 0 && (
            <p className="mt-05 text-xs text-ink-400">{item.tags.join(" · ")}</p>
          )}
        </div>

        <div className="px-06 py-06">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-navy-950 hover:underline"
          >
            Ver noticia original →
          </a>
        </div>
      </aside>
    </div>
  );
}
