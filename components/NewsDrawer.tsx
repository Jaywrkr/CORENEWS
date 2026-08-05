"use client";

import { useEffect } from "react";
import type { NewsItem } from "@/scripts/fetch-news";
import { getCategory } from "@/data/categories";
import { CategoryIcon } from "./icons";
import { CategoryThumb } from "./CategoryThumb";
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
        className="absolute inset-0 bg-navy-950/50"
      />

      <aside
        role="dialog"
        aria-modal="true"
        className="relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-ink-200 bg-white animate-[slide-in_0.2s_ease-out]"
      >
        <div className="relative">
          <CategoryThumb
            variant={category?.thumb ?? "navy"}
            icon={category?.icon ?? "shield"}
            className="aspect-[16/9] w-full"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar panel"
            className="absolute right-05 top-05 flex h-8 w-8 items-center justify-center bg-white/90 text-ink-700 transition-colors hover:bg-white"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 px-06 py-05">
          <div className="flex items-center gap-02 text-ink-500">
            <CategoryIcon name={category?.icon ?? "shield"} className="h-4 w-4 shrink-0" />
            <span className="kicker">{category?.label ?? "Core"}</span>
            <SeverityBadge severity={item.severity} />
          </div>

          <time className="mt-03 block font-mono text-xs text-ink-500">{formatDate(item.publishedAt)}</time>

          <h2 className="mt-02 font-serif text-2xl font-semibold leading-tight text-navy-950">
            {item.title}
          </h2>

          <p className="mt-02 text-sm text-ink-500">{item.source}</p>

          <p className="mt-05 text-base leading-relaxed text-ink-800">{item.summary}</p>

          <div className="mt-05 border-l-2 border-navy-950 pl-05">
            <p className="kicker mb-02 text-navy-700">Por qué le importa a Core</p>
            <p className="text-sm leading-relaxed text-ink-800">{item.relevance}</p>
          </div>

          {item.tags.length > 0 && (
            <div className="mt-05 flex flex-wrap gap-02">
              {item.tags.map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-ink-200 px-06 py-05">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full"
          >
            Ver noticia original →
          </a>
        </div>
      </aside>
    </div>
  );
}
