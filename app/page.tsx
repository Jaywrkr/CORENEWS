import { getNews } from "@/lib/getNews";
import { NewsExplorer } from "@/components/NewsExplorer";
import { CategoryTabs } from "@/components/CategoryTabs";
import { EmptyState } from "@/components/EmptyState";

export const revalidate = 3600;

export default async function HomePage() {
  const { items, generatedAt } = await getNews();

  return (
    <div className="container-content py-8 md:py-10">
      <div className="mb-6 max-w-2xl md:mb-8">
        <span className="kicker text-navy-700 dark:text-navy-300">Inteligencia diaria para Coresolutions</span>
        <h1 className="mt-05 font-serif text-3xl font-semibold leading-[1.1] text-navy-950 dark:text-white md:text-4xl">
          Infraestructura, ciberseguridad y nube — filtrado para lo que Core implementa.
        </h1>
        <p className="mt-05 font-mono text-xs text-ink-400">
          Actualizado{" "}
          {new Date(generatedAt).toLocaleString("es-EC", { timeZone: "America/Guayaquil" })}
        </p>
      </div>

      <CategoryTabs />

      {items.length === 0 ? (
        <div className="mt-06">
          <EmptyState />
        </div>
      ) : (
        <div className="mt-6">
          <NewsExplorer items={items} showFeatured />
        </div>
      )}
    </div>
  );
}
