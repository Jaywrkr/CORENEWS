export function EmptyState({ label }: { label?: string }) {
  return (
    <div className="py-10 text-center">
      <p className="text-sm text-ink-500">
        {label ?? "Todavía no hay noticias recolectadas para esta categoría."}
      </p>
    </div>
  );
}
