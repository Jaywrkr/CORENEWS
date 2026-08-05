import { CATEGORIES } from "@/data/categories";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-ink-200 bg-navy-950 text-ink-100">
      <div className="container-content grid gap-06 py-09 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">
            CORE<span className="font-normal text-ink-300">NEWS</span>
          </p>
          <p className="mt-03 max-w-xs text-sm text-ink-300">
            Inteligencia diaria sobre infraestructura, ciberseguridad y nube, curada
            para mantener a Coresolutions al día con las tecnologías que implementa.
          </p>
        </div>
        <div>
          <p className="kicker text-ink-400">Categorías</p>
          <ul className="mt-03 space-y-02 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <a href={`/categoria/${c.slug}`} className="text-ink-200 hover:text-white">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker text-ink-400">Coresolutions</p>
          <p className="mt-03 text-sm text-ink-300">
            Infraestructura · Ciberseguridad · Nube · Servicios gestionados ·
            Continuidad operativa.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-content flex flex-col gap-02 py-04 text-xs text-ink-400 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Coresolutions. Uso interno.</span>
          <span className="font-mono">Contenido curado automáticamente · fuentes públicas de fabricantes y medios especializados</span>
        </div>
      </div>
    </footer>
  );
}
