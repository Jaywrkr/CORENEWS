import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export function Header() {
  return (
    <header className="border-b border-ink-100">
      <div className="container-content flex h-16 items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight text-navy-950">
          CoreNews
        </Link>

        <nav className="hidden items-center gap-05 md:flex">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/categoria/${c.slug}`} className="plain-link text-sm">
              {c.short}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
