import type { NewsItem } from "@/scripts/fetch-news";
import { getCategory } from "@/data/categories";
import { SeverityBadge } from "./SeverityBadge";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "short",
  });
}

export function NewsCard({
  item,
  featured = false,
  onSelect,
}: {
  item: NewsItem;
  featured?: boolean;
  onSelect: (item: NewsItem) => void;
}) {
  const category = getCategory(item.category);

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group block w-full border-b border-ink-100 py-05 text-left first:pt-0"
    >
      <div className="flex items-center gap-03 text-xs text-ink-400">
        <span className="kicker text-ink-500">{category?.short ?? "Core"}</span>
        <SeverityBadge severity={item.severity} />
        <span className="ml-auto font-mono">{formatDate(item.publishedAt)}</span>
      </div>

      <h3
        className={`mt-02 font-semibold leading-snug text-ink-900 group-hover:text-navy-950 ${
          featured ? "text-xl" : "text-base"
        }`}
      >
        {item.title}
      </h3>

      <p className="mt-02 text-sm text-ink-500 line-clamp-2">{item.summary}</p>

      <p className="mt-02 text-xs text-ink-400">{item.source}</p>
    </button>
  );
}
