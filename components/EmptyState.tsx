export function EmptyState({ label }: { label?: string }) {
  return (
    <div className="hairline flex flex-col items-center gap-03 bg-ink-50 px-06 py-10 text-center dark:bg-ink-900">
      <span className="font-mono text-xs uppercase tracking-wide text-ink-500 dark:text-ink-400">Sin resultados</span>
      <p className="max-w-md text-ink-600 dark:text-ink-300">
        {label ?? "Todavía no hay noticias recolectadas para esta categoría. La próxima actualización automática corre en unas horas."}
      </p>
    </div>
  );
}
