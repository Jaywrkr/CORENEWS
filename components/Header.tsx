import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export function Header() {
  return (
    <header className="border-b border-ink-200 bg-white">
      <div className="border-b border-ink-100 bg-navy-950">
        <div className="container-content flex h-9 items-center justify-between text-white">
          <p className="kicker text-ink-100/70">Uso interno · Coresolutions</p>
          <p className="font-mono text-xs text-ink-100/70">
            {new Date().toLocaleDateString("es-EC", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>
      </div>

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

        <Link href="/" className="pill hidden sm:inline-flex">
          Todas las noticias
        </Link>
      </div>
    </header>
  );
}
