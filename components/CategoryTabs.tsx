import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export function CategoryTabs({ active }: { active?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-05 gap-y-02 border-b border-ink-100 pb-05 text-sm">
      <Link
        href="/"
        className={!active ? "font-semibold text-navy-950" : "plain-link"}
      >
        Todas
      </Link>
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          href={`/categoria/${c.slug}`}
          className={active === c.slug ? "font-semibold text-navy-950" : "plain-link"}
        >
          {c.label}
        </Link>
      ))}
    </div>
  );
}
