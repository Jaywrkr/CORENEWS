import { notFound } from "next/navigation";
import { getNews, filterByCategory } from "@/lib/getNews";
import { NewsExplorer } from "@/components/NewsExplorer";
import { CategoryTabs } from "@/components/CategoryTabs";
import { EmptyState } from "@/components/EmptyState";
import { CATEGORIES, getCategory } from "@/data/categories";

export const revalidate = 3600;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const { items } = await getNews();
  const filtered = filterByCategory(items, category.slug);

  return (
    <div className="container-content py-08">
      <div className="mb-07">
        <h1 className="text-2xl font-semibold text-navy-950">{category.label}</h1>
        <p className="mt-02 text-sm text-ink-500">{category.description}</p>
      </div>

      <CategoryTabs active={category.slug} />

      {filtered.length === 0 ? (
        <div className="mt-07">
          <EmptyState />
        </div>
      ) : (
        <div className="mt-06">
          <NewsExplorer items={filtered} />
        </div>
      )}
    </div>
  );
}
