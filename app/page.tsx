import { getNews } from "@/lib/getNews";
import { NewsExplorer } from "@/components/NewsExplorer";
import { CategoryTabs } from "@/components/CategoryTabs";
import { EmptyState } from "@/components/EmptyState";

export const revalidate = 3600;

export default async function HomePage() {
  const { items, generatedAt } = await getNews();

  return (
    <div>
      <section className="border-b border-ink-200 bg-navy-950">
        <div className="container-content flex flex-col gap-03 py-08">
          <span className="kicker text-ink-100/70">Inteligencia diaria para Coresolutions</span>
          <h1 className="max-w-2xl font-serif text-3xl font-semibold leading-tight text-white md:text-4xl">
            Infraestructura, ciberseguridad y nube — filtrado para lo que Core implementa.
          </h1>
          <p className="font-mono text-xs text-ink-100/50">
            Actualizado {new Date(generatedAt).toLocaleString("es-EC")}
          </p>
        </div>
      </section>

      <div className="container-content py-07">
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
    </div>
  );
}
