export function EmptyState({ label }: { label?: string }) {
  return (
    <div className="hairline flex flex-col items-center gap-03 bg-ink-50 px-06 py-10 text-center">
      <span className="font-mono text-xs uppercase tracking-wide text-ink-500">Sin resultados</span>
      <p className="max-w-md text-ink-600">
        {label ?? "Todavía no hay noticias recolectadas para esta categoría. La próxima actualización automática corre en unas horas."}
      </p>
    </div>
  );
}
