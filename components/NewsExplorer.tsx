"use client";

import { useMemo, useState } from "react";
import type { NewsItem } from "@/scripts/fetch-news";
import { hasCoreVendorTag, hasOtherVendorTag } from "@/data/vendorColors";
import { NewsCard } from "./NewsCard";
import { NewsDrawer } from "./NewsDrawer";
import { VendorScopeToggle, type VendorScope } from "./VendorScopeToggle";

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
  const [scope, setScope] = useState<VendorScope>("core");

  const scopedItems = useMemo(
    () =>
      items.filter((item) => {
        const other = hasOtherVendorTag(item.tags);
        // "Marcas Core": todo lo que mencione una marca Core, más lo genérico
        // sin marca (no se excluye solo porque además mencione otra marca).
        if (scope === "core") return hasCoreVendorTag(item.tags) || !other;
        return other;
      }),
    [items, scope]
  );

  const vendorChips = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of scopedItems) {
      for (const tag of item.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_VENDOR_CHIPS)
      .map(([tag]) => tag);
  }, [scopedItems]);

  function handleScopeChange(next: VendorScope) {
    setScope(next);
    setVendor(null);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return scopedItems.filter((item) => {
      if (vendor && !item.tags.includes(vendor)) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [scopedItems, query, vendor]);

  const useFeaturedLayout = showFeatured && !query && !vendor;
  const [featured, ...rest] = filtered;

  return (
    <>
      <VendorScopeToggle scope={scope} onChange={handleScopeChange} />

      <div className="mb-06 flex flex-col gap-04 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar…"
          className="hairline h-11 w-full max-w-sm bg-white px-05 text-sm text-ink-900 placeholder:text-ink-400 focus:border-navy-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-950 dark:bg-ink-900 dark:text-ink-100 dark:placeholder:text-ink-500 dark:focus:border-white"
        />
        {vendorChips.length > 0 && (
          <select
            value={vendor ?? ""}
            onChange={(e) => setVendor(e.target.value || null)}
            className="hairline h-11 w-full max-w-[220px] bg-white px-05 text-sm text-ink-900 focus:border-navy-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-950 dark:bg-ink-900 dark:text-ink-100 dark:focus:border-white"
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
        <div className="hairline flex flex-col items-center gap-03 bg-ink-50 px-06 py-10 text-center dark:bg-ink-900">
          <span className="font-mono text-xs uppercase tracking-wide text-ink-500 dark:text-ink-400">Sin resultados</span>
          <p className="max-w-md text-ink-600 dark:text-ink-300">
            Ningún artículo coincide con “{query || vendor}”. Prueba con otra palabra clave o quita el filtro.
          </p>
        </div>
      ) : useFeaturedLayout && featured ? (
        <div className="space-y-10">
          <div>
            <p className="kicker mb-03 text-navy-700 dark:text-navy-300">Destacado</p>
            <NewsCard item={featured} featured onSelect={setSelected} />
          </div>

          <div>
            <p className="kicker mb-03 text-navy-700 dark:text-navy-300">Últimas noticias</p>
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

      <div className="h-16 sm:hidden" aria-hidden />

      <NewsDrawer item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
