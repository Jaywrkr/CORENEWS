import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export function Header() {
  return (
    <header className="border-b border-ink-200 bg-white">
      <div className="container-content flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-navy-950 font-mono text-sm font-bold text-white">
            C
          </span>
          <span className="text-lg font-bold tracking-tight text-navy-950">
            CORE<span className="font-normal text-ink-500">NEWS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-06 md:flex">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="text-sm font-medium text-ink-700 transition-colors hover:text-navy-950"
            >
              {c.short}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
