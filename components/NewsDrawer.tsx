"use client";

import { useEffect } from "react";
import type { NewsItem } from "@/scripts/fetch-news";
import { getCategory } from "@/data/categories";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-EC", {
    weekday: "long",
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
        className="absolute inset-0 bg-navy-950/50 backdrop-blur-[1px]"
      />

      <aside
        role="dialog"
        aria-modal="true"
        className="relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-ink-200 bg-white shadow-2xl animate-[slide-in_0.2s_ease-out]"
      >
        <div className="flex items-center justify-between border-b border-ink-200 px-06 py-05">
          <span className="kicker text-navy-700">{category?.label ?? "Core"}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar panel"
            className="flex h-8 w-8 items-center justify-center border border-ink-200 text-ink-600 transition-colors hover:border-navy-950 hover:text-navy-950"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 px-06 py-06">
          <time className="font-mono text-xs text-ink-500">{formatDate(item.publishedAt)}</time>

          <h2 className="mt-03 font-serif text-2xl font-semibold leading-tight text-navy-950">
            {item.title}
          </h2>

          <p className="mt-02 text-sm text-ink-500">
            Fuente: <span className="font-medium text-ink-700">{item.source}</span>
          </p>

          <div className="mt-05 flex flex-wrap gap-02">
            {item.tags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-06 border-t border-ink-100 pt-06">
            <p className="kicker mb-02 text-ink-400">Resumen</p>
            <p className="text-base leading-relaxed text-ink-800">{item.summary}</p>
          </div>

          <div className="mt-06 hairline bg-ink-50 p-05">
            <p className="text-sm text-ink-600">
              Este es un resumen curado automáticamente. Para leer la nota completa,
              con todo el contexto y las fuentes citadas por el medio original,
              visita el enlace a continuación.
            </p>
          </div>
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
