import type { NewsItem } from "@/scripts/fetch-news";
import { getCategory } from "@/data/categories";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function NewsCard({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  const category = getCategory(item.category);

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`card group ${featured ? "p-07" : "p-05"}`}
    >
      <div className="flex items-center justify-between gap-03">
        <span className="kicker text-navy-700">{category?.short ?? "Core"}</span>
        <time className="font-mono text-xs text-ink-400">{formatDate(item.publishedAt)}</time>
      </div>

      <h3
        className={`mt-03 font-semibold leading-snug text-ink-900 group-hover:text-navy-950 ${
          featured ? "text-2xl" : "text-base"
        }`}
      >
        {item.title}
      </h3>

      <p className={`mt-03 text-ink-600 ${featured ? "text-base" : "text-sm"} line-clamp-3`}>
        {item.summary}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-02 pt-05">
        {item.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-03 flex items-center justify-between border-t border-ink-100 pt-03 text-xs text-ink-500">
        <span>{item.source}</span>
        <span className="font-medium text-navy-700 group-hover:underline">Leer fuente →</span>
      </div>
    </a>
  );
}
