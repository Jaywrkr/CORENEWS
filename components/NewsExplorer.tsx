"use client";

import { useMemo, useState } from "react";
import type { NewsItem } from "@/scripts/fetch-news";
import { NewsCard } from "./NewsCard";
import { NewsDrawer } from "./NewsDrawer";

const MAX_VENDOR_CHIPS = 10;

export function NewsExplorer({
  items,
  showFeatured = false,
}: {
  items: NewsItem[];
  showFeatured?: boolean;
}) {
  const [selected, setSelected] = useState<NewsItem | null>(null);
  const [query, setQuery] = useState("");
  const [vendor, setVendor] = useState<string | null>(null);

  const vendorChips = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      for (const tag of item.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_VENDOR_CHIPS)
      .map(([tag]) => tag);
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (vendor && !item.tags.includes(vendor)) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [items, query, vendor]);

  const useFeaturedLayout = showFeatured && !query && !vendor;
  const [featuredMain, featuredA, featuredB, ...rest] = filtered;
  const featuredSecondary = [featuredA, featuredB].filter(
    (item): item is NewsItem => Boolean(item)
  );

  return (
    <>
      <div className="mb-06 flex flex-col gap-04 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar…"
          className="hairline h-11 w-full max-w-sm bg-white px-05 text-sm text-ink-900 placeholder:text-ink-400 focus:border-navy-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-950"
        />
        {vendorChips.length > 0 && (
          <select
            value={vendor ?? ""}
            onChange={(e) => setVendor(e.target.value || null)}
            className="hairline h-11 w-full max-w-[220px] bg-white px-05 text-sm text-ink-900 focus:border-navy-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-950"
          >
            <option value="">Todas las etiquetas</option>
            {vendorChips.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="hairline flex flex-col items-center gap-03 bg-ink-50 px-06 py-10 text-center">
          <span className="font-mono text-xs uppercase tracking-wide text-ink-500">Sin resultados</span>
          <p className="max-w-md text-ink-600">
            Ningún artículo coincide con “{query || vendor}”. Prueba con otra palabra clave o quita el filtro.
          </p>
        </div>
      ) : useFeaturedLayout && featuredMain ? (
        <div className="space-y-10">
          <div>
            <p className="kicker mb-03 text-navy-700">Destacado</p>
            <div className="grid items-stretch gap-06 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <NewsCard item={featuredMain} featured onSelect={setSelected} />
              </div>
              <div className="flex flex-col gap-06">
                {featuredSecondary.map((item) => (
                  <NewsCard key={item.id} item={item} onSelect={setSelected} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="kicker mb-03 text-navy-700">Últimas noticias</p>
            <div className="grid items-stretch gap-06 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((item) => (
                <NewsCard key={item.id} item={item} onSelect={setSelected} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid items-stretch gap-06 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <NewsCard key={item.id} item={item} onSelect={setSelected} />
          ))}
        </div>
      )}

      <NewsDrawer item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
