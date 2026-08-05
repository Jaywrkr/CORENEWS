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
  const [featured, ...rest] = filtered;

  return (
    <>
      <div className="mb-06 space-y-03">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar…"
          className="w-full max-w-xs border-b border-ink-200 bg-transparent py-02 text-sm text-ink-900 placeholder:text-ink-400 focus:border-navy-950 focus:outline-none"
        />
        {vendorChips.length > 0 && (
          <div className="flex flex-wrap gap-x-04 gap-y-02 text-xs">
            {vendorChips.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setVendor(vendor === tag ? null : tag)}
                className={
                  vendor === tag
                    ? "font-semibold text-navy-950 underline underline-offset-4"
                    : "plain-link"
                }
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-sm text-ink-500">
            Ningún artículo coincide con “{query || vendor}”.
          </p>
        </div>
      ) : useFeaturedLayout && featured ? (
        <div>
          <NewsCard item={featured} featured onSelect={setSelected} />
          {rest.map((item) => (
            <NewsCard key={item.id} item={item} onSelect={setSelected} />
          ))}
        </div>
      ) : (
        <div>
          {filtered.map((item) => (
            <NewsCard key={item.id} item={item} onSelect={setSelected} />
          ))}
        </div>
      )}

      <NewsDrawer item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
