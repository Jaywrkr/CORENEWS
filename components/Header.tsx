"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/data/categories";
import { ThemeToggle } from "./ThemeToggle";

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" {...props}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-950">
      <div className="container-content flex h-24 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center bg-navy-950 font-mono text-sm font-bold text-white dark:bg-white dark:text-navy-950">
            C
          </span>
          <span className="text-lg font-bold tracking-tight text-navy-950 dark:text-white">
            CORE<span className="font-normal text-ink-500 dark:text-ink-400">NEWS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-06 md:flex">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="text-sm font-medium text-ink-700 transition-colors hover:text-navy-950 focus-visible:outline-none focus-visible:underline dark:text-ink-300 dark:hover:text-white"
            >
              {c.short}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-950 dark:text-white"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-ink-200 dark:border-ink-800 md:hidden">
          <div className="container-content flex flex-col">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/categoria/${c.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center border-b border-ink-100 py-04 text-base font-medium text-ink-700 last:border-b-0 focus-visible:outline-none focus-visible:bg-navy-50 dark:border-ink-800 dark:text-ink-300 dark:focus-visible:bg-ink-900"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
