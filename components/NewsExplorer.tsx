"use client";

import { useState } from "react";
import type { NewsItem } from "@/scripts/fetch-news";
import { NewsCard } from "./NewsCard";
import { NewsDrawer } from "./NewsDrawer";

export function NewsExplorer({
  items,
  showFeatured = false,
}: {
  items: NewsItem[];
  showFeatured?: boolean;
}) {
  const [selected, setSelected] = useState<NewsItem | null>(null);
  const [featured, ...rest] = items;

  return (
    <>
      {showFeatured && featured ? (
        <div className="space-y-09">
          <div>
            <p className="kicker mb-03 text-navy-700">Destacado</p>
            <NewsCard item={featured} featured onSelect={setSelected} />
          </div>

          <div>
            <p className="kicker mb-03 text-navy-700">Últimas noticias</p>
            <div className="grid gap-05 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((item) => (
                <NewsCard key={item.id} item={item} onSelect={setSelected} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-05 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} onSelect={setSelected} />
          ))}
        </div>
      )}

      <NewsDrawer item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
