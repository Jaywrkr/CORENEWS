import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getNews } from "@/lib/getNews";
import { getCategory } from "@/data/categories";
import { getCoreVendorTags } from "@/data/vendorColors";
import { CategoryIcon } from "@/components/icons";
import { MeshThumb } from "@/components/MeshThumb";
import { SeverityBadge } from "@/components/SeverityBadge";
import { VendorTag } from "@/components/VendorTag";
import { ShareBar } from "@/components/ShareBar";

export const revalidate = 3600;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

async function getItem(id: string) {
  const { items } = await getNews();
  return items.find((i) => i.id === id);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) return {};

  return {
    title: `${item.title} — CoreNews`,
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
      type: "article",
      url: `/noticia/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.summary,
    },
  };
}

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) notFound();

  const category = getCategory(item.category);
  const vendorTags = getCoreVendorTags(item.tags);
  const otherTags = item.tags.filter((t) => !vendorTags.includes(t));

  return (
    <div className="container-content py-10 md:py-14">
      <Link href="/" className="kicker text-navy-700 hover:text-navy-950 dark:text-navy-300 dark:hover:text-white">
        ← CoreNews
      </Link>

      <article className="mx-auto mt-06 max-w-2xl">
        <div className="flex items-center gap-02 text-ink-500 dark:text-ink-400">
          <CategoryIcon name={category?.icon ?? "shield"} className="h-4 w-4 shrink-0" />
          <span className="kicker">{category?.label ?? "Core"}</span>
          <SeverityBadge severity={item.severity} />
        </div>

        <h1 className="mt-04 font-serif text-3xl font-semibold leading-tight text-navy-950 dark:text-white md:text-4xl">
          {item.title}
        </h1>

        <div className="mt-03 flex items-center gap-02 text-sm text-ink-500 dark:text-ink-400">
          <span>{item.source}</span>
          <span aria-hidden>·</span>
          <time className="font-mono">{formatDate(item.publishedAt)}</time>
        </div>

        <MeshThumb tags={item.tags} category={item.category} className="mt-06 aspect-[16/9] w-full" />

        <p className="mt-06 text-lg leading-relaxed text-ink-800 dark:text-ink-200">{item.summary}</p>

        <div className="mt-06 border-l-2 border-navy-950 pl-05 dark:border-navy-300">
          <p className="kicker mb-02 text-navy-700 dark:text-navy-300">Por qué le importa a Core</p>
          <p className="text-sm leading-relaxed text-ink-800 dark:text-ink-200">{item.relevance}</p>
        </div>

        {vendorTags.length > 0 && (
          <div className="mt-06">
            <p className="kicker mb-02 text-navy-700 dark:text-navy-300">Marcas de Core en esta noticia</p>
            <div className="flex flex-wrap gap-02">
              {vendorTags.map((v) => (
                <VendorTag key={v} name={v} />
              ))}
            </div>
          </div>
        )}

        {otherTags.length > 0 && (
          <div className="mt-05 flex flex-wrap gap-02">
            {otherTags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-08 flex flex-col gap-03 border-t border-ink-200 pt-06 dark:border-ink-800">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-300 focus-visible:ring-offset-2"
          >
            Ver noticia original →
          </a>
          <ShareBar path={`/noticia/${item.id}`} title={item.title} />
        </div>
      </article>
    </div>
  );
}
