import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export function CategoryTabs({ active }: { active?: string }) {
  return (
    <div className="flex flex-wrap gap-02 border-b border-ink-200 pb-05">
      <Link
        href="/"
        className={`px-05 py-03 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-950 ${
          !active ? "bg-navy-950 text-white" : "border border-ink-200 text-ink-700 hover:border-navy-950"
        }`}
      >
        Todas
      </Link>
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          href={`/categoria/${c.slug}`}
          className={`px-05 py-03 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-950 ${
            active === c.slug
              ? "bg-navy-950 text-white"
              : "border border-ink-200 text-ink-700 hover:border-navy-950"
          }`}
        >
          {c.label}
        </Link>
      ))}
    </div>
  );
}
