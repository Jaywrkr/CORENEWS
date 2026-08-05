import { getNews } from "@/lib/getNews";
import { NewsExplorer } from "@/components/NewsExplorer";
import { CategoryTabs } from "@/components/CategoryTabs";
import { EmptyState } from "@/components/EmptyState";
import { CATEGORIES } from "@/data/categories";

export const revalidate = 3600;

export default async function HomePage() {
  const { items, generatedAt } = await getNews();

  return (
    <div>
      <section className="border-b border-ink-200 bg-grid-navy bg-grid bg-navy-950">
        <div className="container-content flex flex-col gap-04 py-10">
          <span className="kicker text-ink-100/70">Inteligencia diaria para Coresolutions</span>
          <h1 className="max-w-3xl font-serif text-3xl font-semibold leading-tight text-white md:text-5xl">
            Lo que pasa hoy en infraestructura, ciberseguridad y nube — filtrado para lo que Core implementa.
          </h1>
          <p className="max-w-2xl text-ink-100/80">
            Recolectamos y clasificamos automáticamente noticias de los fabricantes y fuentes de
            seguridad relevantes para nuestros proyectos: VMware, Veeam, Check Point, Aruba, Cisco,
            IBM, Lenovo, HPE y más.
          </p>
          <p className="font-mono text-xs text-ink-100/50">
            Última actualización: {new Date(generatedAt).toLocaleString("es-EC")}
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

        <div className="mt-10 grid gap-05 border-t border-ink-200 pt-07 md:grid-cols-3">
          {CATEGORIES.slice(0, 3).map((c) => (
            <a
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="hairline block p-06 transition-colors hover:border-navy-950"
            >
              <p className="font-semibold text-navy-950">{c.label}</p>
              <p className="mt-02 text-sm text-ink-600">{c.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
