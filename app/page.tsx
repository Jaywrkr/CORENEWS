import { getNews } from "@/lib/getNews";
import { NewsExplorer } from "@/components/NewsExplorer";
import { CategoryTabs } from "@/components/CategoryTabs";
import { EmptyState } from "@/components/EmptyState";

export const revalidate = 3600;

export default async function HomePage() {
  const { items, generatedAt } = await getNews();

  return (
    <div className="container-content py-12 md:py-16">
      <div className="mb-10 max-w-2xl md:mb-14">
        <span className="kicker text-navy-700">Inteligencia diaria para Coresolutions</span>
        <h1 className="mt-05 font-serif text-4xl font-semibold leading-[1.1] text-navy-950 md:text-6xl">
          Infraestructura, ciberseguridad y nube — filtrado para lo que Core implementa.
        </h1>
        <p className="mt-05 font-mono text-xs text-ink-400">
          Actualizado {new Date(generatedAt).toLocaleString("es-EC")}
        </p>
      </div>

      <CategoryTabs />

      {items.length === 0 ? (
        <div className="mt-07">
          <EmptyState />
        </div>
      ) : (
        <div className="mt-10">
          <NewsExplorer items={items} showFeatured />
        </div>
      )}
    </div>
  );
}
