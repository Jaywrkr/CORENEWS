import { getNews } from "@/lib/getNews";
import { NewsExplorer } from "@/components/NewsExplorer";
import { CategoryTabs } from "@/components/CategoryTabs";
import { EmptyState } from "@/components/EmptyState";

export const revalidate = 3600;

export default async function HomePage() {
  const { items, generatedAt } = await getNews();

  return (
    <div className="container-content py-08">
      <div className="mb-07">
        <span className="kicker text-navy-700">Inteligencia diaria para Coresolutions</span>
        <h1 className="mt-02 font-serif text-3xl font-semibold leading-tight text-navy-950 md:text-4xl">
          Infraestructura, ciberseguridad y nube — filtrado para lo que Core implementa.
        </h1>
        <p className="mt-02 font-mono text-xs text-ink-400">
          Actualizado {new Date(generatedAt).toLocaleString("es-EC")}
        </p>
      </div>

      <CategoryTabs />

      {items.length === 0 ? (
        <div className="mt-07">
          <EmptyState />
        </div>
      ) : (
        <div className="mt-07">
          <NewsExplorer items={items} showFeatured />
        </div>
      )}
    </div>
  );
}
