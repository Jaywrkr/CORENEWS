import type { NewsItem } from "@/scripts/fetch-news";
import { getCategory } from "@/data/categories";
import { getCoreVendorTags } from "@/data/vendorColors";
import { CategoryIcon } from "./icons";
import { MeshThumb } from "./MeshThumb";
import { SeverityBadge } from "./SeverityBadge";
import { VendorTag } from "./VendorTag";

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
  const vendorTags = getCoreVendorTags(item.tags);
  const otherTags = item.tags.filter((t) => !vendorTags.includes(t));

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group flex h-full w-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-950 focus-visible:ring-offset-2"
    >
      <div className="flex min-h-[26px] items-center gap-02 text-ink-500">
        <CategoryIcon name={category?.icon ?? "shield"} className="h-4 w-4 shrink-0" />
        <span className="kicker">{category?.short ?? "Core"}</span>
        <SeverityBadge severity={item.severity} />
      </div>

      <MeshThumb
        tags={item.tags}
        category={item.category}
        className={`mt-03 w-full shadow-none transition-shadow duration-300 group-hover:shadow-lift ${featured ? "aspect-[21/9]" : "aspect-[16/10]"}`}
      />

      <h3
        className={`mt-04 font-serif font-semibold leading-snug text-ink-900 transition-colors group-hover:text-navy-950 ${
          featured ? "text-3xl" : "text-lg"
        }`}
      >
        {item.title}
      </h3>

      <p className={`mt-02 text-ink-500 ${featured ? "text-base" : "text-sm"} line-clamp-2`}>
        {item.summary}
      </p>

      {vendorTags.length > 0 && (
        <div className="mt-03 flex flex-wrap gap-02">
          {vendorTags.map((v) => (
            <VendorTag key={v} name={v} />
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-col gap-03 pt-04">
        <div className="flex items-center gap-02 text-xs text-ink-400">
          <span>{item.source}</span>
          <span aria-hidden>·</span>
          <time className="font-mono">{formatDate(item.publishedAt)}</time>
        </div>

        {otherTags.length > 0 && (
          <div className="flex flex-wrap gap-02">
            {otherTags.slice(0, 3).map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
