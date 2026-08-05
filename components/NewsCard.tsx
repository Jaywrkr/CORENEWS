import type { NewsItem } from "@/scripts/fetch-news";
import { getCategory } from "@/data/categories";
import { CategoryIcon } from "./icons";
import { CategoryThumb } from "./CategoryThumb";
import { SeverityBadge } from "./SeverityBadge";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "short",
    year: "numeric",
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
    <button type="button" onClick={() => onSelect(item)} className="group flex w-full flex-col text-left">
      <div className="flex items-center gap-02 text-ink-500">
        <CategoryIcon name={category?.icon ?? "shield"} className="h-4 w-4 shrink-0" />
        <span className="kicker">{category?.short ?? "Core"}</span>
        <SeverityBadge severity={item.severity} />
      </div>

      <CategoryThumb
        variant={category?.thumb ?? "navy"}
        icon={category?.icon ?? "shield"}
        className={`mt-03 w-full transition-opacity group-hover:opacity-90 ${featured ? "aspect-[21/9]" : "aspect-[16/10]"}`}
      />

      <h3
        className={`mt-04 font-semibold leading-snug text-ink-900 group-hover:text-navy-950 ${
          featured ? "text-2xl" : "text-base"
        }`}
      >
        {item.title}
      </h3>

      <p className={`mt-02 text-ink-500 ${featured ? "text-base" : "text-sm"} line-clamp-2`}>
        {item.summary}
      </p>

      <div className="mt-03 flex items-center gap-02 text-xs text-ink-400">
        <span>{item.source}</span>
        <span aria-hidden>·</span>
        <time className="font-mono">{formatDate(item.publishedAt)}</time>
      </div>

      {item.tags.length > 0 && (
        <div className="mt-03 flex flex-wrap gap-02">
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="pill">
              {tag}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
