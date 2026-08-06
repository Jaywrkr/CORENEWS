"use client";

import { useEffect } from "react";
import type { NewsItem } from "@/scripts/fetch-news";
import { getCategory } from "@/data/categories";
import { getCoreVendorTags } from "@/data/vendorColors";
import { CategoryIcon } from "./icons";
import { MeshThumb } from "./MeshThumb";
import { SeverityBadge } from "./SeverityBadge";
import { VendorTag } from "./VendorTag";
import { ShareBar } from "./ShareBar";

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
  const vendorTags = getCoreVendorTags(item.tags);
  const otherTags = item.tags.filter((t) => !vendorTags.includes(t));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-navy-950/50 dark:bg-black/60"
      />

      <aside
        role="dialog"
        aria-modal="true"
        className="relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-ink-200 bg-white animate-[slide-in_0.2s_ease-out] dark:border-ink-800 dark:bg-ink-950"
      >
        <div className="relative">
          <MeshThumb tags={item.tags} category={item.category} className="aspect-[16/9] w-full" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar panel"
            className="absolute right-05 top-05 flex h-11 w-11 items-center justify-center bg-white/90 text-ink-700 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-950 dark:bg-ink-900/90 dark:text-ink-200 dark:hover:bg-ink-900"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 px-06 py-05">
          <div className="flex items-center gap-02 text-ink-500 dark:text-ink-400">
            <CategoryIcon name={category?.icon ?? "shield"} className="h-4 w-4 shrink-0" />
            <span className="kicker">{category?.label ?? "Core"}</span>
            <SeverityBadge severity={item.severity} />
          </div>

          <time className="mt-03 block font-mono text-xs text-ink-500 dark:text-ink-400">{formatDate(item.publishedAt)}</time>

          <h2 className="mt-02 font-serif text-2xl font-semibold leading-tight text-navy-950 dark:text-white">
            {item.title}
          </h2>

          <p className="mt-02 text-sm text-ink-500 dark:text-ink-400">{item.source}</p>

          <p className="mt-05 text-base leading-relaxed text-ink-800 dark:text-ink-200">{item.summary}</p>

          <div className="mt-05 border-l-2 border-navy-950 pl-05 dark:border-navy-300">
            <p className="kicker mb-02 text-navy-700 dark:text-navy-300">Por qué le importa a Core</p>
            <p className="text-sm leading-relaxed text-ink-800 dark:text-ink-200">{item.relevance}</p>
          </div>

          {vendorTags.length > 0 && (
            <div className="mt-05">
              <p className="kicker mb-02 text-navy-700 dark:text-navy-300">Marcas de Core en esta noticia</p>
              <div className="flex flex-wrap gap-02">
                {vendorTags.map((v) => (
                  <VendorTag key={v} name={v} />
                ))}
              </div>
            </div>
          )}

          {otherTags.length > 0 && (
            <div className="mt-05 flex flex-wrap gap-02">
              {otherTags.map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-03 border-t border-ink-200 px-06 py-05 dark:border-ink-800">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-300 focus-visible:ring-offset-2"
          >
            Ver noticia original →
          </a>
          <ShareBar path={`/noticia/${item.id}`} title={item.title} />
        </div>
      </aside>
    </div>
  );
}
